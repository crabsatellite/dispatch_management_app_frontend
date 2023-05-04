import { Button, Image, Result, Card, Collapse,Descriptions, Dropdown } from 'antd';
import { LoadingOutlined, SearchOutlined, AimOutlined, InfoCircleFilled, CodeSandboxOutlined, HomeOutlined } from '@ant-design/icons';
import { DELIVERY_STATE, DISPATCHER_TYPE, DISPATCH_SPEED_TYPE } from '../../../../utils/delivery_plan_utils';
import "./InfoSelection.css";
import { showError } from '../../../../utils/dialog_utils';

const { Panel } = Collapse;
const PackageDeliveryStep = (
        {   deliverySpeed,
            deliveryAddress,
            dispatcher, 
            deliveryState, 
            setDeliveryState, 
            setTabKey,
            setDeliverySpeed}) => {

    const dispatchSpeedItems = [
        {
            label: 'Priority',
            key: '1',
            icon: <HomeOutlined />,
        },
        {
            label: 'First Class',
            key: '2',
            icon: <HomeOutlined />,
        },
        {
            label: 'Normal',
            key: '3',
            icon: <HomeOutlined />,
        },
    ];

    const handleDispatchSpeedMenuClick = (e) => {

        switch (e.key) {
            case '1':
                setDeliverySpeed(DISPATCH_SPEED_TYPE.PRIORITY);
                break;
            case '2':
                setDeliverySpeed(DISPATCH_SPEED_TYPE.FIRST_CLASS);
                break;
            case '3':
                setDeliverySpeed(DISPATCH_SPEED_TYPE.NORMAL);
                break;
        }
    };

    const dispatchSpeedMenuProps = {
        items: dispatchSpeedItems,
        onClick: handleDispatchSpeedMenuClick,
    };

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
                <LoadingOutlined style={{fontSize: 50, marginLeft: 200}}/>
                <Image className="image" width={200} src={dispatcher === DISPATCHER_TYPE.ROBOT ? "./robot.png" : "./drone.png"}/>
            </Card>
        );

    } else if (deliveryState == DELIVERY_STATE.DELIVER_PREPARATION) {

        return (
            <Card
                title="DELIVERY PLANNING"
                style={{width: 1000, left: 20}}
            >
                 <Collapse bordered={false} defaultActiveKey={['1']}>
                    <Panel header="Select Delivery Location" key="1">
                        <p style={{marginLeft: 90}}>
                            <SearchOutlined />
                            First Way: Use Top-Right Corner Search Bar On Map
                        </p>
                        <p>
                            <AimOutlined />
                            Second Way: Use Left Mouse Click To Localize On Map
                        </p>
                        <p style={{marginLeft: 315}}>
                        <Descriptions>
                            <Descriptions.Item label="Delivery Location">{deliveryAddress}</Descriptions.Item>
                        </Descriptions>
                        </p>
                    </Panel>
                    <Panel header="Select Delivery Speed" key="1">
                    <Dropdown.Button style={{marginLeft: 410}} type="primary" menu={dispatchSpeedMenuProps} onClick={handleDispatchSpeedMenuClick}>
                            Speed
                        </Dropdown.Button>
                        <p></p>
                        <p>Selection: {deliverySpeed}</p>
                    </Panel>
                    <Panel header="Review Package Information" key="1">
                    <p></p>
                    <p>
                        <CodeSandboxOutlined/>
                        Please go back and review the package information again.    
                    </p>
                    </Panel>
                    <Panel header="Confirmation" key="1">
                        <Button 
                            type="primary" 
                            onClick={() => {
                                if (deliveryAddress === "[]") {
                                    showError("Error!" ,"The delivery location can not be empty");
                                    return;
                                }
                                setDeliveryState(DELIVERY_STATE.DELIVER_INITIALIZATION)
                            }}
                        >
                            Confirm
                        </Button>
                        <p></p>
                        <p>
                            <InfoCircleFilled/>
                            Once click, the package information and delivery location are confirmed.
                        </p>
                    </Panel>
                </Collapse>
                <Image className="image" width={200} src={"./delivery_box.png"}/>
            </Card>
        );
    } else if (deliveryState == DELIVERY_STATE.DELIVER_INITIALIZATION) {

        return (
            <Card
                title="DELIVERY ONBOARDING"
                style={{width: 1000, left: 20}}
            >
                <Collapse bordered={false} defaultActiveKey={['1']}>
                    <Panel header="Delivery Planning Summary" key="1">
                        <Descriptions layout="vertical">
                            <Descriptions.Item label="Package Information">Placeholder</Descriptions.Item>
                            <Descriptions.Item label="Delivery Location">{deliveryAddress}</Descriptions.Item>
                            <Descriptions.Item label="Delivery Speed">{deliverySpeed}</Descriptions.Item>
                        </Descriptions>   
                    </Panel>
                    <Panel type="primary" header="Delivery Dispatch" key="1">
                        <Button type="primary" onClick={() => {setDeliveryState(DELIVERY_STATE.DELIVER_PROCESSING)}}>Start Delivery</Button>,
                        <p></p>
                        <p>
                            <InfoCircleFilled />
                            Once click, the dispatcher will proceed towards your delivery location.
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

export default PackageDeliveryStep;