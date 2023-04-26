import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatedUsersDto } from './dto/createdusers.dto';
import { UsersService } from './users.service';
import { User } from './interfaces/users.interface';

import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Controller('api/users')
export class UsersController {
  private clientAdminBackend: ClientProxy;

  private logger = new Logger(UsersController.name);

  constructor(private readonly userservice: UsersService) {
    this.clientAdminBackend = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://guest:guest@localhost:5672/usersproject'],
        queue: 'user-backend',
      },
    });
  }

  @Post()
  @UsePipes(ValidationPipe)
  async CreateUsers(@Body() createdusersdto: CreatedUsersDto) {
    await this.userservice.CreateUser(createdusersdto);
    this.clientAdminBackend.emit('CreateUser', 'User created');
  }

  @Get()
  async SearchUser(): Promise<User[]> {
    const usersreturn = await this.userservice.SearchUsers();
    this.clientAdminBackend.emit('SearchAllUsers', usersreturn);
    return usersreturn;
  }

  @Get(':id')
  async SearchUserById(@Param('id') id: string): Promise<User> {
    const userreturn = await this.userservice.SearchUsersById(id);
    this.clientAdminBackend.emit('SearchUsersById', userreturn);
    return userreturn;
  }

  @Get(':id/avatar')
  async SearchAvatarByIdUser(@Param('id') id: string): Promise<string> {
    const avatarretunr = await this.userservice.SearchAvatarByIdUser(id);
    this.clientAdminBackend.emit('SearchAvatarByIdUser', avatarretunr);
    return avatarretunr;
  }

  @Delete(':id/user')
  async deleteUser(@Param('id') id: string): Promise<void> {
    this.userservice.deleteUser(id);
    this.clientAdminBackend.emit('deleteUser', 'User deleted');
  }

  @Delete(':id/avatar')
  async deleteAvatar(@Param('id') id: string): Promise<void> {
    this.userservice.deleteAvatar(id);
    this.clientAdminBackend.emit('deleteAvatar', 'Avatar deleted');
  }
}
