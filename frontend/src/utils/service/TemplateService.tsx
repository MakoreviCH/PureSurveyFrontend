import { getLocaleToken } from "../../functions/getLocaleToken";
import { getUsersLocale } from "../../functions/getUserLocale";
import { BASE_URL } from "../baseurl";

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