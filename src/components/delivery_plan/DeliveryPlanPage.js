/**
 * Copyright (c) 2023
 *
 * @summary Implementation of delivery planning page
 * @author Zilin Li
 * @date 2023-04-28  
 *  
 */

// Project imports
import DeliveryPlanning from "./delivery_planning/DeliveryPlanning";
import DeliveryOrderHistory from "./delivery_order_history/DeliveryOrderHistory";

// Antd imports
import { Tabs } from "antd";

// React imports
import React, { useState } from "react";

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