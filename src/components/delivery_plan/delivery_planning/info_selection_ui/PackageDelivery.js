import { Button, Image, Result, Card } from 'antd';
import { DISPATCH_STATE, DISPATCHER_TYPE } from '../../../../utils/delivery_plan_utils';
import "./InfoSelection.css";

const PackageDelivery = ({dispatcher, deliveryState, setDeliveryState, setTabKey}) => {

    if (deliveryState == DISPATCH_STATE.DELIVER_PROCESSING) {
        return (
        <Card
            title="DELIVERY INFORMATION"
            style={{width: 1000, left: 20}}
        >
            <Result
                title="DISPATCH FOR DELIVERY"
                subTitle="THE DISPATCHER IS MOVING TOWARDS YOUR DELIVERY LOCATION......"
            />
            <Image className="image" width={200} src={dispatcher === DISPATCHER_TYPE.ROBOT ? "./robot.png" : "./drone.png"}/>
        </Card>
        );

    } else if (deliveryState == DISPATCH_STATE.DELIVER_PREPARATION) {

        return (
            <Card
                title="DELIVERY INFORMATION"
                style={{width: 1000, left: 20}}
            >
                <Button type="primary" onClick={() => {setDeliveryState(DISPATCH_STATE.DELIVER_PROCESSING)}}>Auto Dispatch</Button>
                <Image className="image" width={200} src={"./delivery_box.png"}/>
            </Card>
        );
    }

    return (
        <Card
            title="DELIVERY CONFIRMATION"
            style={{width: 1000, left: 20}}
        >
            <Result
                status="success"
                title="YOUR PACKAGE IS DELIVERED SUCCESSFULLY!"
                subTitle="THANK YOU FOR CHOOSING OUR SERVICE"
                extra={[
                    <Button type="primary" onClick={() => {setDeliveryState(DISPATCH_STATE.RESET_ROUTE)}}>Place Another Delivery Plan</Button>,
                    <Button type="primary" onClick={() => {setTabKey('2')}}>View Delivery History</Button>,
                ]}
            />
            <Image className="image" width={200} src={"./thanks.png"}/>
        </Card>
    );
};

export default PackageDelivery;