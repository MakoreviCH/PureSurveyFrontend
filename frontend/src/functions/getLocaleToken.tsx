import {LocalStorageHelper} from "./localStorageHelper";
import {ACCESS_TOKEN_LOCAL_STORAGE_KEY} from "../utils/constants";

export const getLocaleToken = () => {
    return LocalStorageHelper.getItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY) as string;
}

export const logout =()=>{
    LocalStorageHelper.setItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY,'');
}