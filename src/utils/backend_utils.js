/**
 * Copyright (c) 2023
 *
 * @summary Backend Server APIs
 * @author Alex Lee, Zilin Li
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
    if (response.status !== 200) {
      throw Error("Fail to upload delivery plan data");
    }
  });
};

export const getDeliveries = (
  limit = 10,
  offset = 0,
  sort = "deliveryDate:desc"
) => {
  const authToken = localStorage.getItem("token");
  const getDeliveriesUrl = `api/v1/deliveries?limit=${limit}&offset=${offset}&sort=${sort}`;

  return fetch(getDeliveriesUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Fail to get delivery data");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
