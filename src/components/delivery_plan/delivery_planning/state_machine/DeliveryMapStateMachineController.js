import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import { DISPATCH_ROUTE_TYPE, DELIVERY_STATE, DISPATCHER_START_LOCATION, DISPATCHER_START_LOCATION_KEY, DISPATCHER_TYPE, DISPATCH_SPEED_TYPE } from "../../../../utils/delivery_plan_utils";
import Geocode from "react-geocode";

const DeliveryMapStateMachineController = (
    { pickupSpeed,
      deliverySpeed,
      dispatcher, 
      deliveryStartLocationKey, 
      deliveryState, 
      setDeliveryState,
      setPickupAddress,
      setDeliveryAddress}) => {

  /*
   * Icon definitions start -----------------------------------------------------------------------------------------------------
  */
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

  let robotIcon = L.icon({
    iconUrl: "/robot.png",
    iconSize: [90, 90],
  });

  let droneIcon = L.icon({
    iconUrl: "/drone.png",
    iconSize: [90, 90],
  });
  /*
   * Icon definitions end -----------------------------------------------------------------------------------------------------
  */
  

  /*
   * React state definitions start -----------------------------------------------------------------------------------------------
  */
  const leafletMap = useMap();
  const [map, setMap] = useState();
  const [dispatcherMarker, setDispatcherMarker] = useState(L.marker([DISPATCHER_START_LOCATION[deliveryStartLocationKey][0], DISPATCHER_START_LOCATION[deliveryStartLocationKey][1]], { icon: robotIcon}));
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [focusPointPos, setFocusPointPos] = useState([]);
  const [focusPointMarker, setFocusPointMarker] = useState(L.marker([DISPATCHER_START_LOCATION[deliveryStartLocationKey][0], DISPATCHER_START_LOCATION[deliveryStartLocationKey][1]]));
  const [routeControl, setRouteControl] = useState(L.Routing.control({
    waypoints: [
      L.latLng(DISPATCHER_START_LOCATION.LOCATION_A),
      L.latLng(DISPATCHER_START_LOCATION.LOCATION_A)
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
  /*
   * React state definitions end -----------------------------------------------------------------------------------------------
  */
 
  const generateRoutePlan = (lat, lng, routeType) => {
    
    // Update address
    Geocode.fromLatLng(lat, lng).then(
      response => {
        const address = response.results[0].formatted_address;
        switch (routeType) {
          case DISPATCH_ROUTE_TYPE.PICK_UP:
            setPickupAddress(address);
            break;
          case DISPATCH_ROUTE_TYPE.DELIVERY:
            setDeliveryAddress(address);
            break;
        }
      },
      error => {
        console.error(error);
      }
    );

    // Update route control
    routeControl.getPlan().setWaypoints([
      L.latLng([dispatcherMarker.getLatLng().lat, dispatcherMarker.getLatLng().lng]),
      L.latLng(lat, lng),
    ]);
    setRouteControl(routeControl);
    setFocusPointPos([lat, lng]);
    focusPointMarker.setLatLng([lat, lng]);

    switch (routeType) {
      case DISPATCH_ROUTE_TYPE.PICK_UP:
        focusPointMarker.setIcon(pickUpIcon);
        break;
      case DISPATCH_ROUTE_TYPE.DELIVERY:
        focusPointMarker.setIcon(deliveryIcon);
        break;
    }
    setFocusPointMarker(focusPointMarker);
    focusPointMarker.addTo(map);

    // Save the coordinates of route
    routeControl.on("routesfound", function (e) {
      setRouteCoordinates(e.routes[0].coordinates);
    }).addTo(map);
  };

  const simulateRoutePlan = (speed, routeType) => {

    let speedFactor = 1;
    switch (speed) {
      case DISPATCH_SPEED_TYPE.PRIORITY:
        speedFactor = 10;
        break;
      case DISPATCH_SPEED_TYPE.FIRST_CLASS:
        speedFactor = 50;
        break;
      case DISPATCH_SPEED_TYPE.NORMAL:
        speedFactor = 100;
        break;
    }

    var destination = routeCoordinates[routeCoordinates.length - 1];
    routeCoordinates.forEach((c, i) => {
      setTimeout(() => {
        if (c.lat === destination.lat && c.lng === destination.lng) {
          switch (routeType) {
            case DISPATCH_ROUTE_TYPE.PICK_UP:
              setDeliveryState(DELIVERY_STATE.DELIVER_PREPARATION);
              break;
            case DISPATCH_ROUTE_TYPE.DELIVERY:
              setDeliveryState(DELIVERY_STATE.DELIVER_FINISHED);
              break;
          }
        }
        dispatcherMarker.setLatLng([c.lat, c.lng]);
      }, speedFactor * i);
    });
    focusPointMarker.setIcon(defaultIcon);
    setFocusPointMarker(focusPointMarker);

    switch (routeType) {
      case DISPATCH_ROUTE_TYPE.PICK_UP:
        L.marker(destination, { icon: pickUpIcon }).addTo(map).bindPopup("Pick-up Location").openPopup();
        break;
      case DISPATCH_ROUTE_TYPE.DELIVERY:
        L.marker(destination, { icon: deliveryIcon }).addTo(map).bindPopup("Delivery Location").openPopup();
        break;
    }
  };

  useEffect(() => {
    Geocode.setApiKey("AIzaSyCz5OF-rGLoXBxBJthfwawYJfLpLN1vfBw");
    Geocode.setRegion("us");
    Geocode.setLanguage("en");
    setMap(leafletMap);
  }, []);

  useEffect(() => {

    if (map) {
      geoCoder.addTo(map);
      dispatcherMarker.addTo(map);
      L.marker(DISPATCHER_START_LOCATION.LOCATION_A, { icon: wareHouseIcon }).addTo(map).bindPopup("Location A").openPopup();
      L.marker(DISPATCHER_START_LOCATION.LOCATION_B, { icon: wareHouseIcon }).addTo(map).bindPopup("Location B").openPopup();
      L.marker(DISPATCHER_START_LOCATION.LOCATION_C, { icon: wareHouseIcon }).addTo(map).bindPopup("Location C").openPopup();
    }
  });

  useEffect(() => {

    if (!map) {
      return;
    }

    // Clean-up
    map.removeLayer(dispatcherMarker);
    map.removeLayer(routeControl);

    // Update values
    dispatcherMarker.setLatLng(DISPATCHER_START_LOCATION[deliveryStartLocationKey]);
    setDispatcherMarker(dispatcherMarker);
    routeControl.getPlan().setWaypoints([
      L.latLng(DISPATCHER_START_LOCATION[deliveryStartLocationKey]),
      focusPointPos === DISPATCHER_START_LOCATION[DISPATCHER_START_LOCATION_KEY.LOCATION_A] ? L.latLng(DISPATCHER_START_LOCATION[deliveryStartLocationKey]) : L.latLng(focusPointPos),
    ]);
    setRouteControl(routeControl);
    
    // Add to map layer
    routeControl.addTo(map);
    dispatcherMarker.addTo(map);
  }, [deliveryStartLocationKey]);

  useEffect(() => {

    if (!map) {
      return;
    }

    // Clean-up
    map.removeLayer(dispatcherMarker);

    // Update values
    dispatcherMarker.setIcon(dispatcher === DISPATCHER_TYPE.ROBOT ? robotIcon : droneIcon);
    setDispatcherMarker(dispatcherMarker);
    
    // Add to map layer
    dispatcherMarker.addTo(map);
  }, [dispatcher]);

  // State machine for delivery state update
  useEffect(() => {

    if (!map) {
      return;
    }

    switch (deliveryState) {

      case DELIVERY_STATE.PICKUP_PREPARATION: 
        map.off("click");
        map.off("markgeocode");
        map.on("click", function (e) {
          generateRoutePlan(e.latlng.lat, e.latlng.lng, DISPATCH_ROUTE_TYPE.PICK_UP);
        });
        geoCoder.on("markgeocode", function (e) {
          generateRoutePlan(e.geocode.center.lat, e.geocode.center.lng, DISPATCH_ROUTE_TYPE.PICK_UP);
        });
        break;

      case DELIVERY_STATE.PICKUP_INITIALIZATION:
        map.off("click");
        map.off("markgeocode");
        break;

      case DELIVERY_STATE.PICKUP_PROCESSING:
        simulateRoutePlan(pickupSpeed, DISPATCH_ROUTE_TYPE.PICK_UP);
        break;

      case DELIVERY_STATE.DELIVER_PREPARATION:
        map.removeControl(routeControl);
        map.off("click");
        map.off("markgeocode");
        map.on("click", function (e) {
          generateRoutePlan(e.latlng.lat, e.latlng.lng, DISPATCH_ROUTE_TYPE.DELIVERY);
        });
        geoCoder.on("markgeocode", function (e) {
          generateRoutePlan(e.geocode.center.lat, e.geocode.center.lng, DISPATCH_ROUTE_TYPE.DELIVERY);
        });
        break;

      case DELIVERY_STATE.DELIVER_INITIALIZATION:
        map.off("click");
        map.off("markgeocode");
        break;

      case DELIVERY_STATE.DELIVER_PROCESSING:
        simulateRoutePlan(deliverySpeed, DISPATCH_ROUTE_TYPE.DELIVERY);
        break;

      case DELIVERY_STATE.DELIVER_FINISHED:
        map.removeControl(routeControl);
        setRouteCoordinates([]);
        break;

      case DELIVERY_STATE.RESET_ROUTE:
         
        // Clean-up
        if (map) {
          map.removeControl(routeControl);
          map.eachLayer(function (layer) {
            if (layer instanceof L.Marker) {
              map.removeLayer(layer);
            } 
          });
          setRouteCoordinates([]);
          
          // Add default markers back to map 
          dispatcherMarker.setLatLng(DISPATCHER_START_LOCATION.LOCATION_A);
          dispatcherMarker.setIcon(robotIcon);
          setDispatcherMarker(dispatcherMarker);
          dispatcherMarker.addTo(map);
          setFocusPointPos(DISPATCHER_START_LOCATION.LOCATION_A);
          focusPointMarker.setLatLng(DISPATCHER_START_LOCATION.LOCATION_A);
          focusPointMarker.setIcon(defaultIcon);
          setFocusPointMarker(focusPointMarker);
        }
        // Reset state
        setDeliveryState(DELIVERY_STATE.PICKUP_PREPARATION);
        break;
    }

  }, [deliveryState]);

  return null;
};

export default DeliveryMapStateMachineController;