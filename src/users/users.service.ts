import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatedUsersDto } from './dto/createdusers.dto';
import { User } from './interfaces/users.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';

import { Avatar } from 'src/avatar/interfaces/avatar.interface';

@Injectable()
export class UsersService {
  private logger = new Logger(UsersService.name);

  constructor(
    @InjectModel('User') private readonly UserModel: Model<User>,
    @InjectModel('Avatar') private readonly AvatarModel: Model<Avatar>,
  ) {}

  validId(id: number, createduserdto: CreatedUsersDto): number {
    if (id == undefined) {
      id = 0;
    } else {
      id = createduserdto.id;
    }

    return id;
  }

  async CreateUser(createduserdto: CreatedUsersDto): Promise<void> {
    const idUser = this.validId(createduserdto.id, createduserdto);
    this.logger.log(`${idUser}`);
    const usersuccess = await this.UserModel.findOne({ idUser }).exec();

    if (!usersuccess) {
      this.created(idUser, createduserdto);
    } else {
      throw new NotFoundException('This user is already registered!');
    }
  }

  async SearchUsers(): Promise<User[]> {
    return await this.UserModel.find().exec();
  }

  async SearchUsersById(id: string): Promise<User> {
    const usersuccess = await this.UserModel.findOne({ id }).exec();

    if (!usersuccess) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return usersuccess;
  }

  async SearchAvatarByIdUser(userId: string): Promise<string> {
    const usersuccess = await this.AvatarModel.findOne({ userId }).exec();

    if (!usersuccess) {
      throw new NotFoundException(`User with id ${userId} not found in Avatar`);
    }
    return usersuccess.base64;
  }

  async deleteUser(id: string): Promise<any> {
    return await this.UserModel.findOneAndRemove({ id }).exec();
  }

  async deleteAvatar(userId: string): Promise<any> {
    return await this.AvatarModel.findOneAndRemove({ userId }).exec();
  }

  private async created(
    id: number,
    createduserdto: CreatedUsersDto,
  ): Promise<User> {
    const ListUsers = await axios.get(`https://reqres.in/api/users`);
    let users = ListUsers.data.data;

    if (id == 0) {
      for (const user of users) {
        const newUser = new this.UserModel({
          id: user.id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          avatar: user.avatar,
        });
        await newUser.save();
        const newAvatar = new this.AvatarModel({
          userId: user.id,
          avatar: user.avatar,
          base64: new Buffer(user.avatar).toString('base64'),
        });
        await newAvatar.save();
      }
    } else {
      const UserCreated = new this.UserModel(createduserdto);
      await UserCreated.save();

      const newAvatar = new this.AvatarModel({
        userId: createduserdto.id,
        avatar: createduserdto.avatar,
        base64: new Buffer(createduserdto.avatar).toString('base64'),
      });
      await newAvatar.save();

      users = UserCreated;
    }

    return await users;
  }
}
