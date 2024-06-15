import { getLocaleToken } from "../../functions/getLocaleToken";
import { getUsersLocale } from "../../functions/getUserLocale";
import { ITargetingRequest } from "../../interfaces/requests/ITargetingRequest";
import { BASE_URL } from "../baseurl";

export const addTargeting = async (data:ITargetingRequest) => {
    const response = await fetch(`${BASE_URL}/Targeting/Targeting/`, {
        method: 'POST',
        headers:{
            
            'Authorization' : `Bearer ${getLocaleToken()}`,
            'Content-Type': 'application/json',
            'Accept-Language': getUsersLocale()
            
        },
        body:JSON.stringify(data)
    });

    const responseJson = await response.json()
    return responseJson;
}

export const getTargetings = async () => {
    const response = await fetch(`${BASE_URL}/Targeting/Targetings`, {
        method: 'GET',
        headers:{
            
            'Authorization' : `Bearer ${getLocaleToken()}`,
            'Content-Type': 'application/json',
            'Accept-Language': getUsersLocale()
            
        }
    });

    const responseJson = await response.json()
    return responseJson;
}

export const getCountries = async () => {
    const response = await fetch(`${BASE_URL}/Targeting/Countries`, {
        method: 'GET',
        headers:{
            
            'Authorization' : `Bearer ${getLocaleToken()}`,
            'Content-Type': 'application/json',
            'Accept-Language': getUsersLocale()
            
        }
    });

    const responseJson = await response.json()
    return responseJson;
}

export const getTargetingById = async (id:number) => {
    const response = await fetch(`${BASE_URL}/Targeting/Targeting/${id}`, {
        method: 'GET',
        headers:{
            
            'Authorization' : `Bearer ${getLocaleToken()}`,
            'Content-Type': 'application/json',
            'Accept-Language': getUsersLocale()
            
        }
    });

    const responseJson = await response.json()
    return responseJson;
}
