import {IValidationErrorResponse} from "../interfaces/responses/IValidationErrorResponse";
import {toast} from "react-toastify";
import {getValidationErrorMessages} from "./validationFuctions";
import {localizeApiErrors, localizeValidationError, LoginFormLocalizedStrings} from "./localizedStrings";
import {NavigateFunction} from "react-router";
import {IBaseResponse} from "../interfaces/responses/IBaseResponse";
import {ILoginResponse} from "../interfaces/responses/ILoginResponse";
import {ITemplateResponse} from "../interfaces/responses/ITemplateResponse";
import {ICountryResponse, ITargetingResponse} from "../interfaces/responses/ITargetingResponse";
import {ISurveyUnitResponse} from "../interfaces/responses/ISurveyUnitResponse";
import {takeRoleFromJwt} from "./jwtRetriever";
import {ACCESS_TOKEN_LOCAL_STORAGE_KEY} from "../utils/constants";
import {LocalStorageHelper} from "./localStorageHelper";
import {ApiErrorCodes} from "../enums/apiErrors";
import { IUnitAppearanceResponse } from "../interfaces/responses/IUnitAppearanceResponse";
import { ISurveyResponse } from "../interfaces/responses/ISurveyResponse";
import { IStatsResponse } from "../interfaces/responses/IStatsResponse";

export function handleUserLoginResponse(res: any, nav: NavigateFunction) {
    if (res instanceof Object && 'errors' in res && 'status' in res) {
        const errorResponse = res as IValidationErrorResponse;

        const errorMessages = getValidationErrorMessages(errorResponse);

        errorMessages.forEach((errorMessage) => {
            toast.error(localizeValidationError(errorMessage));
        });
    }
    else if(res as IBaseResponse<ILoginResponse>) {
        handleLoginResponse(res, nav);
    }
}

function handleLoginResponse(res: IBaseResponse<ILoginResponse>, nav: NavigateFunction) {
    if (res.error !== null) {
        toast.error(localizeApiErrors(res.error.message));
    }
    else {
        handleSuccessLoginResponse(res.data.accessToken.token, nav);
    }
}





const handleSuccessLoginResponse = (token: string, nav: NavigateFunction) => {
    console.log('token: ' + token);
    const role = takeRoleFromJwt(token);

    LocalStorageHelper.setItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY, token);

    if (role?.toString().toLowerCase() === "admin")
        nav("/admin-home")
    else if (role?.toString().toLowerCase() === "user")
        nav("/survey")
}

export function handleGetUnitsResponse(res: any): ISurveyUnitResponse[] {
    if (res instanceof Object && 'errors' in res && 'status' in res) {
        const errorResponse = res as IValidationErrorResponse;

        const errorMessages = getValidationErrorMessages(errorResponse);

        errorMessages.forEach((errorMessage) => {
            toast.error(localizeValidationError(errorMessage));
        });
        return [];
    }
    else if(res as IBaseResponse<ISurveyUnitResponse[]>) {
        return handleBaseResponse(res);
    }
    return [];
}

export function handleGetUnitResponse(res: any): ISurveyUnitResponse| undefined {
    if (res instanceof Object && 'errors' in res && 'status' in res) {
        const errorResponse = res as IValidationErrorResponse;

        const errorMessages = getValidationErrorMessages(errorResponse);

        errorMessages.forEach((errorMessage) => {
            toast.error(localizeValidationError(errorMessage));
        });
        return undefined;
    }
    else if(res as IBaseResponse<ISurveyUnitResponse>) {
        return handleBaseResponse(res);
    }
    return undefined;
}

export function handleGetAppearancesResponse(res: any): IUnitAppearanceResponse[] {
    if (res instanceof Object && 'errors' in res && 'status' in res) {
        const errorResponse = res as IValidationErrorResponse;

        const errorMessages = getValidationErrorMessages(errorResponse);

        errorMessages.forEach((errorMessage) => {
            toast.error(localizeValidationError(errorMessage));
        });
        return [];
    }
    else if(res as IBaseResponse<IUnitAppearanceResponse[]>) {
        return handleBaseResponse(res);
    }
    return [];
}

export function handleGetCountriesResponse(res: any): ICountryResponse[] {
    if (res instanceof Object && 'errors' in res && 'status' in res) {
        const errorResponse = res as IValidationErrorResponse;

        const errorMessages = getValidationErrorMessages(errorResponse);

        errorMessages.forEach((errorMessage) => {
            toast.error(localizeValidationError(errorMessage));
        });
        return [];
    }
    else if(res as IBaseResponse<ICountryResponse[]>) {
        return handleBaseResponse(res);
    }
    return [];
}

export function handleGetTemplatesResponse(res: any): ITemplateResponse[] {
    if (res instanceof Object && 'errors' in res && 'status' in res) {
        const errorResponse = res as IValidationErrorResponse;

        const errorMessages = getValidationErrorMessages(errorResponse);

        errorMessages.forEach((errorMessage) => {
            toast.error(localizeValidationError(errorMessage));
        });
        return [];
    }
    else if(res as IBaseResponse<ITemplateResponse[]>) {
        return handleBaseResponse(res);
    }
    return [];
}

export function handleGetTargetingsResponse(res: any): ITargetingResponse[] {
    if (res instanceof Object && 'errors' in res && 'status' in res) {
        const errorResponse = res as IValidationErrorResponse;

        const errorMessages = getValidationErrorMessages(errorResponse);

        errorMessages.forEach((errorMessage) => {
            toast.error(localizeValidationError(errorMessage));
        });
        return [];
    }
    else if(res as IBaseResponse<ITargetingResponse[]>) {
        return handleBaseResponse(res);
    }
    return [];
}

export function handleGetTargetingResponse(res: any): ITargetingResponse | undefined {
    if (res instanceof Object && 'errors' in res && 'status' in res) {
        const errorResponse = res as IValidationErrorResponse;

        const errorMessages = getValidationErrorMessages(errorResponse);

        errorMessages.forEach((errorMessage) => {
            toast.error(localizeValidationError(errorMessage));
        });
        return undefined;
    }
    else if(res as IBaseResponse<ITargetingResponse>) {
        return handleBaseResponse(res);
    }
    return undefined;
}

export function handleGetSurveysResponse(res: any): ISurveyResponse[] {
    if (res instanceof Object && 'errors' in res && 'status' in res) {
        const errorResponse = res as IValidationErrorResponse;

        const errorMessages = getValidationErrorMessages(errorResponse);

        errorMessages.forEach((errorMessage) => {
            toast.error(localizeValidationError(errorMessage));
        });
        return [];
    }
    else if(res as IBaseResponse<ISurveyResponse[]>) {
        return handleBaseResponse(res);
    }
    return [];
}


export function handleGetSurveyResponse(res: any): ISurveyResponse | undefined {
    if (res instanceof Object && 'errors' in res && 'status' in res) {
        const errorResponse = res as IValidationErrorResponse;

        const errorMessages = getValidationErrorMessages(errorResponse);

        errorMessages.forEach((errorMessage) => {
            toast.error(localizeValidationError(errorMessage));
        });
        return undefined;
    }
    else if(res as IBaseResponse<ISurveyResponse>) {
        return handleBaseResponse(res);
    }
    return undefined;
}

export function handleGetStatsResponse(res: any): IStatsResponse | undefined {
    if (res instanceof Object && 'errors' in res && 'status' in res) {
        const errorResponse = res as IValidationErrorResponse;

        const errorMessages = getValidationErrorMessages(errorResponse);

        errorMessages.forEach((errorMessage) => {
            toast.error(localizeValidationError(errorMessage));
        });
        return undefined;
    }
    else if(res as IBaseResponse<IStatsResponse>) {
        return handleBaseResponse(res);
    }
    return undefined;
}

function handleBaseResponse(res: IBaseResponse<any>): any {
    console.log(res);
    if (res.error !== null) {
        toast.error(localizeApiErrors(res.error.message));
        console.log(res);
        return [];
    }
    else {
        return res.data;
    }
}

export function handleCreateResponse(res: any): any {
    if (res instanceof Object && 'errors' in res && 'status' in res) {
        const errorResponse = res as IValidationErrorResponse;

        const errorMessages = getValidationErrorMessages(errorResponse);

        errorMessages.forEach((errorMessage) => {
            toast.error(localizeValidationError(errorMessage));
        });
        return null;
    }
    else if(res as IBaseResponse<any>) {
        return res.data;
    }
    return [];
}