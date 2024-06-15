export interface ITargetingResponse {
  id: number,
  name: string,
  countries: {}
}

export interface ICountryResponse {
  id: string,
  name: string
}

export interface CountryCodeList {
  [countryCode: string]: string;
}
