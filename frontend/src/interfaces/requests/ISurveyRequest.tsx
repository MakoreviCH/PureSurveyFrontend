export interface ISurveyRequest {
  name: string,
  dateBy: string,
  targetingId:number,
  questions: IQuestion[]
}

export interface IQuestion {
    id: number,
    type: string,
    orderNumber: number,
    questionLine: IQuestionLine,
    questionOptions: IQuestionOptions[]
}

export interface ITranslationLine {
    languageCode: string,
    translationText: string
}

export interface IQuestionLine {
    id: number,
    translations: ITranslationLine[]
}
export interface IQuestionOptions {
    id: number,
    orderNumber: number,
    translations: ITranslationLine[]
}

