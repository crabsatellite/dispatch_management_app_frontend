import { Button, Image } from 'antd';
import { DISPATCH_STATE, DISPATCHER_TYPE } from '../../../../utils/delivery_plan_utils';
import "./InfoSelection.css";

const PackageDelivery = ({dispatcher, deliveryState, setDeliveryState}) => {

    if (deliveryState == DISPATCH_STATE.DELIVER_PROCESSING) {
        return (<div class="parent">
                    <p class="text">THE DISPATCHER IS MOVING TOWARD YOUR PICK-UP LOCATION...</p>
                    <Image className="image" width={200} src={dispatcher === DISPATCHER_TYPE.ROBOT ? "./robot.png" : "./drone.png"}/>
                </div>);

    } else if (deliveryState == DISPATCH_STATE.DELIVER_PREPARATION) {
        return (<Button type="primary" onClick={() => {setDeliveryState(DISPATCH_STATE.DELIVER_PROCESSING)}}>Auto Dispatch</Button>);
    }
    return <div>THANK YOU FOR CHOOSING OUR SERVICE!</div>
};

export default PackageDelivery;