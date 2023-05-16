/**
 * Copyright (c) 2023
 *
 * @summary <description>
 * @author <author>
 * @date Year-Month-Day  
 *  
 */

export const login = (credential) => {
  const loginUrl = "api/v1/users/login";
  console.log(credential);
  return fetch(loginUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credential),
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to log in");
    }
    return response.json();
  });
};

export const register = (credential) => {
  const registerUrl = "api/v1/users/register";
  console.log(credential);
  return fetch(registerUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credential),
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to register");
    }
  });
};

export const uploadDelivery = (credential) => {

    console.log(credential);

//     POST /api/v1/deliveries
// {
//     "userId": 1,
//     "deliveryDate": "2023-04-29T12:00:00.000Z", ---> credential.deliveryDate 
//     "senderAddress": {
//         "name": "John Doe", ---> credential.senderName 
//         "street": "123 Main St, New York, NY, 10001, USA", ---> credential.pickupAddress 
//               },
//     "recipientAddress": {
//         "name": "Jane Smith", ---> credential.receiverName 
//         “email”: :”dummy@dummy.com”, ---> credential.receiverEmail 
//         “phone number:”123-456-7890”, ---> credential.receiverPhoneNumber 
//         "street": "456 Elm St, Los Angeles, CA, 90001, USA", ---> credential.receiverAddress 
//    },
//     "items": [
//         {
//             "name": "Item 1", ---> credential.content
//             "quantity": 2 ---> credential.weight 
//         }
//     ],
//      "status": "delivery_finished", ---> credential.deliveryState
// 	    “warehouseId”: “2”, ---> credential.warehouseId
//      “courierId”: “1”, ---> credential.courierId 
//      “pickupSpeed”: “priority” ---> credential.pickupSpeed
//      “deliverSpeed”: “first_class” ---> credential.deliverySpeed 
// 	    “courierLastPositionLat”: “40.74” --- > credential.courierLastPositionLat 
//     “courierLastPositionLng”: “70.59” ---> credential.courierLastPositionLng
// }

}; 

export const getDelivery = () => {
  
}; 