import { User } from "./../entity/user.entity";
import {
  Repository,
  getConnection,
  Connection,
  getManager,
  getRepository,
} from "typeorm";
import IUserRepository, { IUser } from "./iUser";

class UserRepository implements IUserRepository {
  private userRepository: Repository<User>;

  constructor() {
    // console.log("Manager ====", getManager("default"));
    this.userRepository = getConnection().getRepository(User);
  }

  public async findByUserId(userId: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { user_id: userId },
    });
  }

  public async createUser(user: IUser): Promise<User> {
    const newUser = new User();

    newUser.user_id = user.id;
    newUser.name = user.name;
    newUser.username = user.username;
    newUser.imageURL = user.imageURL;
    return await this.userRepository.save(newUser);
  }
}

export default UserRepository;
