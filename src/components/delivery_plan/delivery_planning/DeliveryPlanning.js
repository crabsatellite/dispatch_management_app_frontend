import L from "leaflet";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import { useEffect, useState } from "react";
import { Row, Col } from "antd";
import "./state_machine/DeliveryMap.css";
import DeliveryMapStateMachineController from "./state_machine/DeliveryMapStateMachineController";
import DeliveryInfoSelectionController from "./state_machine/DeliveryInfoSelectionController";
import { showSuccess } from "../../../utils/dialog_utils"
import { DELIVERY_STATE, DELIVERY_START_LOCATION_KEY, DELIVERY_START_LOCATION } from "../../../utils/delivery_plan_utils";


let markerIcon = L.icon({
  iconUrl: "/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
});


function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

const DeliveryMap = ({authed}) => {
  
  const [deliveryState, setDeliveryState] = useState(DELIVERY_STATE.UNDEFINED);
  const [deliveryStartLocationKey, setDeliveryStartLocationKey] = useState(DELIVERY_START_LOCATION_KEY.LOCATION_A);
  
  useEffect(() => {
    if (authed) {
      setDeliveryState(DELIVERY_STATE.PLANNING);
    }
  }, [authed]);

  useEffect(() => {

    console.log("Package Delivery State: " + deliveryState);
    if (deliveryState === DELIVERY_STATE.SUCCESS) {
      showSuccess("Confirmation", "The package is delivered successfully!");
      setDeliveryState(DELIVERY_STATE.PLANNING);
    }
  }, [deliveryState]);

  return (
    <Row>
      <Col span={12}>
        <MapContainer center={DELIVERY_START_LOCATION[deliveryStartLocationKey]} zoom={13} scrollWheelZoom={false}>
          <ChangeView center={DELIVERY_START_LOCATION[deliveryStartLocationKey]} zoom={13} /> 
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
            <DeliveryMapStateMachineController deliveryStartLocationKey={deliveryStartLocationKey} deliveryState={deliveryState} setDeliveryState={setDeliveryState}></DeliveryMapStateMachineController>
        </MapContainer>
      </Col>
      <Col span={12}>
          <DeliveryInfoSelectionController setDeliveryState={setDeliveryState} setDeliveryStartLocationKey={setDeliveryStartLocationKey}></DeliveryInfoSelectionController>
      </Col>
    </Row>
  );
}

export default DeliveryMap;
