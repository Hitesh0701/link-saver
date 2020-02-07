export class Store {
  userData: UserData;
}

export interface UserData {
  user_id: number;
  name: string;
  email: string;
}
