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
    return {}
}