import {ClimatiqRequestParameters} from "@/enitities/ClimatiqRequestParameters";
import {EmissionFactor} from "@/enitities/EmissionFactor";

export interface ClimatiqRequest {

    emissionFactor: EmissionFactor,
    parameters: ClimatiqRequestParameters

}