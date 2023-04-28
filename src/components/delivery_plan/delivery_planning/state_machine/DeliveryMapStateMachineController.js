import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import { DELIVERY_STATE, DISPATCHER_START_LOCATION, DISPATCHER_TYPE } from "../../../../utils/delivery_plan_utils";


const DeliveryMapStateMachineController = ({dispatcher, deliveryStartLocationKey, deliveryState, setDeliveryState}) => {
  
  let defaultIcon = L.icon({
    iconUrl: "/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
  });

  let wareHouseIcon = L.icon({
    iconUrl: "/warehouse.png",
    iconSize: [45, 45],
  });

  let pickUpIcon = L.icon({
    iconUrl: "/home.png",
    iconSize: [90, 90],
  });

  let deliveryIcon = L.icon({
    iconUrl: "/destination.png",
    iconSize: [90, 90],
  });

  const leafletMap = useMap();
  const [map, setMap] = useState();
  const [dispatcherMarker, setDispatcherMarker] = useState();
  const [dispatcherIcon, setDispatcherIcon] = useState(L.icon({iconUrl: "/robot.png", iconSize: [90, 90]}));
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [focusPointPos, setFocusPointPos] = useState([]);
  const [focusPointMarker, setFocusPointMarker] = useState([]);
  const [routeControl, setRouteControl] = useState(L.Routing.control({
    waypoints: [
      L.latLng(DISPATCHER_START_LOCATION[deliveryStartLocationKey][0], DISPATCHER_START_LOCATION[deliveryStartLocationKey][1]),
      L.latLng(DISPATCHER_START_LOCATION[deliveryStartLocationKey][0], DISPATCHER_START_LOCATION[deliveryStartLocationKey][1]),
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
 
  // Data init
  useEffect(() => {
    setMap(leafletMap);
    setDispatcherMarker(L.marker([DISPATCHER_START_LOCATION[deliveryStartLocationKey][0], DISPATCHER_START_LOCATION[deliveryStartLocationKey][1]], { icon: dispatcherIcon })); 
    setFocusPointMarker(L.marker([DISPATCHER_START_LOCATION[deliveryStartLocationKey][0], DISPATCHER_START_LOCATION[deliveryStartLocationKey][1]])); 
  }, []);

  // User event listener
  useEffect(() => {

    if (map) {

      geoCoder.addTo(map);
      routeControl.addTo(map);
      focusPointMarker.addTo(map);
            
      dispatcherMarker.setIcon(dispatcherIcon);
      setDispatcherMarker(dispatcherMarker);
      dispatcherMarker.addTo(map);
      
      L.marker(DISPATCHER_START_LOCATION.LOCATION_A, { icon: wareHouseIcon }).addTo(map).bindPopup("Location A").openPopup();
      L.marker(DISPATCHER_START_LOCATION.LOCATION_B, { icon: wareHouseIcon }).addTo(map).bindPopup("Location B").openPopup();
      L.marker(DISPATCHER_START_LOCATION.LOCATION_C, { icon: wareHouseIcon }).addTo(map).bindPopup("Location C").openPopup();

      // Search box event listener
      geoCoder.on("markgeocode", function (e) {

        map.fitBounds(e.geocode.bbox);

        // Update waypoints
        routeControl.getPlan().setWaypoints([
          L.latLng([dispatcherMarker.getLatLng().lat, dispatcherMarker.getLatLng().lng]),
          L.latLng(e.geocode.center.lat, e.geocode.center.lng),
        ]);

        // Update the current focus point location
        focusPointMarker.setLatLng([e.geocode.center.lat, e.geocode.center.lng]);
        setFocusPointPos([e.geocode.center.lat, e.geocode.center.lng]);

        // Save the coordinates of route
        routeControl.on("routesfound", function (e) {
          setRouteCoordinates(e.routes[0].coordinates);
        }).addTo(map);
      });
      
      // Mouse click event listener
      map.on("click", function (e) {

        // Update waypoints
        routeControl.getPlan().setWaypoints([
          L.latLng([dispatcherMarker.getLatLng().lat, dispatcherMarker.getLatLng().lng]),
          L.latLng(e.latlng.lat, e.latlng.lng),
        ]);

        // Update the current focus point location
        focusPointMarker.setLatLng([e.latlng.lat, e.latlng.lng]);
        setFocusPointPos([e.latlng.lat, e.latlng.lng]);

        // Save the coordinates of route
        routeControl.on("routesfound", function (e) {
          setRouteCoordinates(e.routes[0].coordinates);
        }).addTo(map);
      });
    }
  }, [map, deliveryStartLocationKey, focusPointPos, dispatcherIcon]);

  // Update route control if start location updates
  useEffect(() => {

    if (!map) {
      return;
    }
    map.removeLayer(dispatcherMarker);
    map.removeLayer(routeControl);
    setDispatcherMarker(L.marker(DISPATCHER_START_LOCATION[deliveryStartLocationKey], { icon: dispatcherIcon }));  
    routeControl.getPlan().setWaypoints([
      L.latLng(DISPATCHER_START_LOCATION[deliveryStartLocationKey]),
      focusPointPos === [] ? L.latLng(DISPATCHER_START_LOCATION[deliveryStartLocationKey]) : L.latLng(focusPointPos),
    ]);
    setRouteControl(routeControl);
  }, [deliveryStartLocationKey]);

  // Re-render dispatcher marker on map
  useEffect(() => {
    if (map) {
      dispatcherMarker.addTo(map);
    }
  }, [dispatcherMarker]);

  // Re-render focus point marker on map
  useEffect(() => {
    if (map) {
      focusPointMarker.addTo(map);
    }
  }, [focusPointMarker]);

  // Re-render dispatcher icon on map
  useEffect(() => {
    if (map) {
      setDispatcherIcon(L.icon({
        iconUrl: dispatcher === DISPATCHER_TYPE.ROBOT ?  "/robot.png" : "/drone.png",
        iconSize: [90, 90],
      }));
      map.removeLayer(dispatcherMarker);
      dispatcherMarker.setIcon(dispatcherIcon);
      setDispatcherMarker(dispatcherMarker);
      dispatcherMarker.addTo(map);
    }
    
  }, [dispatcher]);

  // Re-render route control to map
  useEffect(() => {
    if (map) {
      routeControl.addTo(map);
    }
  }, [routeControl]);

  // State machine for delivery state update
  useEffect(() => {

    switch (deliveryState) {

      case DELIVERY_STATE.PICKUP_PREPARATION: 
        if (focusPointPos.length === 0) {
          return;
        }
        focusPointMarker.setLatLng([focusPointPos[0], focusPointPos[1]]).bindPopup("Pick-up Location").openPopup();
        setFocusPointMarker(focusPointMarker);
        break;

      case DELIVERY_STATE.PICKUP_INITIALIZATION:
        focusPointMarker.setIcon(pickUpIcon);
        setFocusPointMarker(focusPointMarker);
        break;

      case DELIVERY_STATE.PICKUP_PROCESSING:
        var destination = routeCoordinates[routeCoordinates.length-1];
        routeCoordinates.forEach((c, i) => {
          setTimeout(() => {
            if (c.lat === destination.lat && c.lng === destination.lng) {
              setDeliveryState(DELIVERY_STATE.DELIVER_PREPARATION);
            }
            dispatcherMarker.setLatLng([c.lat, c.lng]);
          }, 100 * i);
        });
        focusPointMarker.setIcon(defaultIcon);
        setFocusPointMarker(focusPointMarker);
        L.marker(destination, { icon: pickUpIcon }).addTo(map).bindPopup("Pick-up Location").openPopup();
        break;

      case DELIVERY_STATE.DELIVER_PREPARATION:
        if (map) {
          map.removeControl(routeControl);
          setRouteCoordinates([]);   
          focusPointMarker.setIcon(deliveryIcon);
          setFocusPointMarker(focusPointMarker);       
        } 
        break;

      case DELIVERY_STATE.DELIVER_PROCESSING:
        var destination = routeCoordinates[routeCoordinates.length-1];
        routeCoordinates.forEach((c, i) => {
          setTimeout(() => {
            if (c.lat === destination.lat && c.lng === destination.lng) {
              setDeliveryState(DELIVERY_STATE.DELIVER_FINISHED);
            }
            dispatcherMarker.setLatLng([c.lat, c.lng]);
          }, 100 * i);
        });
        focusPointMarker.setIcon(defaultIcon);
        setFocusPointMarker(focusPointMarker);
        L.marker(destination, { icon: deliveryIcon }).addTo(map).bindPopup("Delivery Location").openPopup();
        break;

      case DELIVERY_STATE.DELIVER_FINISHED:
        if (map) {
          map.removeControl(routeControl);
          setRouteCoordinates([]);
        } 
        break;

      case DELIVERY_STATE.RESET_ROUTE:
        if (map) {

          // Remove route control 
          map.removeControl(routeControl);
          setRouteCoordinates([]);

          // Reset focus point
          focusPointMarker.setIcon(defaultIcon);
          setFocusPointMarker(focusPointMarker);
          
          // Remove all markers
          map.eachLayer(function (layer) {
            if (layer instanceof L.Marker) {
              map.removeLayer(layer);
            }
          });
          
           // Add default markers back to map 
          dispatcherMarker.setLatLng(DISPATCHER_START_LOCATION.LOCATION_A);
          setDispatcherMarker(dispatcherMarker);
          dispatcherMarker.addTo(map);
          L.marker(DISPATCHER_START_LOCATION.LOCATION_A, { icon: wareHouseIcon }).addTo(map).bindPopup("Location A").openPopup();
          L.marker(DISPATCHER_START_LOCATION.LOCATION_B, { icon: wareHouseIcon }).addTo(map).bindPopup("Location B").openPopup();
          L.marker(DISPATCHER_START_LOCATION.LOCATION_C, { icon: wareHouseIcon }).addTo(map).bindPopup("Location C").openPopup();
        } 
        setDeliveryState(DELIVERY_STATE.PICKUP_PREPARATION);
        break;
    }

  }, [deliveryState]);

  return null;
};

export default DeliveryMapStateMachineController;