import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import { useEffect, useState } from "react";
import { Row, Col, Image } from "antd";
import "./state_machine/DeliveryMap.css";
import DeliveryMapStateMachineController from "./state_machine/DeliveryMapStateMachineController";
import DeliveryWorkflowStateMachineController from "./state_machine/DeliveryWorkflowStateMachineController";
import { showSuccess, showInfo } from "../../../utils/dialog_utils"
import { DELIVERY_STATE, DISPATCHER_START_LOCATION_KEY, DISPATCHER_START_LOCATION, DISPATCHER_TYPE } from "../../../utils/delivery_plan_utils";

function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

const DeliveryPlanning = ({authed, setTabKey}) => {
  
  const [currentStep, setCurrentStep] = useState(0); 
  const [focusPointAddress, setFocusPointAddress] = useState("[]"); 
  const [dispatcher, setDispatcher] = useState(DISPATCHER_TYPE.ROBOT);
  const [deliveryState, setDeliveryState] = useState(DELIVERY_STATE.IDLE);
  const [deliveryStartLocationKey, setDeliveryStartLocationKey] = useState(DISPATCHER_START_LOCATION_KEY.LOCATION_A);

  useEffect(() => {
    localStorage.setItem("pickupAddress", "[]");
    localStorage.setItem("deliveryAddress", "[]");
  }, []);

  useEffect(() => {
    if (deliveryState === DELIVERY_STATE.PICKUP_PREPARATION) {
      localStorage.setItem("pickupAddress", focusPointAddress);

    } else if (deliveryState === DELIVERY_STATE.DELIVER_PREPARATION) {
      localStorage.setItem("deliveryAddress", focusPointAddress);

    } else if (deliveryState === DELIVERY_STATE.RESET_ROUTE) {
      setDeliveryStartLocationKey(DISPATCHER_START_LOCATION_KEY.LOCATION_A);
      setDispatcher(DISPATCHER_TYPE.ROBOT);
      localStorage.setItem("pickupAddress", "[]");
      localStorage.setItem("deliveryAddress", "[]");
      setDeliveryState(DELIVERY_STATE.PICKUP_PREPARATION);
    }
  }, [focusPointAddress]);
  
  useEffect(() => {
    if (authed) {
      setDeliveryState(DELIVERY_STATE.PICKUP_PREPARATION);
    }
  }, [authed]);

  useEffect(() => {

    console.log("Package Delivery State: " + deliveryState);
    switch (deliveryState) {

      case DELIVERY_STATE.DELIVER_PREPARATION:
        if (currentStep === 1) {
          setCurrentStep(currentStep + 1);
          localStorage.setItem("deliveryAddress", focusPointAddress);
          showInfo("Information", "The dispatcher has arrived the pick-up location, please review package information before handing over your package to dispatcher");
        }
        break;

      case DELIVERY_STATE.DELIVER_FINISHED:
        showSuccess("Confirmation", "The package is delivered successfully!");
        break;  

      case DELIVERY_STATE.RESET_ROUTE:
        if (currentStep === 2) {
          setCurrentStep(0);
        }
    }
  }, [deliveryState]);

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
                dispatcher={dispatcher} 
                deliveryStartLocationKey={deliveryStartLocationKey} 
                deliveryState={deliveryState} 
                setDeliveryState={setDeliveryState} 
                setFocusPointAddress={setFocusPointAddress}
              />
          </MapContainer>

          {currentStep === 0 || 
           deliveryState === DELIVERY_STATE.PICKUP_INITIALIZATION ||
           deliveryState === DELIVERY_STATE.PICKUP_PROCESSING || 
           deliveryState === DELIVERY_STATE.DELIVER_INITIALIZATION || 
           deliveryState === DELIVERY_STATE.DELIVER_PROCESSING || 
           deliveryState === DELIVERY_STATE.DELIVER_FINISHED ? 
            <Image className="stack-top" preview={false} src={"./blur_layer.png"}/> : <></>
          }
        </div>
      </Col>
      <Col span={12}>
          <DeliveryWorkflowStateMachineController
            focusPointAddress={focusPointAddress} 
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            dispatcher={dispatcher} 
            setDispatcher={setDispatcher} 
            deliveryState={deliveryState} 
            setDeliveryState={setDeliveryState} 
            deliveryStartLocationKey={deliveryStartLocationKey}
            setDeliveryStartLocationKey={setDeliveryStartLocationKey} 
            setTabKey={setTabKey}
          />
      </Col>
    </Row>
  );
}

export default DeliveryPlanning;
