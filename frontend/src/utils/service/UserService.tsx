import { getLocaleToken } from "../../functions/getLocaleToken";
import { getUsersLocale } from "../../functions/getUserLocale";
import { ISubscriptionRequest } from "../../interfaces/requests/ISubscriptionRequest";
import { BASE_URL } from "../baseurl";


export const getUser = async () => {
    const response = await fetch(`${BASE_URL}/User/User`, {
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

export const getSubscription = async (subscriptionId:string) => {
    const response = await fetch(`${BASE_URL}/Payment/subscription/${subscriptionId}`, {
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

export const createSubscription = async (subscription:ISubscriptionRequest) => {
    const response = await fetch(`${BASE_URL}/Payment/subscription`, {
        method: 'POST',
        headers:{
            'Authorization' : `Bearer ${getLocaleToken()}`,
            'Content-Type': 'application/json',
            'Accept-Language': getUsersLocale()
        },
        body:JSON.stringify(subscription)
    });

    const responseJson = await response.json()
    return responseJson;
}