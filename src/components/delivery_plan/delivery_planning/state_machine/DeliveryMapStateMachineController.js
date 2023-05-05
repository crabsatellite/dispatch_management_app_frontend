/**
 * Copyright (c) 2023
 *
 * @summary Implementation of state machine controller for leaflet map
 * @author Zilin Li
 * @date 2023-04-28  
 *  
 */

// Project imports
import { DISPATCH_ROUTE_TYPE, DELIVERY_STATE, DISPATCHER_START_LOCATION, DISPATCHER_START_LOCATION_KEY, DISPATCHER_TYPE, DISPATCH_SPEED_TYPE } from "../../../../utils/delivery_plan_utils";
import { DEFAULT_ICON, WAREHOUSE_ICON, PICKUP_ICON, DELIVERY_ICON, ROBOT_ICON, DRONE_ICON } from "../../../../utils/map_icon_utils";

// Map imports
import L from "leaflet";
import "leaflet-routing-machine";
import Geocode from "react-geocode";
import { useMap } from "react-leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

// React imports
import { useEffect } from "react";

const DeliveryMapStateMachineController = (
    { map,
      geoCoder,
      routeControl,
      focusPointPos,
      routeCoordinates,
      dispatcherMarker,
      focusPointMarker,
      pickupSpeed,
      deliverySpeed,
      dispatcherType, 
      deliveryState,
      deliveryStartLocationKey, 
      setMap,
      setGeoCoder,
      setRouteControl,
      setFocusPointPos,
      setRouteCoordinates,
      setDispatcherMarker,
      setFocusPointMarker,
      setDeliveryState,
      setPickupAddress,
      setDeliveryAddress}) => {

  
  const leafletMap = useMap();
 
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
        focusPointMarker.setIcon(PICKUP_ICON);
        break;
      case DISPATCH_ROUTE_TYPE.DELIVERY:
        focusPointMarker.setIcon(DELIVERY_ICON);
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
    focusPointMarker.setIcon(DEFAULT_ICON);
    setFocusPointMarker(focusPointMarker);

    switch (routeType) {
      case DISPATCH_ROUTE_TYPE.PICK_UP:
        L.marker(destination, { icon: PICKUP_ICON }).addTo(map).bindPopup("Pick-up Location").openPopup();
        break;
      case DISPATCH_ROUTE_TYPE.DELIVERY:
        L.marker(destination, { icon: DELIVERY_ICON }).addTo(map).bindPopup("Delivery Location").openPopup();
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
      L.marker(DISPATCHER_START_LOCATION.LOCATION_A, { icon: WAREHOUSE_ICON }).addTo(map).bindPopup("Location A").openPopup();
      L.marker(DISPATCHER_START_LOCATION.LOCATION_B, { icon: WAREHOUSE_ICON }).addTo(map).bindPopup("Location B").openPopup();
      L.marker(DISPATCHER_START_LOCATION.LOCATION_C, { icon: WAREHOUSE_ICON }).addTo(map).bindPopup("Location C").openPopup();
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
    dispatcherMarker.setIcon(dispatcherType === DISPATCHER_TYPE.ROBOT ? ROBOT_ICON : DRONE_ICON);
    setDispatcherMarker(dispatcherMarker);
    
    // Add to map layer
    dispatcherMarker.addTo(map);
  }, [dispatcherType]);

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
          dispatcherMarker.setIcon(ROBOT_ICON);
          setDispatcherMarker(dispatcherMarker);
          dispatcherMarker.addTo(map);
          setFocusPointPos(DISPATCHER_START_LOCATION.LOCATION_A);
          focusPointMarker.setLatLng(DISPATCHER_START_LOCATION.LOCATION_A);
          focusPointMarker.setIcon(DEFAULT_ICON);
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