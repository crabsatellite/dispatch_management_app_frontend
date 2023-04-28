import React, { useEffect, useState } from 'react';
import { Button, Steps } from 'antd';
import { CodeSandboxOutlined, RocketOutlined, AimOutlined } from '@ant-design/icons';
import { DISPATCH_STATE } from '../../../../utils/delivery_plan_utils';

import PackagePickupStep from '../info_selection_ui/PackagePickupStep';
import PackageInformationStep from '../info_selection_ui/PackageInformationStep';
import PackageDelivery from '../info_selection_ui/PackageDelivery';


const DeliveryPlanSelectionController = ({dispatcher, setDispatcher, deliveryState, setDeliveryState, setDeliveryStartLocationKey, setTabKey}) => {

    const steps = [
        {
            title: 'Package Information',
            content: <PackageInformationStep />,
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

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title, icon: item.icon }));

  const contentStyle: React.CSSProperties = {
    lineHeight: '700px',
    textAlign: 'center',
    
    marginTop: 16,
  };

  useEffect(() => {
    if (current === 1 && deliveryState == DISPATCH_STATE.DELIVER_PREPARATION) {
      next();
    }
    if (current === 2 && deliveryState == DISPATCH_STATE.RESET_ROUTE) {
      setCurrent(0);
    }

  }, [deliveryState]);


  return (
    <>
      <Steps current={current} items={items} />
      <div style={contentStyle}>{steps[current].content}</div>
      <div style={{ marginTop: 24 }}>
        {(current === 1 || current === 2) && (
          <Button type="primary" onClick={() => setCurrent(0)}>
            Back To Package Information
          </Button>
        )}
        {(current === 0 && (deliveryState == DISPATCH_STATE.DELIVER_PREPARATION 
          || deliveryState == DISPATCH_STATE.DELIVER_PROCESSING 
          || deliveryState == DISPATCH_STATE.DELIVER_FINISHED)) && (
          <Button type="primary" onClick={() => setCurrent(2)}>
            Proceed To Delivery Planning
          </Button>)
        }
        {(current === 0 && (deliveryState === DISPATCH_STATE.PICKUP_PREPARATION 
          || deliveryState === DISPATCH_STATE.PICKUP_INITIALIZATION
          || deliveryState === DISPATCH_STATE.PICKUP_PROCESSING)) && (
          <Button type="primary" onClick={() => setCurrent(1)}>
            Proceed To Pick-Up Planning
          </Button>)
        }
        
      </div>
    </>
  );
};

export default DeliveryPlanSelectionController;