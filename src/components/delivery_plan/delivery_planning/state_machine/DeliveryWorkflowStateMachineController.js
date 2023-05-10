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
import { DELIVERY_STATE, DISPATCHER_START_LOCATION_KEY, DISPATCHER_TYPE } from '../../../../utils/delivery_plan_utils';
import { showInfo, showSuccess } from '../../../../utils/dialog_utils';

// Antd imports
import { Button, Steps } from 'antd';
import { CodeSandboxOutlined, RocketOutlined, AimOutlined } from '@ant-design/icons';

// React imports
import { useEffect } from 'react';

const DeliveryWorkflowStateMachineController = (
  { authed,
    pickupSpeed,
    dispatchProgress,
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
    setDeliverySpeed,
    setDispatcherType}) => {

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
                      dispatchProgress={dispatchProgress}
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
                      dispatchProgress={dispatchProgress}
                      deliveryAddress={deliveryAddress}
                      setTabKey={setTabKey}
                      setDeliveryState={setDeliveryState} 
                      setDeliverySpeed={setDeliverySpeed}
                    />,
          icon: <RocketOutlined />,
      },
    ];

    const items = steps.map((item) => ({ key: item.title, title: item.title, icon: item.icon }));

    // Workflow state machine
    useEffect(() => {

      console.log("Package Delivery State: " + deliveryState);
      switch (deliveryState) {
  
        case DELIVERY_STATE.DELIVER_PREPARATION:
          if (currentStep === 1) {
            setCurrentStep(currentStep + 1);
            showInfo("Information", "The dispatcher has arrived the pick-up location, please review package information before handing over your package to dispatcher");
          }
          break;
  
        case DELIVERY_STATE.DELIVER_FINISHED:
          showSuccess("Confirmation", "The package is delivered successfully!");
          break;  
  
        case DELIVERY_STATE.RESET_ROUTE:
          if (currentStep === 2) {
            setCurrentStep(0);
          }
          setDeliveryStartLocationKey(DISPATCHER_START_LOCATION_KEY.LOCATION_A);
          setDispatcherType(DISPATCHER_TYPE.ROBOT);
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
          {(currentStep === 0 && (deliveryState === DELIVERY_STATE.IDLE
            || deliveryState === DELIVERY_STATE.PICKUP_PREPARATION 
            || deliveryState === DELIVERY_STATE.PICKUP_INITIALIZATION
            || deliveryState === DELIVERY_STATE.PICKUP_PROCESSING)) && (
            <Button 
              style={{marginLeft: 22}} 
              type="primary" 
              onClick={() => {
                if (!authed) {
                  showInfo("Information", "You need to login before proceeding further!");
                  return;
                }
                setCurrentStep(1)}
              }
            >
              Proceed To Pick-Up Portal
            </Button>)
          }
        </div>
      </>
    );
};

export default DeliveryWorkflowStateMachineController;