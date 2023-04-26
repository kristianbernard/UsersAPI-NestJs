import { CreatedUsersDto } from './dto/createdusers.dto';
import { UsersService } from './users.service';
import { User } from './interfaces/users.interface';
export declare class UsersController {
    private readonly userservice;
    private clientAdminBackend;
    private logger;
    constructor(userservice: UsersService);
    CreateUsers(createdusersdto: CreatedUsersDto): Promise<void>;
    SearchUser(): Promise<User[]>;
    SearchUserById(id: string): Promise<User>;
    SearchAvatarByIdUser(id: string): Promise<string>;
    deleteUser(id: string): Promise<void>;
    deleteAvatar(id: string): Promise<void>;
}
