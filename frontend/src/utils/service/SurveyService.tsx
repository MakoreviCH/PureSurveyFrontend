import {ISurveyRequest} from "../../interfaces/requests/ISurveyRequest";
import {getUsersLocale} from "../../functions/getUserLocale";
import {getLocaleToken} from "../../functions/getLocaleToken";
import { BASE_URL } from "../baseurl";


export const addSurvey = async (data:ISurveyRequest) => {
    const response = await fetch(`${BASE_URL}/Survey/Survey`, {
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

export const getSurveyById = async (id:string) => {
    const response = await fetch(`${BASE_URL}/Survey/Survey/${id}`, {
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

export const getSurveys = async () => {
    const response = await fetch(`${BASE_URL}/Survey/SurveysByUser`, {
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


export const getQuestionStats = async (id:number) => {
    const response = await fetch(`https://325bed80-edbe-4ded-ac48-8ed5234f4f03.mock.pstmn.io/Stats/Stats/${id}`, {
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