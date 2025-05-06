import {ClimatiqRequest} from "@/enitities/ClimatiqRequest";
import {fetch} from "expo/fetch";
import {FetchResponse} from "expo/build/winter/fetch/FetchResponse";

export class ClimatiqApiService {


    private climatiqurl = 'https://api.climatiq.io/data/v1/estimate';
    private headers: HeadersInit = {
        Accept: "*/*",
        'Content-Type': 'application/json',
        Authorization: 'Bearer DFFPCP7RZD67H6B68BB51278D0'
    };

    public getCo2Consommation(activity: ClimatiqRequest): Promise<FetchResponse> {
        let bodyRequest = JSON.stringify({
            "emission_factor": {
                "activity_id": activity.emissionFactor.activityId,
                "data_version": activity.emissionFactor.dataVersion,
            },
            "parameters": activity.activityParameters
        })
        return fetch('https://api.climatiq.io/data/v1/estimate',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': 'Bearer DFFPCP7RZD67H6B68BB51278D0'
                    },
                    body: bodyRequest
                },
            );
    }
}