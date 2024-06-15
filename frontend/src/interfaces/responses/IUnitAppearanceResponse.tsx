export interface IUnitAppearanceResponse {
  id: number,
  name: string,
  templateId: number,
  templateName: string,
  type:string,
  params: {}
}

export interface ParamObject {
  [key: string]: string;
}
export interface Param {
  name: string;
  value: string;
}

