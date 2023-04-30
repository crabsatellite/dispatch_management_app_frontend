import { Button, Image, Result, Card, Dropdown, Collapse, Descriptions } from 'antd';
import { HomeOutlined, SearchOutlined, AimOutlined, InfoCircleFilled, LoadingOutlined } from '@ant-design/icons';
import { DELIVERY_STATE, DISPATCHER_START_LOCATION_KEY, DISPATCHER_TYPE } from '../../../../utils/delivery_plan_utils';
import "./InfoSelection.css";
import { showError } from '../../../../utils/dialog_utils';


const { Panel } = Collapse;
const PackagePickupStep = (
        {   focusPointAddress,
            dispatcher, 
            deliveryState, 
            setDispatcher, 
            setDeliveryState, 
            deliveryStartLocationKey,
            setDeliveryStartLocationKey}) => {

    const dispatcherItems = [
        {
            label: 'Robot',
            key: '1',
            icon: <HomeOutlined />,
        },
        {
            label: 'Air Drone',
            key: '2',
            icon: <HomeOutlined />,
        },
    ];

    const startLocationItems = [
        {
            label: 'Location A',
            key: '1',
            icon: <HomeOutlined />,
        },
        {
            label: 'Location B',
            key: '2',
            icon: <HomeOutlined />,
        },
        {
            label: 'Location C',
            key: '3',
            icon: <HomeOutlined />,
        },
    ];

    const handleDispatcherMenuClick = (e) => {

        switch (e.key) {
            case '1':
                setDispatcher(DISPATCHER_TYPE.ROBOT);
                break;
            case '2':
                setDispatcher(DISPATCHER_TYPE.AIR_DRONE);
                break;
        }
    };

    const handleStartLocationMenuClick = (e) => {

        switch (e.key) {
            case '1':
                setDeliveryStartLocationKey(DISPATCHER_START_LOCATION_KEY.LOCATION_A);
                break;
            case '2':
                setDeliveryStartLocationKey(DISPATCHER_START_LOCATION_KEY.LOCATION_B);
                break;
            case '3':
                setDeliveryStartLocationKey(DISPATCHER_START_LOCATION_KEY.LOCATION_C);
                break;
        }
    };

    const dispatcherMenuProps = {
        items: dispatcherItems,
        onClick: handleDispatcherMenuClick,
    };

    const startLocationMenuProps = {
        items: startLocationItems,
        onClick: handleStartLocationMenuClick,
    };

    if (deliveryState === DELIVERY_STATE.PICKUP_PROCESSING) {

        return (
        <Card
            title="PICK-UP PROCESSING"
            style={{width: 1000, left: 20}}
        >
            <Result
                title="DISPATCH FOR PICK-UP"
                subTitle="THE DISPATCHER IS MOVING TOWARDS YOUR PICK-UP LOCATION......"
            />
            <LoadingOutlined style={{fontSize: 50, marginLeft: 200}}/>
            <Image className="image" width={200} src={dispatcher === DISPATCHER_TYPE.ROBOT ? "./robot.png" : "./drone.png"}/>
        </Card>
        );

    } else if (deliveryState === DELIVERY_STATE.PICKUP_PREPARATION) {

        return (
        <Card
            title="PICK-UP PLANNING"
            style={{width: 1000, left: 20}}
        >   
            <Collapse bordered={false} defaultActiveKey={['1']}>
                <Panel header="Select Pick-up Location" key="1">
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
                        <Descriptions.Item label="Pick-up Location">{focusPointAddress}</Descriptions.Item>
                    </Descriptions>
                    </p>
                </Panel>
                <Panel header="Select Warehouse" key="1">
                    <Dropdown.Button style={{marginLeft: 410, top: 100}} type="primary" menu={startLocationMenuProps} onClick={handleStartLocationMenuClick}>
                        Warehouse
                    </Dropdown.Button>
                </Panel>
                <Panel header="Select Dispatcher" key="1">
                    <Dropdown.Button style={{marginLeft: 410}} type="primary" menu={dispatcherMenuProps} onClick={handleDispatcherMenuClick}>
                        Dispatcher
                    </Dropdown.Button>
                </Panel>
                <Panel header="Confirmation" key="1">
                    <Button 
                        type="primary" 
                        onClick={() => {
                            if (focusPointAddress === "[]") {
                                showError("Error!" ,"The pick-up location can not be empty");
                                return;
                            }
                            setDeliveryState(DELIVERY_STATE.PICKUP_INITIALIZATION)
                        }}
                    >
                        Confirm
                    </Button>
                    <p></p>
                    <p>
                        <InfoCircleFilled/>
                        Once click, the warehouse location, dispatcher type and pick-up location are confirmed.
                    </p>
                </Panel>
            </Collapse>
            <Image className="image" width={200} src={"./location.png"}/>
        </Card>
        );
    } else if (deliveryState === DELIVERY_STATE.PICKUP_INITIALIZATION) {

        return (
        <Card
            title="PICK-UP ONBOARDING"
            style={{width: 1000, left: 20}}
        >
            <Collapse bordered={false} defaultActiveKey={['1']}>
                <Panel header="Pick-up Planning Summary" key="1">
                    <Descriptions layout="vertical">
                        <Descriptions.Item label="Pick-up Location">{focusPointAddress}</Descriptions.Item>
                        <Descriptions.Item label="Warehouse Location">{deliveryStartLocationKey}</Descriptions.Item>
                        <Descriptions.Item label="Dispatcher Type">{dispatcher}</Descriptions.Item>
                    </Descriptions>   
                </Panel>
                <Panel type="primary" header="Pick-up Dispatch" key="1">
                    <Button type="primary" onClick={() => {setDeliveryState(DELIVERY_STATE.PICKUP_PROCESSING)}}>Start Pick-up</Button>,
                    <p></p>
                    <p>
                        <InfoCircleFilled />
                        Once click, the dispatcher will proceed towards your pick-up location.
                    </p>
                </Panel>
            </Collapse>
            
            <Image className="image" width={200} src={dispatcher === DISPATCHER_TYPE.ROBOT ? "./robot.png" : "./drone.png"}/>
        </Card>
        );
    }
    return null;
};

export default PackagePickupStep;