export interface IStatsResponse {
    statsForQuestion: {
      questionId: number;
      views: number;
      answered: number;
    };
    statsForOption: {
      questionId: number;
      optionId: number;
      answered: number;
    }[];
    statsForGender: {
      questionId: number;
      optionId: number;
      gender: string;
      answered: number;
    }[];
    statsForGeo: {
      questionId: number;
      optionId: number;
      geo: string;
      answered: number;
    }[];
    statsForLang: {
      questionId: number;
      optionId: number;
      lang: string;
      answered: number;
    }[];
}