interface ITargetingResponse {
  id: number,
  name: string,
  countryInTargetings: {}
}

export interface ISurveyResponse {
  id: number,
  name: string,
  dateBy: string,
  targeting: ITargetingResponse,
  questions: IQuestion[],
}

export interface IQuestion {
    id: number,
    type: string,
    orderNumber: number,
    questionLine: IQuestionLine,
    questionOptions: IQuestionOptions[]
}

export interface IOptionTranslationLine {
  language: string,
  optionLine: string
}
export interface IQuestionTranslationLine {
  language: string,
  questionTranslationLine: string
}

interface IQuestionLine {
    id: number,
    questionTranslations: IQuestionTranslationLine[]
}
interface IQuestionOptions {
    id: number,
    orderNumber: number,
    optionTranslations: IOptionTranslationLine[]
}

