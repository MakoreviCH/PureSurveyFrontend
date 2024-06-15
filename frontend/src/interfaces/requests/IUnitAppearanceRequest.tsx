export interface IUnitAppearanceRequest {
  name: string,
  templateId: number,
  type:string,
  params: {[key: string]: string}
}

export interface IAppearanceEditRequest {
  id:number,
  name: string,
  templateId: number,
  type:string,
  params: {[key: string]: string}
}
