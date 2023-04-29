import { Tabs } from "antd";
import React, { useState } from "react";
import DeliveryPlanning from "./delivery_planning/DeliveryPlanning";
import DeliveryOrderHistory from "./delivery_order_history/DeliveryOrderHistory";

const { TabPane } = Tabs;

const DeliveryPlanPage = ({authed}) => {

    const [tabKey, setTabKey] = useState('1');
    return (
        <div>
            {
            <Tabs 
                defaultActiveKey="1" 
                activeKey={tabKey}
                destroyInactiveTabPane={true}
                onChange={(newKey) => {setTabKey(newKey)}}
            >
            <TabPane tab="Delivery Planning" key="1">
                <DeliveryPlanning authed={authed} setTabKey={setTabKey}/>
            </TabPane>
            <TabPane tab="Delivery Order History" key="2"    >
                <DeliveryOrderHistory />
            </TabPane>
            </Tabs> 
            }
        </div>
    );
};

export default DeliveryPlanPage;