import {IValidationErrorResponse} from "../interfaces/responses/IValidationErrorResponse";
import {toast} from "react-toastify";
import {getValidationErrorMessages} from "./validationFuctions";
import {localizeApiErrors, localizeValidationError, LoginFormLocalizedStrings} from "./localizedStrings";
import {NavigateFunction} from "react-router";
import {IBaseResponse} from "../interfaces/responses/IBaseResponse";
import {ILoginResponse} from "../interfaces/responses/ILoginResponse";
import {takeRoleFromJwt} from "./jwtRetriever";
import {ACCESS_TOKEN_LOCAL_STORAGE_KEY} from "../utils/constants";
import {LocalStorageHelper} from "./localStorageHelper";
import {ApiErrorCodes} from "../enums/apiErrors";

export function handleUserLoginResponse(res: any, nav: NavigateFunction) {
    if (res instanceof Object && 'errors' in res && 'status' in res) {
        const errorResponse = res as IValidationErrorResponse;

        const errorMessages = getValidationErrorMessages(errorResponse);

        errorMessages.forEach((errorMessage) => {
            toast.error(localizeValidationError(errorMessage));
        });
    }
    else if(res as IBaseResponse<ILoginResponse>) {
        handleBaseResponse(res, nav);
    }
}

function handleBaseResponse(res: IBaseResponse<ILoginResponse>, nav: NavigateFunction) {
    if (res.error !== null) {
        toast.error(localizeApiErrors(res.error.message));
    }
    else {
        handleSuccessResponse(res.data.accessToken.token, nav);
    }
}



const handleSuccessResponse = (token: string, nav: NavigateFunction) => {
    console.log('token: ' + token);
    const role = takeRoleFromJwt(token);

    LocalStorageHelper.setItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY, token);

    if (role?.toString().toLowerCase() === "admin")
        nav("/admin-home")
    else if (role?.toString().toLowerCase() === "user")
        nav("/home")
}