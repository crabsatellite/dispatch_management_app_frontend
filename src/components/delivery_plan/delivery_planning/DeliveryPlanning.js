import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import { useEffect, useState } from "react";
import { Row, Col, Image } from "antd";
import "./state_machine/DeliveryMap.css";
import DeliveryMapStateMachineController from "./state_machine/DeliveryMapStateMachineController";
import DeliveryWorkflowStateMachineController from "./state_machine/DeliveryWorkflowStateMachineController";
import { showSuccess, showInfo } from "../../../utils/dialog_utils"
import { DELIVERY_STATE, DISPATCHER_START_LOCATION_KEY, DISPATCHER_START_LOCATION, DISPATCHER_TYPE, DISPATCH_SPEED_TYPE } from "../../../utils/delivery_plan_utils";

function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

const DeliveryPlanning = ({authed, setTabKey}) => {
  
  const [currentStep, setCurrentStep] = useState(0); 
  const [pickupAddress, setPickupAddress] = useState("[]");
  const [deliveryAddress, setDeliveryAddress] = useState("[]");
  const [pickupSpeed, setPickupSpeed] = useState(DISPATCH_SPEED_TYPE.NORMAL);
  const [deliverySpeed, setDeliverySpeed] = useState(DISPATCH_SPEED_TYPE.NORMAL);
  const [dispatcher, setDispatcher] = useState(DISPATCHER_TYPE.ROBOT);
  const [deliveryState, setDeliveryState] = useState(DELIVERY_STATE.IDLE);
  const [deliveryStartLocationKey, setDeliveryStartLocationKey] = useState(DISPATCHER_START_LOCATION_KEY.LOCATION_A);
  
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
        setDeliveryStartLocationKey(DISPATCHER_START_LOCATION_KEY.LOCATION_A);
        setDispatcher(DISPATCHER_TYPE.ROBOT);
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
                pickupSpeed={pickupSpeed}
                deliverySpeed={deliverySpeed}
                dispatcher={dispatcher} 
                deliveryStartLocationKey={deliveryStartLocationKey} 
                deliveryState={deliveryState} 
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
            pickupSpeed={pickupSpeed}
            deliverySpeed={deliverySpeed}
            pickupAddress={pickupAddress}
            deliveryAddress={deliveryAddress} 
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            dispatcher={dispatcher} 
            setDispatcher={setDispatcher} 
            deliveryState={deliveryState} 
            setDeliveryState={setDeliveryState} 
            deliveryStartLocationKey={deliveryStartLocationKey}
            setDeliveryStartLocationKey={setDeliveryStartLocationKey} 
            setTabKey={setTabKey}
            setPickupSpeed={setPickupSpeed}
            setDeliverySpeed={setDeliverySpeed}
          />
      </Col>
    </Row>
  );
}

export default DeliveryPlanning;
