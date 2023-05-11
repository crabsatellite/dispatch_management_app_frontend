/**
 * Copyright (c) 2023
 *
 * @summary Implementation of delivery planning page
 * @author Zilin Li
 * @date 2023-04-28  
 *  
 */

// Project imports
import DeliveryPlanning from "./delivery_planning/DeliveryPlanning";

const DeliveryPlanPage = ({authed, setNavigationKey}) => {

    return (
        <DeliveryPlanning authed={authed} setNavigationKey={setNavigationKey}/>
    );
};

export default DeliveryPlanPage;