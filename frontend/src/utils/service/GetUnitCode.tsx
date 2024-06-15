import { getUsersLocale } from "../../functions/getUserLocale";

const BASE_URL = "*CHANGE API URL*";

export const getUnitCode = async (unitId:number) => {
    const response = await fetch(`${BASE_URL}/${unitId}`, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            'Accept-Language': getUsersLocale()
        }
    });

    const responseJson = await response.json()
    return responseJson;
}