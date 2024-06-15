export interface ISurveyUnitRequest {
    name: string,
    oneSurveyTakePerDevice: number,
    maximumSurveysPerDevice: number,
    hideAfterNoSurveys: boolean,
    messageAfterNoSurveys: boolean,
    appearanceId: number
  
}

export interface ISurveyUnitEditRequest {
    id:number,
    name: string,
    oneSurveyTakePerDevice: number,
    maximumSurveysPerDevice: number,
    hideAfterNoSurveys: boolean,
    messageAfterNoSurveys: boolean,
    appearanceId: number,
    surveyIds: number[]
}