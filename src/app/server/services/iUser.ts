import { User } from "../entity/user.entity";

export interface IUser {
  id: string;
  name: string;
  username: string;
  imageURL?: string;
}

export default interface IUserRepository {
  findByUserId(userId: string): Promise<User>;
  createUser(user: IUser): Promise<User>;
}
