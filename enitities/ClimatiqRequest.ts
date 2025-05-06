import {EmissionFactor} from "@/enitities/EmissionFactor";
import {InfoAndComRequestParams} from "@/enitities/InfoAndComRequestParams";
import {GoodAndServicesRequestParams} from "@/enitities/GoodAndServicesRequestParams";
import {WasteRequestParams} from "@/enitities/WasteRequestParams";

export interface ClimatiqRequest {

    emissionFactor: EmissionFactor,
    activityParameters: InfoAndComRequestParams | GoodAndServicesRequestParams | WasteRequestParams;

}