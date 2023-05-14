/**
 * Copyright (c) 2023
 *
 * @summary Implementation of package delivery step which is part of delivery plan workflow
 * @author Zilin Li
 * @date 2023-04-28  
 *  
 */

// Project imports
import "./InfoSelection.css";
import { showError } from '../../../../utils/dialog_utils';
import { DELIVERY_STATE, DISPATCHER_TYPE, DISPATCH_SPEED_TYPE } from '../../../../utils/delivery_plan_utils';

// Antd imports
import { Button, Image, Result, Card, Collapse, Dropdown, Space, Table, Progress } from 'antd';
import { LoadingOutlined, SearchOutlined, AimOutlined, InfoCircleFilled, CodeSandboxOutlined, HomeOutlined } from '@ant-design/icons';

const { Panel } = Collapse;
const { Column } = Table;
const PackageDeliveryStep = (
        {   deliverySpeed,
            packageInfo,
            dispatchProgress,
            deliveryAddress,
            dispatcher, 
            deliveryState, 
            setDeliveryState, 
            setNavigationKey,
            setDeliverySpeed}) => {

    const deliveryStepSummary = [
        {
            key: '1',
            address: <div>{deliveryAddress}</div>,
            speed: <div>{deliverySpeed}</div>,
        },
    ];

    const packageInfoStepSummary = [
        {
            key: '1',
            firstName: <div>{packageInfo.firstName}</div>,
            lastName: <div>{packageInfo.lastName}</div>,
            phoneNumber: <div>{packageInfo.phoneNumber}</div>,
            email: <div>{packageInfo.email}</div>,
            content: <div>{packageInfo.content}</div>,
            weight: <div>{packageInfo.weight}</div>,
        },
    ];

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
                <LoadingOutlined style={{fontSize: 50}}/>
                <Progress strokeLinecap="round" percent={Math.floor(dispatchProgress)} />
                <Image preview={false} className="image" width={200} src={dispatcher === DISPATCHER_TYPE.ROBOT ? "./robot.png" : "./drone.png"}/>
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
                        <p>
                            <SearchOutlined />
                            First Way: Use Top-Right Corner Search Bar On Map
                        </p>
                        <p>
                            <AimOutlined />
                            Second Way: Use Left Mouse Click To Localize On Map
                        </p>
                    </Panel>
                    <Panel header="Select Delivery Speed" key="1">
                    <Space direction="vertical">
                        <Dropdown.Button type="primary" menu={dispatchSpeedMenuProps} onClick={handleDispatchSpeedMenuClick}>
                            Speed
                        </Dropdown.Button>
                        </Space>
                    </Panel>
                    <Panel header="Delivery Selection Summary" key="1">
                        <Table dataSource={deliveryStepSummary}>
                            <Column title="Delivery Location" dataIndex="address" key="address" />
                            <Column title="Delivery Speed" dataIndex="speed" key="speed" />
                        </Table>
                    </Panel>
                    <Panel header="Review Package Information" key="1">
                        <Table dataSource={packageInfoStepSummary}>
                            <Column title="First Name" dataIndex="firstName" key="firstName" />
                            <Column title="Last Name" dataIndex="lastName" key="lastName" />
                            <Column title="Email" dataIndex="email" key="email" />
                            <Column title="Phone Number" dataIndex="phoneNumber" key="phoneNumber" />
                            <Column title="Content" dataIndex="content" key="content" />
                            <Column title="Weight" dataIndex="weight" key="weight" />
                        </Table>
                        <p></p>
                        <p>
                            <CodeSandboxOutlined/>
                            Please go back and review the package information again.    
                        </p>
                    </Panel>
                    <Panel header="Delivery Confirmation" key="1">
                        <Button 
                            type="primary" 
                            onClick={() => {
                                if (deliveryAddress === "-") {
                                    showError("Error!" ,"The delivery location can not be empty . ");
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
                <Image preview={false} className="image" width={200} src={"./delivery_box.png"}/>
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
                        <Table dataSource={deliveryStepSummary}>
                            <Column title="Delivery Location" dataIndex="address" key="address" />
                            <Column title="Delivery Speed" dataIndex="speed" key="speed" />
                        </Table>
                        <Table dataSource={packageInfoStepSummary}>
                            <Column title="Content" dataIndex="content" key="content" />
                            <Column title="Weight" dataIndex="weight" key="weight" />
                        </Table>
                        <Table dataSource={packageInfoStepSummary}>
                            <Column title="First Name" dataIndex="firstName" key="firstName" />
                            <Column title="Last Name" dataIndex="lastName" key="lastName" />
                            <Column title="Email" dataIndex="email" key="email" />
                            <Column title="Phone Number" dataIndex="phoneNumber" key="phoneNumber" />
                        </Table>
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
                <Image preview={false} className="image" width={200} src={"./delivery_box.png"}/>
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
                    <Button type="primary" onClick={() => {setNavigationKey("3")}}>View Order Tracking History</Button>,
                ]}
            />
            <Image preview={false} className="image" width={200} src={"./thanks.png"}/>
        </Card>
    );
};

export default PackageDeliveryStep;