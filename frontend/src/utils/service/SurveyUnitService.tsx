import { getLocaleToken } from "../../functions/getLocaleToken";
import { getUsersLocale } from "../../functions/getUserLocale";
import { ISurveyUnitEditRequest, ISurveyUnitRequest } from "../../interfaces/requests/ISurveyUnitRequest";
import { BASE_URL } from "../baseurl";

export const addSurveyUnit = async (data:ISurveyUnitRequest) => {
    const response = await fetch(`${BASE_URL}/SurveyUnit/SurveyUnit`, {
        method: 'POST',
        headers:{
            
            'Authorization' : `Bearer ${getLocaleToken()}`,
            'Content-Type': 'application/json',
            'Accept-Language': getUsersLocale()
            
        },
        body: JSON.stringify(data)
    });

    const responseJson = await response.json()
    return responseJson;
}

export const getSurveyUnits = async () => {
    const response = await fetch(`${BASE_URL}/SurveyUnit/SurveyUnit`, {
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

export const getSurveyUnit = async (id:number) => {
    const response = await fetch(`${BASE_URL}/SurveyUnit/SurveyUnit/${id}`, {
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


export const editSurveyUnit = async (data:ISurveyUnitEditRequest) => {
    const response = await fetch(`${BASE_URL}/SurveyUnit/SurveyUnit`, {
        method: 'PATCH',
        headers:{
            
            'Authorization' : `Bearer ${getLocaleToken()}`,
            'Content-Type': 'application/json',
            'Accept-Language': getUsersLocale()
            
        },
        body: JSON.stringify(data)
    });

    const responseJson = await response.json()
    return responseJson;
}