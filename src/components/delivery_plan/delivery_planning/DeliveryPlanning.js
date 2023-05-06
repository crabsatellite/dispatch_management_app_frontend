/**
 * Copyright (c) 2023
 *
 * @summary Implementation of delivery planning functionality
 * @author Zilin Li
 * @date 2023-04-28  
 *  
 */

// Project imports
import "./state_machine/DeliveryMap.css";
import { ROBOT_ICON } from "../../../utils/map_icon_utils";
import DeliveryMapStateMachineController from "./state_machine/DeliveryMapStateMachineController";
import DeliveryWorkflowStateMachineController from "./state_machine/DeliveryWorkflowStateMachineController";
import { DELIVERY_STATE, DISPATCHER_START_LOCATION_KEY, DISPATCHER_START_LOCATION, DISPATCHER_TYPE, DISPATCH_SPEED_TYPE } from "../../../utils/delivery_plan_utils";

// Map imports
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { MapContainer, TileLayer, useMap } from "react-leaflet";

// React imports
import { useEffect, useState } from "react";

// Antd imports
import { Row, Col, Image } from "antd";

function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}


const DeliveryPlanning = ({authed, setTabKey}) => {
  
  /*
  * Marker icons properties -----------------------------------------------------------------------------------------------------
  */
  const [dispatcherType, setDispatcherType] = useState(DISPATCHER_TYPE.ROBOT);
  const [deliveryStartLocationKey, setDeliveryStartLocationKey] = useState(DISPATCHER_START_LOCATION_KEY.LOCATION_A);
  const [dispatcherMarker, setDispatcherMarker] = useState(L.marker([DISPATCHER_START_LOCATION[deliveryStartLocationKey][0], DISPATCHER_START_LOCATION[deliveryStartLocationKey][1]], { icon: ROBOT_ICON}));
  const [focusPointMarker, setFocusPointMarker] = useState(L.marker([DISPATCHER_START_LOCATION[deliveryStartLocationKey][0], DISPATCHER_START_LOCATION[deliveryStartLocationKey][1]]));

  /*
  * Map control properties -----------------------------------------------------------------------------------------------------
  */
  const [map, setMap] = useState();
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
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [focusPointPos, setFocusPointPos] = useState([]);

  /*
  * Address properties -----------------------------------------------------------------------------------------------------
  */
  const [pickupAddress, setPickupAddress] = useState("[]");
  const [deliveryAddress, setDeliveryAddress] = useState("[]");
  
  /*
  * Map config properties -----------------------------------------------------------------------------------------------------
  */
  const [pickupSpeed, setPickupSpeed] = useState(DISPATCH_SPEED_TYPE.NORMAL);
  const [deliverySpeed, setDeliverySpeed] = useState(DISPATCH_SPEED_TYPE.NORMAL);
  
  /*
  * State machine properties -----------------------------------------------------------------------------------------------------
  */
  const [deliveryState, setDeliveryState] = useState(DELIVERY_STATE.IDLE);

  /*
  * UI Workflow properties -----------------------------------------------------------------------------------------------------
  */
  const [currentStep, setCurrentStep] = useState(0); 
  
  useEffect(() => {
    if (authed) {
      setDeliveryState(DELIVERY_STATE.PICKUP_PREPARATION);
    }
  }, [authed]);

  return (
    <Row>
      <Col span={12} class="parent">
        <div class="parent">
          <MapContainer class="leaflet-container" center={DISPATCHER_START_LOCATION[deliveryStartLocationKey]} zoom={13} scrollWheelZoom={false}>
            <ChangeView center={DISPATCHER_START_LOCATION[deliveryStartLocationKey]} zoom={13} /> 
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
              <DeliveryMapStateMachineController 
                map={map}
                geoCoder={geoCoder}
                routeControl={routeControl}
                focusPointPos={focusPointPos}
                dispatcherMarker={dispatcherMarker}
                focusPointMarker={focusPointMarker}
                pickupSpeed={pickupSpeed}
                deliverySpeed={deliverySpeed}
                dispatcherType={dispatcherType} 
                routeCoordinates={routeCoordinates}
                deliveryState={deliveryState} 
                deliveryStartLocationKey={deliveryStartLocationKey} 
                setMap={setMap}
                setGeoCoder={setGeoCoder}
                setRouteControl={setRouteControl}
                setFocusPointPos={setFocusPointPos}
                setRouteCoordinates={setRouteCoordinates}
                setDispatcherMarker={setDispatcherMarker}
                setFocusPointMarker={setFocusPointMarker}
                setDeliveryState={setDeliveryState} 
                setPickupAddress={setPickupAddress}
                setDeliveryAddress={setDeliveryAddress}
              />
          </MapContainer>

          {currentStep === 0 ? 
            <Image className="stack-top" preview={false} src={"./blur_layer.png"}/> : <></>
          }
        </div>
      </Col>
      <Col span={12}>
          <DeliveryWorkflowStateMachineController
            authed={authed}
            currentStep={currentStep}
            pickupSpeed={pickupSpeed}
            dispatcher={dispatcherType} 
            deliveryState={deliveryState} 
            deliverySpeed={deliverySpeed}
            pickupAddress={pickupAddress}
            deliveryAddress={deliveryAddress} 
            deliveryStartLocationKey={deliveryStartLocationKey}
            setTabKey={setTabKey}
            setPickupSpeed={setPickupSpeed}
            setCurrentStep={setCurrentStep}
            setDispatcher={setDispatcherType} 
            setDeliveryState={setDeliveryState} 
            setDeliverySpeed={setDeliverySpeed}
            setDeliveryStartLocationKey={setDeliveryStartLocationKey} 
            setDispatcherType={setDispatcherType}
          />
      </Col>
    </Row>
  );
}

export default DeliveryPlanning;
