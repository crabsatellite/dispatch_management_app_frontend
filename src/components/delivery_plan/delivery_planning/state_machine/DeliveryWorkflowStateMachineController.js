/**
 * Copyright (c) 2023
 *
 * @summary Implementation of state machine controller for delivery plan workflow steps
 * @author Zilin Li
 * @date 2023-04-28  
 *  
 */

// Project imports
import PackagePickupStep from '../workflow/PackagePickupStep';
import PackageDeliveryStep from '../workflow/PackageDeliveryStep';
import PackageInformationStep from '../workflow/PackageInformationStep';
import { DELIVERY_STATE } from '../../../../utils/delivery_plan_utils';

// Antd imports
import { Button, Steps } from 'antd';
import { CodeSandboxOutlined, RocketOutlined, AimOutlined } from '@ant-design/icons';

const DeliveryWorkflowStateMachineController = (
  { pickupSpeed,
    deliverySpeed,
    pickupAddress,
    deliveryAddress,
    currentStep,
    dispatcher, 
    deliveryState, 
    setDispatcher, 
    setCurrentStep,
    setDeliveryState, 
    deliveryStartLocationKey,
    setDeliveryStartLocationKey, 
    setTabKey,
    setPickupSpeed,
    setDeliverySpeed}) => {

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
                      dispatcher={dispatcher} 
                      pickupSpeed={pickupSpeed}
                      pickupAddress={pickupAddress} 
                      deliveryState={deliveryState} 
                      setDispatcher={setDispatcher} 
                      setPickupSpeed={setPickupSpeed}
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
                      deliverySpeed={deliverySpeed}
                      deliveryAddress={deliveryAddress}
                      setTabKey={setTabKey}
                      setDeliveryState={setDeliveryState} 
                      setDeliverySpeed={setDeliverySpeed}
                    />,
          icon: <RocketOutlined />,
      },
    ];

    const items = steps.map((item) => ({ key: item.title, title: item.title, icon: item.icon }));

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