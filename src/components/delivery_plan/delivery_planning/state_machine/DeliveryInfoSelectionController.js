import React, { useEffect, useState } from 'react';
import { Button, Steps } from 'antd';
import { CodeSandboxOutlined, RocketOutlined, AimOutlined } from '@ant-design/icons';
import { DELIVERY_STATE } from '../../../../utils/delivery_plan_utils';

import PackagePickupStep from '../info_selection_ui/PackagePickupStep';
import PackageInformationStep from '../info_selection_ui/PackageInformationStep';
import PackageDelivery from '../info_selection_ui/PackageDelivery';

const DeliveryPlanSelectionController = ({dispatcher, setDispatcher, deliveryState, setDeliveryState, setDeliveryStartLocationKey, setTabKey}) => {

    const steps = [
      {
          title: 'Package Information',
          content: <PackageInformationStep deliveryState={deliveryState}/>,
          icon: <CodeSandboxOutlined />,
      },
      {
          title: 'Package Pick-up',
          content: <PackagePickupStep dispatcher={dispatcher} deliveryState={deliveryState} setDispatcher={setDispatcher} setDeliveryState={setDeliveryState} setDeliveryStartLocationKey={setDeliveryStartLocationKey}></PackagePickupStep>,
          icon: <AimOutlined />,
      },
      {
          title: 'Package Delivery',
          content: <PackageDelivery dispatcher={dispatcher} deliveryState={deliveryState} setDeliveryState={setDeliveryState} setTabKey={setTabKey}></PackageDelivery>,
          icon: <RocketOutlined />,
      },
    ];

    const [current, setCurrent] = useState(0);
    const items = steps.map((item) => ({ key: item.title, title: item.title, icon: item.icon }));
    
    useEffect(() => {
      if (current === 1 && deliveryState == DELIVERY_STATE.DELIVER_PREPARATION) {
        setCurrent(current + 1);
      }
      if (current === 2 && deliveryState == DELIVERY_STATE.RESET_ROUTE) {
        setCurrent(0);
      }

    }, [deliveryState]);

    return (
      <>
        <Steps current={current} items={items} style={{marginLeft: 20}}/>
        <div style={{lineHeight: '700px', textAlign: 'center', marginTop: 16,}}>{steps[current].content}</div>
        <div style={{ marginTop: 24 }}>
          {(current === 1 || current === 2) && (
            <Button style={{marginLeft: 22}} type="primary" onClick={() => setCurrent(0)}>
              Back To Package Information
            </Button>
          )}
          {(current === 0 && (deliveryState == DELIVERY_STATE.DELIVER_PREPARATION
            || deliveryState == DELIVERY_STATE.DELIVER_INITIALIZATION 
            || deliveryState == DELIVERY_STATE.DELIVER_PROCESSING 
            || deliveryState == DELIVERY_STATE.DELIVER_FINISHED)) && (
            <Button style={{marginLeft: 22}} type="primary" onClick={() => setCurrent(2)}>
              Proceed To Delivery Planning
            </Button>)
          }
          {(current === 0 && (deliveryState === DELIVERY_STATE.PICKUP_PREPARATION 
            || deliveryState === DELIVERY_STATE.PICKUP_INITIALIZATION
            || deliveryState === DELIVERY_STATE.PICKUP_PROCESSING)) && (
            <Button style={{marginLeft: 22}} type="primary" onClick={() => setCurrent(1)}>
              Proceed To Pick-Up Planning
            </Button>)
          }
        </div>
      </>
    );
};

export default DeliveryPlanSelectionController;