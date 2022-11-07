import {User} from "./User";

export interface Post {
  id: string;
  title: string;
  description: string;
  postImg: string;
  createdAt: string;
  updatedAt: string;
  user: User;
}
