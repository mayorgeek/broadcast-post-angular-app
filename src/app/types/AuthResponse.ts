import {User} from "./User";

export interface AuthResponse {
  data: Data;
  status: string;
  token: string;
}

interface Data {
  user: User;
}
