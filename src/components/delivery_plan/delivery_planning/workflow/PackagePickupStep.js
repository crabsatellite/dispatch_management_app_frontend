/**
 * Copyright (c) 2023
 *
 * @summary Implementation of package pick-up step which is part of delivery plan workflow
 * @author Zilin Li
 * @date 2023-04-28  
 *  
 */

// Project imports
import "./InfoSelection.css";
import { showError } from '../../../../utils/dialog_utils';
import { DELIVERY_STATE, DISPATCHER_START_LOCATION_KEY, DISPATCHER_TYPE, DISPATCH_SPEED_TYPE } from '../../../../utils/delivery_plan_utils';

// Antd imports
import { Button, Image, Result, Card, Dropdown, Collapse, Space, Table } from 'antd';
import { SearchOutlined, AimOutlined, InfoCircleFilled, LoadingOutlined, CaretRightFilled } from '@ant-design/icons';

const { Panel } = Collapse;
const { Column, ColumnGroup } = Table;
const PackagePickupStep = (
        {   pickupSpeed,
            pickupAddress,
            dispatcher, 
            deliveryState, 
            setDispatcher, 
            setDeliveryState, 
            deliveryStartLocationKey,
            setDeliveryStartLocationKey,
            setPickupSpeed}) => {

    const summary = [
        {
            key: '1',
            address: <div>{pickupAddress}</div>,
            dispatcher: <div>{dispatcher}</div>,
            warehouse: <div>{deliveryStartLocationKey}</div>,
            speed: <div>{pickupSpeed}</div>,
        },
        
    ];

    const dispatcherItems = [
        {
            label: 'Robot',
            key: '1',
            icon: <CaretRightFilled />,
        },
        {
            label: 'Air Drone',
            key: '2',
            icon: <CaretRightFilled />,
        },
    ];

    const startLocationItems = [
        {
            label: 'Location A',
            key: '1',
            icon: <CaretRightFilled />,
        },
        {
            label: 'Location B',
            key: '2',
            icon: <CaretRightFilled />,
        },
        {
            label: 'Location C',
            key: '3',
            icon: <CaretRightFilled />,
        },
    ];

    const dispatchSpeedItems = [
        {
            label: 'Priority',
            key: '1',
            icon: <CaretRightFilled />,
        },
        {
            label: 'First Class',
            key: '2',
            icon: <CaretRightFilled />,
        },
        {
            label: 'Normal',
            key: '3',
            icon: <CaretRightFilled />,
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

    const handleDispatchSpeedMenuClick = (e) => {

        switch (e.key) {
            case '1':
                setPickupSpeed(DISPATCH_SPEED_TYPE.PRIORITY);
                break;
            case '2':
                setPickupSpeed(DISPATCH_SPEED_TYPE.FIRST_CLASS);
                break;
            case '3':
                setPickupSpeed(DISPATCH_SPEED_TYPE.NORMAL);
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

    const dispatchSpeedMenuProps = {
        items: dispatchSpeedItems,
        onClick: handleDispatchSpeedMenuClick,
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
                    <p>
                        <SearchOutlined />
                        First Way: Use Top-Right Corner Search Bar On Map
                    </p>
                    <p>
                        <AimOutlined />
                        Second Way: Use Left Mouse Click To Localize On Map
                    </p>
                </Panel>
                <Panel header="Select Pick-up Customization" key="1">
                    <Space direction="vertical">
                        <Dropdown.Button type="primary" menu={startLocationMenuProps} onClick={handleStartLocationMenuClick}>
                            Warehouse
                        </Dropdown.Button>
                        <Dropdown.Button type="primary" menu={dispatcherMenuProps} onClick={handleDispatcherMenuClick}>
                            Dispatcher
                        </Dropdown.Button>
                        <Dropdown.Button type="primary" menu={dispatchSpeedMenuProps} onClick={handleDispatchSpeedMenuClick}>
                            Speed
                        </Dropdown.Button>
                    </Space>
                </Panel>
                <Panel header="Pick-up Selection Summary" key="1">
                    <Table dataSource={summary}>
                        <Column title="Pick-up Location" dataIndex="address" key="address" />
                        <Column title="Warehouse Location" dataIndex="warehouse" key="warehouse" />
                        <Column title="Dispatcher Type" dataIndex="dispatcher" key="dispatcher" />
                        <Column title="Pick-up Speed" dataIndex="speed" key="speed" />
                    </Table>
                </Panel>
                <Panel header="Pick-up Confirmation" key="1">
                    <Button 
                        type="primary" 
                        onClick={() => {
                            if (pickupAddress === "[]") {
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

                    <Table dataSource={summary}>
                        <Column title="Pick-up Location" dataIndex="address" key="address" />
                        <Column title="Warehouse Location" dataIndex="warehouse" key="warehouse" />
                        <Column title="Dispatcher Type" dataIndex="dispatcher" key="dispatcher" />
                        <Column title="Pick-up Speed" dataIndex="speed" key="speed" />
                    </Table>
                </Panel>
                <Panel type="primary" header="Pick-up Dispatch" key="1">
                    <Button style={{marginLeft: 35}} type="primary" onClick={() => {setDeliveryState(DELIVERY_STATE.PICKUP_PROCESSING)}}>Start Pick-up</Button>,
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