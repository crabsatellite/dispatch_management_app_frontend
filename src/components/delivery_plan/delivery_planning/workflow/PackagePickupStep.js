import { Button, Image, Result, Card, Dropdown, Collapse } from 'antd';
import { HomeOutlined, SearchOutlined, AimOutlined, InfoCircleFilled } from '@ant-design/icons';
import { DELIVERY_STATE, DISPATCHER_START_LOCATION_KEY, DISPATCHER_TYPE } from '../../../../utils/delivery_plan_utils';
import "./InfoSelection.css";


const { Panel } = Collapse;
const PackagePickupStep = ({dispatcher, deliveryState, setDispatcher, setDeliveryState, setDeliveryStartLocationKey}) => {

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
                <Panel header="SELECT PICK-UP LOCATION" key="1">
                    <p style={{marginLeft: 90}}>
                        <SearchOutlined />
                        FIRST WAY: TOP-RIGHT CORNER SEARCH BAR FROM MAP
                    </p>
                    <p>
                        <AimOutlined />
                        SECOND WAY: LEFT MOUSE CLICK ON MAP
                    </p>
                </Panel>
                <Panel header="SELECT WAREHOUSE" key="1">
                    <Dropdown.Button style={{marginLeft: 410, top: 100}} type="primary" menu={startLocationMenuProps} onClick={handleStartLocationMenuClick}>
                        Warehouse
                    </Dropdown.Button>
                </Panel>
                <Panel header="SELECT DISPATCHER" key="1">
                    <Dropdown.Button style={{marginLeft: 410}} type="primary" menu={dispatcherMenuProps} onClick={handleDispatcherMenuClick}>
                        Dispatcher
                    </Dropdown.Button>
                </Panel>
                <Panel header="RESET HERE" key="1">
                    <Button type="primary" onClick={() => {setDeliveryState(DELIVERY_STATE.RESET_ROUTE)}}>Reset</Button>
                </Panel>
                <Panel header="DISPATCHER / WAREHOUSE CONFIRMATION" key="1">
                    <Button type="primary" onClick={() => {setDeliveryState(DELIVERY_STATE.PICKUP_INITIALIZATION)}}>Confirm</Button>
                    <p></p>
                    <p>
                        <InfoCircleFilled/>
                        ONCE CLICK, WE WILL PREPRAE THE DISPATCHER FROM SELECTED WAREHOUSE SOON
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
                <Panel header="MODIFIABLE PICK-UP LOCATION" key="1">
                    <p style={{marginLeft: 90}}>
                        <SearchOutlined />
                        FIRST WAY: TOP-RIGHT CORNER SEARCH BAR FROM MAP
                    </p>
                    <p>
                        <AimOutlined />
                        SECOND WAY: LEFT MOUSE CLICK ON MAP
                    </p>
                </Panel>
                <Panel header="RESET YOUR PICK-UP PLANNING" key="1">
                    <Button type="primary" onClick={() => {setDeliveryState(DELIVERY_STATE.RESET_ROUTE)}}>Reset</Button>,
                </Panel>
                <Panel type="primary" header="PICK-UP DISPATCH" key="1">
                    <Button type="primary" onClick={() => {setDeliveryState(DELIVERY_STATE.PICKUP_PROCESSING)}}>Start Pick-up</Button>,
                    <p></p>
                    <p>
                        <InfoCircleFilled />
                        BEFORE CLICK, YOU ARE STILL ALLOWED TO MODIFY PICK-UP LOCATION
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