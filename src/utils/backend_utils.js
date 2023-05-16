/**
 * Copyright (c) 2023
 *
 * @summary Backend Server APIs
 * @author Huanjie Dong, Zilin Li
 * @date 2023-05-16
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
    const authToken = localStorage.getItem("token");
    const uploadDeliveryUrl = "api/v1/deliveries";
    return fetch(uploadDeliveryUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credential),
    }).then((response) => {
      if (response.status !== 406) {
        throw Error("Fail to upload delivery plan data");
      }
    });
}; 

export const getDelivery = () => {

  // TODO: Huanjie
  
}; 