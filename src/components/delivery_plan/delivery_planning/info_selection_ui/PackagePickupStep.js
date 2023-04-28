import { Button, Image, Result, Card } from 'antd';
import { DISPATCH_STATE, DISPATCHER_START_LOCATION_KEY, DISPATCHER_TYPE } from '../../../../utils/delivery_plan_utils';
import "./InfoSelection.css";

const PackagePickupStep = ({dispatcher, deliveryState, setDispatcher, setDeliveryState, setDeliveryStartLocationKey}) => {

    if (deliveryState === DISPATCH_STATE.PICKUP_PROCESSING) {

        return (
        <Card
            title="PICK-UP INFORMATION"
            style={{width: 1000, left: 20}}
        >
            <Result
                title="DISPATCH FOR PICK-UP"
                subTitle="THE DISPATCHER IS MOVING TOWARDS YOUR PICK-UP LOCATION......"
            />
            <Image className="image" width={200} src={dispatcher === DISPATCHER_TYPE.ROBOT ? "./robot.png" : "./drone.png"}/>
        </Card>
        );

    } else if (deliveryState === DISPATCH_STATE.PICKUP_PREPARATION) {

        return (
        <Card
            title="PICK-UP PLANNING"
            style={{width: 1000, left: 20}}
        >
            <Button onClick={() => {setDeliveryState(DISPATCH_STATE.RESET_ROUTE)}}>Reset</Button>
            <Button onClick={() => {setDispatcher(DISPATCHER_TYPE.ROBOT)}}>Select Robot</Button>
            <Button onClick={() => {setDispatcher(DISPATCHER_TYPE.AIR_DRONE)}}>Select AirDrone</Button>
            <Button onClick={() => {setDeliveryStartLocationKey(DISPATCHER_START_LOCATION_KEY.LOCATION_A)}}>Select Start Location A</Button>
            <Button onClick={() => {setDeliveryStartLocationKey(DISPATCHER_START_LOCATION_KEY.LOCATION_B)}}>Select Start Location B</Button>
            <Button onClick={() => {setDeliveryStartLocationKey(DISPATCHER_START_LOCATION_KEY.LOCATION_C)}}>Select Start Location C</Button>
            <Button type="primary" onClick={() => {setDeliveryState(DISPATCH_STATE.PICKUP_INITIALIZATION)}}>Pick-up Review</Button>
            <Image className="image" width={200} src={"./location.png"}/>
        </Card>
        );
    } else if (deliveryState === DISPATCH_STATE.PICKUP_INITIALIZATION) {

        return (
        <Card
            title="PICK-UP INFORMATION"
            style={{width: 1000, left: 20}}
        >
            <Button onClick={() => {setDeliveryState(DISPATCH_STATE.RESET_ROUTE)}}>Reset</Button>,
            <Button type="primary" onClick={() => {setDeliveryState(DISPATCH_STATE.PICKUP_PROCESSING)}}>Start Pick-up</Button>,
            <Image className="image" width={200} src={dispatcher === DISPATCHER_TYPE.ROBOT ? "./robot.png" : "./drone.png"}/>
        </Card>
        );
    }
    return null;
};

export default PackagePickupStep;