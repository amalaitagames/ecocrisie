import {InfoAndComRequestParams} from 'enitities/InfoAndComRequestParams';
import {GoodAndServicesRequestParams} from 'enitities/GoodAndServicesRequestParams';
import {WasteRequestParams} from 'enitities/WasteRequestParams';

let climatiqurl = '';
let headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
};


export function getCo2Consommation(activity) {
    fetch( climatiqurl,
        {
            method: 'POST',
            headers: headers,
        body: setBodyFromActivityType(activity)

    },
    )
}

function setBodyFromActivityType(activity) {
    let activityType = activity.activityParameters;
    if (activityType instanceof InfoAndComRequestParams) {

    }
    if (activityType instanceof GoodAndServicesRequestParams) {

    }
    if (activityType instanceof WasteRequestParams) {

    }
    return {}
}