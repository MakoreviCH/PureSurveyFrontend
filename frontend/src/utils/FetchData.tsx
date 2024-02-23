import {ILoginRequest} from "../interfaces/requests/ILoginRequest";
import {getUsersLocale} from "../functions/getUserLocale";

const BASE_URL = "http://localhost:5150/api";

export const login = async (loginData: ILoginRequest) => {
    const response = await fetch(`${BASE_URL}/Authentication/Login`, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            'Accept-Language': getUsersLocale()
        },
        body: JSON.stringify(loginData)
    });

    const responseJson = await response.json()
    return responseJson;
}