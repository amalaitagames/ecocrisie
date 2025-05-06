import {ClimatiqRequestParameters} from "@/service/ClimatiqRequestParameters";
import {EmissionFactor} from "@/service/EmissionFactor";

export interface ClimatiqRequest {

    emissionFactor: EmissionFactor,
    parameters: ClimatiqRequestParameters

}