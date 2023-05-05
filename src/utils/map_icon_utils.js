/**
 * Copyright (c) 2023
 *
 * @summary Common icons
 * @author Zilin Li
 * @date 2023-05-04  
 *  
 */

import L from "leaflet";

export const DEFAULT_ICON = L.icon({
    iconUrl: "/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
});

export const WAREHOUSE_ICON = L.icon({
    iconUrl: "/warehouse.png",
    iconSize: [45, 45],
});

export const PICKUP_ICON = L.icon({
    iconUrl: "/home.png",
    iconSize: [90, 90],
});

export const DELIVERY_ICON = L.icon({
    iconUrl: "/destination.png",
    iconSize: [90, 90],
});

export const ROBOT_ICON = L.icon({
    iconUrl: "/robot.png",
    iconSize: [90, 90],
});

export const DRONE_ICON = L.icon({
    iconUrl: "/drone.png",
    iconSize: [90, 90],
});