import L, { latLng } from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import { DELIVERY_STATE, DELIVERY_START_LOCATION } from "../../../../utils/delivery_plan_utils";


const DeliveryMapStateMachineController = ({deliveryStartLocationKey, deliveryState, setDeliveryState}) => {
  
  const leafletMap = useMap();
  const [map, setMap] = useState();
  const [dispatcherPos, setDispatcherPos] = useState();
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [dropOffPos, setDropOffPos] = useState([]);
  const [routeControl, setRouteControl] = useState(L.Routing.control({
    waypoints: [
      L.latLng(DELIVERY_START_LOCATION[deliveryStartLocationKey][0], DELIVERY_START_LOCATION[deliveryStartLocationKey][1]),
      L.latLng(DELIVERY_START_LOCATION[deliveryStartLocationKey][0], DELIVERY_START_LOCATION[deliveryStartLocationKey][1]),
    ],
    lineOptions: {
      styles: [
        {
          color: "blue",
          weight: 4,
          opacity: 0.7,
        },
      ],
    },
    routeWhileDragging: false,
    geocoder: L.Control.Geocoder.nominatim(),
    addWaypoints: false,
    draggableWaypoints: false,
    fitSelectedRoutes: true,
    showAlternatives: false,
  }));

  const [geoCoder, setGeoCoder] = useState(L.Control.geocoder({
    defaultMarkGeocode: false,
  }));

  let dispatcherIcon = L.icon({
    iconUrl: "/robot.png",
    iconSize: [90, 90],
  });

  let wareHouseIcon = L.icon({
    iconUrl: "/warehouse.png",
    iconSize: [45, 45],
  });
 
  // Data init
  useEffect(() => {
    setMap(leafletMap);
    setDispatcherPos(L.marker([DELIVERY_START_LOCATION[deliveryStartLocationKey][0], DELIVERY_START_LOCATION[deliveryStartLocationKey][1]], { icon: dispatcherIcon })); 
  }, []);

  // User event listener
  useEffect(() => {

    if (map) {

      geoCoder.addTo(map);
      routeControl.addTo(map);
      dispatcherPos.addTo(map);
      L.marker(DELIVERY_START_LOCATION.LOCATION_A, { icon: wareHouseIcon }).addTo(map).bindPopup("Location A").openPopup();
      L.marker(DELIVERY_START_LOCATION.LOCATION_B, { icon: wareHouseIcon }).addTo(map).bindPopup("Location B").openPopup();
      L.marker(DELIVERY_START_LOCATION.LOCATION_C, { icon: wareHouseIcon }).addTo(map).bindPopup("Location C").openPopup();

      // Search box event listener
      geoCoder.on("markgeocode", function (e) {

        map.fitBounds(e.geocode.bbox);

        // Update waypoints
        routeControl.getPlan().setWaypoints([
          L.latLng(DELIVERY_START_LOCATION[deliveryStartLocationKey]),
          L.latLng(e.geocode.center.lat, e.geocode.center.lng),
        ]);

        // Update the drop-off location
        setDropOffPos([e.geocode.center.lat, e.geocode.center.lng]);

        // Save the coordinates of route
        routeControl.on("routesfound", function (e) {
          setRouteCoordinates(e.routes[0].coordinates);
        }).addTo(map);
      });
      
      // Mouse click event listener
      map.on("click", function (e) {

        // Update waypoints
        routeControl.getPlan().setWaypoints([
          L.latLng(DELIVERY_START_LOCATION[deliveryStartLocationKey]),
          L.latLng(e.latlng.lat, e.latlng.lng),
        ]);

        // Update the drop-off location
        setDropOffPos([e.latlng.lat, e.latlng.lng]);

        // Save the coordinates of route
        routeControl.on("routesfound", function (e) {
          setRouteCoordinates(e.routes[0].coordinates);
        }).addTo(map);
      });
    }
  }, [map, deliveryStartLocationKey, dropOffPos]);

  // Listener to update of start location
  useEffect(() => {

    if (!map) {
      return;
    }
    map.removeLayer(dispatcherPos);
    map.removeLayer(routeControl);
    setDispatcherPos(L.marker(DELIVERY_START_LOCATION[deliveryStartLocationKey], { icon: dispatcherIcon }));  
    routeControl.getPlan().setWaypoints([
      L.latLng(DELIVERY_START_LOCATION[deliveryStartLocationKey]),
      dropOffPos === [] ? L.latLng(DELIVERY_START_LOCATION[deliveryStartLocationKey]) : L.latLng(dropOffPos),
    ]);
    setRouteControl(routeControl);
  }, [deliveryStartLocationKey]);

  // Listener to update of dispatcher position
  useEffect(() => {
    if (map) {
      dispatcherPos.addTo(map);
    }
  }, [dispatcherPos]);

  // Listener to update of route control
  useEffect(() => {
    if (map) {
      routeControl.addTo(map);
    }
  }, [routeControl]);

  // State machine for delivery state update
  useEffect(() => {

    switch (deliveryState) {

      case DELIVERY_STATE.DISPATCHED:
        var destination = routeCoordinates[routeCoordinates.length-1];
        routeCoordinates.forEach((c, i) => {
          setTimeout(() => {
            if (c.lat === destination.lat && c.lng === destination.lng) {
              setDeliveryState(DELIVERY_STATE.DELIVERED);
            }
            dispatcherPos.setLatLng([c.lat, c.lng]);
          }, 100 * i);
        });
        break;

      case DELIVERY_STATE.DELIVERED:
        if (map) {
          map.removeControl(routeControl);
          setRouteCoordinates([]);
        } else {
          return;
        }
        setDeliveryState(DELIVERY_STATE.SUCCESS);
        break;

      case DELIVERY_STATE.CLEAR:
        if (map) {
          map.removeControl(routeControl);
          setRouteCoordinates([]);
        } else {
          return;
        }
        setDeliveryState(DELIVERY_STATE.PLANNING);
        break;
    }

  }, [deliveryState]);

  return null;
};

export default DeliveryMapStateMachineController;