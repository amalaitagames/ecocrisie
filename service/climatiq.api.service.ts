import {InfoAndComRequestParams} from '@/enitities/InfoAndComRequestParams';
import {GoodAndServicesRequestParams} from '@/enitities/GoodAndServicesRequestParams';
import {WasteRequestParams} from '@/enitities/WasteRequestParams';
import {ClimatiqRequest} from "@/enitities/ClimatiqRequest";
import {ClimatiqResponse} from '@/enitities/ClimatiqResponse';
import {EnumActivityType} from "@/enitities/enums/EnumActivityType";

export class ClimatiqApiService {


    private climatiqurl = '';
    private headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    };

    public getCo2Consommation(activity: ClimatiqRequest): Promise<Response> {
        let climatiqResponse: ClimatiqResponse;
            const response = fetch(this.climatiqurl,
                {
                    method: 'POST',
                    headers: this.headers,
                    body: this.setBodyFromActivityType(activity)
                },
            );
            return response;
    }

    private setBodyFromActivityType(activity: ClimatiqRequest): string {
        if (activity == null) {
            return '';
        }
        let activityType = activity.activityParameters;
        let params = this.setBodyParamsFromActivityType(activity);
        return JSON.stringify({
            emission_factor: activity.emissionFactor,
            parameters: params
        });
    }

    private setBodyParamsFromActivityType(activity: ClimatiqRequest) {
        let activityParams = activity.activityParameters;
        let bodyParams;
        if (activityParams.activityType == EnumActivityType.GOOD) {
            let goodParams = activityParams as GoodAndServicesRequestParams;
            bodyParams = JSON.stringify({
                money: goodParams.money,
                money_unit: goodParams.moneyUnit,
            });
        }
        if (activityParams.activityType == EnumActivityType.INFO) {
            let infoParams = activityParams as InfoAndComRequestParams;
            bodyParams = JSON.stringify({
                data: infoParams.data,
                data_unit: infoParams.dataUnit,
                time: infoParams.time,
                time_unit: infoParams.timeUnit
            })
        }
        if (activityParams.activityType == EnumActivityType.WASTE) {
            let wasteParams = activityParams as WasteRequestParams;
            bodyParams = JSON.stringify({
                weight: wasteParams.weight,
                weight_unit: wasteParams.weightUnit,
            })
        }
        return bodyParams;
    }
}