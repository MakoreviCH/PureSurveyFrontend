export interface ISubscriptionModel{
    id: string
    status: string,
    status_update_time: string,
    links:ISubscriptionLink[]
}
    
export interface ISubscriptionLink{
    href: string,
    rel: string,
    }