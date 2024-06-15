import { getLocaleToken } from "../../functions/getLocaleToken";
import { getUsersLocale } from "../../functions/getUserLocale";
import { IUnitAppearanceRequest } from "../../interfaces/requests/IUnitAppearanceRequest";
import { BASE_URL } from "../baseurl";

export const addUnitAppearance = async (data:IUnitAppearanceRequest) => {
    const response = await fetch(`${BASE_URL}/UnitAppearance/UnitAppearance`, {
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

export const getAppearances = async () => {
    const response = await fetch(`${BASE_URL}/UnitAppearance/UnitAppearances`, {
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

export const editUnitAppearance = async (data:IUnitAppearanceRequest) => {
    const response = await fetch(`${BASE_URL}/UnitAppearance/UnitAppearance/`, {
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

export const getSystemTemplates = async () => {
    const response = await fetch(`${BASE_URL}/Template/Templates`, {
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
