import { Button, Image, Result, Card, Collapse } from 'antd';
import { InfoCircleOutlined, SearchOutlined, AimOutlined, InfoCircleFilled } from '@ant-design/icons';
import { DELIVERY_STATE, DISPATCHER_TYPE } from '../../../../utils/delivery_plan_utils';
import "./InfoSelection.css";

const { Panel } = Collapse;
const PackageDelivery = ({dispatcher, deliveryState, setDeliveryState, setTabKey}) => {

    if (deliveryState == DELIVERY_STATE.DELIVER_PROCESSING) {
        return (
        <Card
            title="DELIVERY PROCESSING"
            style={{width: 1000, left: 20}}
        >
            <Result
                title="DISPATCH FOR DELIVERY"
                subTitle="THE DISPATCHER IS MOVING TOWARDS YOUR DELIVERY LOCATION......"
            />
            <Image className="image" width={200} src={dispatcher === DISPATCHER_TYPE.ROBOT ? "./robot.png" : "./drone.png"}/>
        </Card>
        );

    } else if (deliveryState == DELIVERY_STATE.DELIVER_PREPARATION) {

        return (
            <Card
                title="DELIVERY REVIEW"
                style={{width: 1000, left: 20}}
            >
                 <Collapse bordered={false} defaultActiveKey={['1']}>
                    <Panel header="SELECT DELIVERY LOCATION" key="1">
                        <p style={{marginLeft: 90}}>
                            <SearchOutlined />
                            FIRST WAY: TOP-RIGHT CORNER SEARCH BAR FROM MAP
                        </p>
                        <p>
                            <AimOutlined />
                            SECOND WAY: LEFT MOUSE CLICK ON MAP
                        </p>
                    </Panel>
                    <Panel header="REVIEW PACKAGE INFORMATION" key="1">
                    <Button type="primary" onClick={() => {setDeliveryState(DELIVERY_STATE.DELIVER_INITIALIZATION)}}>Confirm</Button>
                    <p></p>
                    <p>
                        <InfoCircleFilled/>
                        ONCE CLICK, IT IS NOT ALLOWED TO MODIFY PACKAGE INFORMATION AGAIN
                    </p>
                    </Panel>
                </Collapse>
                <Image className="image" width={200} src={"./delivery_box.png"}/>
            </Card>
        );
    } else if (deliveryState == DELIVERY_STATE.DELIVER_INITIALIZATION) {

        return (
            <Card
                title="DELIVERY SOON"
                style={{width: 1000, left: 20}}
            >
                <Collapse bordered={false} defaultActiveKey={['1']}>
                    <Panel header="MODIFIABLE DELIVERY LOCATION" key="1">
                        <p style={{marginLeft: 90}}>
                            <SearchOutlined />
                            FIRST WAY: TOP-RIGHT CORNER SEARCH BAR FROM MAP
                        </p>
                        <p>
                            <AimOutlined />
                            SECOND WAY: LEFT MOUSE CLICK ON MAP
                        </p>
                    </Panel>
                    <Panel header="DELIVERY DISPATCH" key="1">
                        <Button type="primary" onClick={() => {setDeliveryState(DELIVERY_STATE.DELIVER_PROCESSING)}}>Delivery Dispatch</Button>
                        <p></p>
                        <p>
                            <InfoCircleFilled />
                            BEFORE CLICK, YOU ARE STILL ALLOWED TO MODIFY DELIVERY LOCATION
                        </p>
                    </Panel>
                </Collapse>
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
                    <Button type="primary" onClick={() => {setDeliveryState(DELIVERY_STATE.RESET_ROUTE)}}>Place Another Delivery Plan</Button>,
                    <Button type="primary" onClick={() => {setTabKey('2')}}>View Delivery History</Button>,
                ]}
            />
            <Image className="image" width={200} src={"./thanks.png"}/>
        </Card>
    );
};

export default PackageDelivery;