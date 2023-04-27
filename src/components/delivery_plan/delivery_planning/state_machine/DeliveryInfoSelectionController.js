import React, { useState } from 'react';
import { Button, Steps } from 'antd';
import { CodeSandboxOutlined, RocketOutlined, CarryOutOutlined, AimOutlined, DollarOutlined } from '@ant-design/icons';
import { DELIVERY_STATE, DELIVERY_START_LOCATION_KEY } from '../../../../utils/delivery_plan_utils';

import RoutePlanningStep from '../info_selection_ui/RoutePlanningStep';

/*
* Select robot/drone for dispatch
* Enter package information
* Provide planning tips
*/
const DeliveryPlanSelectionController = ({setDeliveryState, setDeliveryStartLocationKey}) => {

    const steps = [
        {
            title: 'Route Planning',
            content: <>
                        <Button onClick={() => {setDeliveryState(DELIVERY_STATE.CLEAR)}}>Clear Location</Button>,
                        <Button onClick={() => {setDeliveryStartLocationKey(DELIVERY_START_LOCATION_KEY.LOCATION_A)}}>Select Start Location A</Button>,
                        <Button onClick={() => {setDeliveryStartLocationKey(DELIVERY_START_LOCATION_KEY.LOCATION_B)}}>Select Start Location B</Button>,
                        <Button onClick={() => {setDeliveryStartLocationKey(DELIVERY_START_LOCATION_KEY.LOCATION_C)}}>Select Start Location C</Button>,
                    </>
            ,
            icon: <AimOutlined />,
        },
        {
          title: 'Package Information',
          content: <RoutePlanningStep />,
          icon: <CodeSandboxOutlined />,
        },
        {
            title: 'Delivery Review',
            content: 'Third-content',
            icon: <CarryOutOutlined />,
        },
        {
          title: 'Payment',
          content: `Placeholder`,
          icon: <DollarOutlined />,
      },
        {
            title: 'Dispatch',
            content: <Button type="primary" onClick={() => {setDeliveryState(DELIVERY_STATE.DISPATCHED)}}>Auto Dispatch</Button>,
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

  return (
    <>
      <Steps current={current} items={items} />
      <div style={contentStyle}>{steps[current].content}</div>
      <div style={{ marginTop: 24 }}>
        {current > 0 && current < steps.length - 1 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            Previous
          </Button>
        )}
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        
      </div>
    </>
  );
};

export default DeliveryPlanSelectionController;