import getUserLocale from "get-user-locale";
import {LocalStorageHelper} from "./localStorageHelper";

const userLocale = getUserLocale();

export const getUsersLocale = () => {
    return LocalStorageHelper.getItem('language_pure_survey') || userLocale;
}