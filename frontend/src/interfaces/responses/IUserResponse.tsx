export interface IUserResponse {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    subscription: { subscriptionId: string } | null;
  }