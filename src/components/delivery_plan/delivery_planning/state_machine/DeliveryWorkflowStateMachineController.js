import React, { useEffect, useState } from 'react';
import { Button, Steps } from 'antd';
import { CodeSandboxOutlined, RocketOutlined, AimOutlined } from '@ant-design/icons';
import { DELIVERY_STATE } from '../../../../utils/delivery_plan_utils';

import PackagePickupStep from '../workflow/PackagePickupStep';
import PackageInformationStep from '../workflow/PackageInformationStep';
import PackageDeliveryStep from '../workflow/PackageDeliveryStep';

const DeliveryWorkflowStateMachineController = (
  { focusPointAddress,
    currentStep,
    setCurrentStep,
    dispatcher, 
    setDispatcher, 
    deliveryState, 
    setDeliveryState, 
    deliveryStartLocationKey,
    setDeliveryStartLocationKey, 
    setTabKey}) => {

    const steps = [
      {
          title: 'Package Information',
          content: <PackageInformationStep 
                      deliveryState={deliveryState}
                    />,
          icon: <CodeSandboxOutlined />,
      },
      {
          title: 'Package Pick-up',
          content: <PackagePickupStep 
                      focusPointAddress={focusPointAddress} 
                      dispatcher={dispatcher} 
                      deliveryState={deliveryState} 
                      setDispatcher={setDispatcher} 
                      setDeliveryState={setDeliveryState} 
                      deliveryStartLocationKey={deliveryStartLocationKey}
                      setDeliveryStartLocationKey={setDeliveryStartLocationKey}
                    />,
          icon: <AimOutlined />,
      },
      {
          title: 'Package Delivery',
          content: <PackageDeliveryStep 
                      dispatcher={dispatcher} 
                      deliveryState={deliveryState} 
                      setDeliveryState={setDeliveryState} 
                      setTabKey={setTabKey}
                    />,
          icon: <RocketOutlined />,
      },
    ];

    const items = steps.map((item) => ({ key: item.title, title: item.title, icon: item.icon }));
    
    useEffect(() => {
      if (currentStep === 1 && deliveryState == DELIVERY_STATE.DELIVER_PREPARATION) {
        setCurrentStep(currentStep + 1);
      }
      if (currentStep === 2 && deliveryState == DELIVERY_STATE.RESET_ROUTE) {
        setCurrentStep(0);
      }

    }, [deliveryState]);

    return (
      <>
        <Steps current={currentStep} items={items} style={{marginLeft: 20}}/>
        <div style={{lineHeight: '700px', textAlign: 'center', marginTop: 16,}}>{steps[currentStep].content}</div>
        <div style={{ marginTop: 24 }}>
          {(currentStep === 1 || (currentStep === 2 && deliveryState == DELIVERY_STATE.DELIVER_PREPARATION)) && (
            <Button style={{marginLeft: 22}} type="primary" onClick={() => setCurrentStep(0)}>
              Back To Package Information
            </Button>
          )}
          {(currentStep === 0 && (deliveryState == DELIVERY_STATE.DELIVER_PREPARATION
            || deliveryState == DELIVERY_STATE.DELIVER_INITIALIZATION 
            || deliveryState == DELIVERY_STATE.DELIVER_PROCESSING 
            || deliveryState == DELIVERY_STATE.DELIVER_FINISHED)) && (
            <Button style={{marginLeft: 22}} type="primary" onClick={() => setCurrentStep(2)}>
              Proceed To Delivery Portal
            </Button>)
          }
          {(currentStep === 0 && (deliveryState === DELIVERY_STATE.PICKUP_PREPARATION 
            || deliveryState === DELIVERY_STATE.PICKUP_INITIALIZATION
            || deliveryState === DELIVERY_STATE.PICKUP_PROCESSING)) && (
            <Button style={{marginLeft: 22}} type="primary" onClick={() => setCurrentStep(1)}>
              Proceed To Pick-Up Portal
            </Button>)
          }
        </div>
      </>
    );
};

export default DeliveryWorkflowStateMachineController;