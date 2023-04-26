import { CreatedUsersDto } from './dto/createdusers.dto';
import { User } from './interfaces/users.interface';
import { Model } from 'mongoose';
import { Avatar } from 'src/avatar/interfaces/avatar.interface';
export declare class UsersService {
    private readonly UserModel;
    private readonly AvatarModel;
    private logger;
    constructor(UserModel: Model<User>, AvatarModel: Model<Avatar>);
    validId(id: number, createduserdto: CreatedUsersDto): number;
    CreateUser(createduserdto: CreatedUsersDto): Promise<void>;
    SearchUsers(): Promise<User[]>;
    SearchUsersById(id: string): Promise<User>;
    SearchAvatarByIdUser(userId: string): Promise<string>;
    deleteUser(id: string): Promise<any>;
    deleteAvatar(userId: string): Promise<any>;
    private created;
}
