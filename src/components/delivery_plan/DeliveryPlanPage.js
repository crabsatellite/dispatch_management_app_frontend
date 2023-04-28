import { Tabs } from "antd";
import React, { useState } from "react";
import LoginForm from "./user_registration/LoginForm"
import DeliveryPlanning from "./delivery_planning/DeliveryPlanning";
import DeliveryHistory from "./delivery_history/DeliveryHistory";

const { TabPane } = Tabs;

const DeliveryPlanPage = () => {

    const [authed, setAuthed] = useState(false);
    const [tabKey, setTabKey] = useState('1');
    return (
        <div>
            {
                !authed? <LoginForm setAuthed={setAuthed}/>
                : <div>
                <Tabs 
                    defaultActiveKey="1" 
                    activeKey={tabKey}
                    destroyInactiveTabPane={true}
                    onChange={(newKey) => {setTabKey(newKey)}}
                >
                <TabPane tab="Delivery Planning" key="1">
                    <DeliveryPlanning authed={authed} setTabKey={setTabKey}/>
                </TabPane>
                <TabPane tab="Delivery History" key="2"    >
                    <DeliveryHistory />
                </TabPane>
                </Tabs>
            </div>  
            }
        </div>
    );
};

export default DeliveryPlanPage;