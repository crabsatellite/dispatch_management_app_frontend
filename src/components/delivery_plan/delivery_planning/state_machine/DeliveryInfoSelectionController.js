import React, { useEffect, useState } from 'react';
import { Button, Steps } from 'antd';
import { CodeSandboxOutlined, RocketOutlined, AimOutlined } from '@ant-design/icons';
import { DISPATCH_STATE } from '../../../../utils/delivery_plan_utils';

import PackagePickupStep from '../info_selection_ui/PackagePickupStep';
import PackageInformationStep from '../info_selection_ui/PackageInformationStep';
import PackageDelivery from '../info_selection_ui/PackageDelivery';


const DeliveryPlanSelectionController = ({dispatcher, setDispatcher, deliveryState, setDeliveryState, setDeliveryStartLocationKey}) => {

    const steps = [
        {
            title: 'Package Pick-up',
            content: <PackagePickupStep dispatcher={dispatcher} deliveryState={deliveryState} setDispatcher={setDispatcher} setDeliveryState={setDeliveryState} setDeliveryStartLocationKey={setDeliveryStartLocationKey}></PackagePickupStep>,
            icon: <AimOutlined />,
        },
        {
            title: 'Package Information',
            content: <PackageInformationStep />,
            icon: <CodeSandboxOutlined />,
        },
        {
            title: 'Package Delivery',
            content: <PackageDelivery dispatcher={dispatcher} deliveryState={deliveryState} setDeliveryState={setDeliveryState}></PackageDelivery>,
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
    if (current === 0 && deliveryState == DISPATCH_STATE.DELIVER_PREPARATION) {
      next();
    }

  }, [deliveryState]);

  return (
    <>
      <Steps current={current} items={items} />
      <div style={contentStyle}>{steps[current].content}</div>
      <div style={{ marginTop: 24 }}>
        {current === 2 && (
          <Button type="primary" onClick={() => prev()}>
            Back To Package Information
          </Button>
        )}
        {current === 1 && (
          <Button type="primary" onClick={() => next()}>
            Proceed To Delivery Planning
          </Button>
        )}
        
      </div>
    </>
  );
};

export default DeliveryPlanSelectionController;