"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var UsersService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const axios_1 = require("axios");
let UsersService = UsersService_1 = class UsersService {
    constructor(UserModel, AvatarModel) {
        this.UserModel = UserModel;
        this.AvatarModel = AvatarModel;
        this.logger = new common_1.Logger(UsersService_1.name);
    }
    validId(id, createduserdto) {
        if (id == undefined) {
            id = 0;
        }
        else {
            id = createduserdto.id;
        }
        return id;
    }
    async CreateUser(createduserdto) {
        const idUser = this.validId(createduserdto.id, createduserdto);
        this.logger.log(`${idUser}`);
        const usersuccess = await this.UserModel.findOne({ idUser }).exec();
        if (!usersuccess) {
            this.created(idUser, createduserdto);
        }
        else {
            throw new common_1.NotFoundException('This user is already registered!');
        }
    }
    async SearchUsers() {
        return await this.UserModel.find().exec();
    }
    async SearchUsersById(id) {
        const usersuccess = await this.UserModel.findOne({ id }).exec();
        if (!usersuccess) {
            throw new common_1.NotFoundException(`User with id ${id} not found`);
        }
        return usersuccess;
    }
    async SearchAvatarByIdUser(userId) {
        const usersuccess = await this.AvatarModel.findOne({ userId }).exec();
        if (!usersuccess) {
            throw new common_1.NotFoundException(`User with id ${userId} not found in Avatar`);
        }
        return usersuccess.base64;
    }
    async deleteUser(id) {
        return await this.UserModel.findOneAndRemove({ id }).exec();
    }
    async deleteAvatar(userId) {
        return await this.AvatarModel.findOneAndRemove({ userId }).exec();
    }
    async created(id, createduserdto) {
        const ListUsers = await axios_1.default.get(`https://reqres.in/api/users`);
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
        }
        else {
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
};
UsersService = UsersService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('User')),
    __param(1, (0, mongoose_2.InjectModel)('Avatar')),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map