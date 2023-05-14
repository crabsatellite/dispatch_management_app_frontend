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
import { DELIVERY_STATE, DISPATCHER_START_LOCATION_KEY, DISPATCHER_TYPE, DISPATCH_SPEED_TYPE, BACKEND_COURIER_ID, BACKEND_WAREHOUSE_ID} from '../../../../utils/delivery_plan_utils';
import { showInfo, showSuccess, showWarning } from '../../../../utils/dialog_utils';
import { uploadDelivery } from '../../../../utils/backend_utils';

// Antd imports
import { Button, Steps } from 'antd';
import { CodeSandboxOutlined, RocketOutlined, AimOutlined } from '@ant-design/icons';

// React imports
import { useEffect } from 'react';

const DeliveryWorkflowStateMachineController = (
  { routeCoordinates,
    pickupSpeed,
    dispatchProgress,
    deliverySpeed,
    pickupAddress,
    deliveryAddress,
    currentStep,
    dispatcher, 
    deliveryState, 
    packageInfoDrafted,
    packageInfo,
    setDispatcher, 
    setCurrentStep,
    setDeliveryState, 
    deliveryStartLocationKey,
    setDeliveryStartLocationKey, 
    setNavigationKey,
    setPickupSpeed,
    setDeliverySpeed,
    setDispatcherType,
    setDispatchProgress,
    setPackageInfoDrafted,
    setPackageInfo}) => {

    const simulateDispatcherProgress = (speed) => {
      let speedFactor = 1;
      switch (speed) {
        case DISPATCH_SPEED_TYPE.PRIORITY:
          speedFactor = 10;
          break;
        case DISPATCH_SPEED_TYPE.FIRST_CLASS:
          speedFactor = 50;
          break;
        case DISPATCH_SPEED_TYPE.NORMAL:
          speedFactor = 100;
          break;
      }
      routeCoordinates.forEach((c, i) => {
        setTimeout(() => {
          let dispatchSpeed = deliveryState === DELIVERY_STATE.PICKUP_PROCESSING ? pickupSpeed : deliverySpeed;
          switch (dispatchSpeed) {
            case DISPATCH_SPEED_TYPE.PRIORITY:
              setDispatchProgress(1200 * i / speedFactor / routeCoordinates.length);
              break;
            case DISPATCH_SPEED_TYPE.FIRST_CLASS:
              setDispatchProgress(5200 * i / speedFactor / routeCoordinates.length);
              break;
            case DISPATCH_SPEED_TYPE.NORMAL:
              setDispatchProgress(10500 * i / speedFactor / routeCoordinates.length);
              break;
          }
        }, speedFactor * i);
      });
    }

    const steps = [
      {
          title: 'Package Information',
          content: <PackageInformationStep 
                      packageInfo={packageInfo}
                      packageInfoDrafted={packageInfoDrafted}
                      setPackageInfoDrafted={setPackageInfoDrafted}
                      setPackageInfo={setPackageInfo}
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
                      packageInfo={packageInfo}
                      deliveryState={deliveryState} 
                      deliverySpeed={deliverySpeed}
                      dispatchProgress={dispatchProgress}
                      deliveryAddress={deliveryAddress}
                      setNavigationKey={setNavigationKey}
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

        case DELIVERY_STATE.PICKUP_PREPARATION:
          setDispatchProgress(0);
          break;
        case DELIVERY_STATE.PICKUP_INITIALIZATION:
          setDispatchProgress(0);
          break;
        case DELIVERY_STATE.DELIVER_INITIALIZATION:
          setDispatchProgress(0);
          break;

        case DELIVERY_STATE.DELIVER_PREPARATION:
          setDispatchProgress(0);
          if (currentStep === 1) {
            setCurrentStep(currentStep + 1);
          }
          showInfo("Information", "The dispatcher has arrived the pick-up location . ");  
          break;
  
        case DELIVERY_STATE.DELIVER_FINISHED:
          setDispatchProgress(0);
          showSuccess("Confirmation", "The package is delivered successfully ! ");

          let credential = {}
          
          // Sender
          credential.senderName = packageInfo.senderFirstName + " " + packageInfo.senderLastName;
          credential.pickupSpeed = pickupSpeed.toLowerCase();
          credential.pickupAddress = pickupAddress;
          credential.weight = packageInfo.weight;
          credential.content = packageInfo.content;
          
          // Receiver
          credential.receiverName = packageInfo.receiverFirstName + " " + packageInfo.receiverLastName;
          credential.deliverySpeed = deliverySpeed.toLowerCase();
          credential.receiverAddress = deliveryAddress;
          credential.receiverPhoneNumber = packageInfo.phoneNumber;
          credential.receiverEmail = packageInfo.email;
          
          // General
          credential.deliveryDate = new Date().toJSON();
          credential.courierLastPositionLat = "";
          credential.courierLastPositionLng = "";
          credential.deliveryState = deliveryState.toLowerCase();
          credential.warehouseId = BACKEND_WAREHOUSE_ID[deliveryStartLocationKey];
          credential.courierId = BACKEND_COURIER_ID[dispatcher];
          
          uploadDelivery(credential);
          break;  
  
        case DELIVERY_STATE.RESET_ROUTE:
          if (currentStep === 2) {
            setCurrentStep(0);
          }
          setDeliveryStartLocationKey(DISPATCHER_START_LOCATION_KEY.LOCATION_A);
          setDispatcherType(DISPATCHER_TYPE.ROBOT);
          break;
        
        case DELIVERY_STATE.PICKUP_PROCESSING:
          simulateDispatcherProgress(pickupSpeed);
          break;

        case DELIVERY_STATE.DELIVER_PROCESSING:
          simulateDispatcherProgress(deliverySpeed);
          break;
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
            <Button 
              style={{marginLeft: 22}} 
              type="primary" 
              onClick={() => {
                  if (!packageInfoDrafted) {
                    showWarning("Warning", "You need to save package information by clicking save button before proceeding further . ");
                    return;
                  }
                  setCurrentStep(2)}
                }
              >
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
                if (!packageInfoDrafted) {
                  showWarning("Warning", "You need to save package information by clicking save button before proceeding further . ");
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