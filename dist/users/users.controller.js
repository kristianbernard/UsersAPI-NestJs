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
var UsersController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const createdusers_dto_1 = require("./dto/createdusers.dto");
const users_service_1 = require("./users.service");
const microservices_1 = require("@nestjs/microservices");
let UsersController = UsersController_1 = class UsersController {
    constructor(userservice) {
        this.userservice = userservice;
        this.logger = new common_1.Logger(UsersController_1.name);
        this.clientAdminBackend = microservices_1.ClientProxyFactory.create({
            transport: microservices_1.Transport.RMQ,
            options: {
                urls: ['amqp://guest:guest@localhost:5672/usersproject'],
                queue: 'user-backend',
            },
        });
    }
    async CreateUsers(createdusersdto) {
        await this.userservice.CreateUser(createdusersdto);
        this.clientAdminBackend.emit('CreateUser', 'User created');
    }
    async SearchUser() {
        const usersreturn = await this.userservice.SearchUsers();
        this.clientAdminBackend.emit('SearchAllUsers', usersreturn);
        return usersreturn;
    }
    async SearchUserById(id) {
        const userreturn = await this.userservice.SearchUsersById(id);
        this.clientAdminBackend.emit('SearchUsersById', userreturn);
        return userreturn;
    }
    async SearchAvatarByIdUser(id) {
        const avatarretunr = await this.userservice.SearchAvatarByIdUser(id);
        this.clientAdminBackend.emit('SearchAvatarByIdUser', avatarretunr);
        return avatarretunr;
    }
    async deleteUser(id) {
        this.userservice.deleteUser(id);
        this.clientAdminBackend.emit('deleteUser', 'User deleted');
    }
    async deleteAvatar(id) {
        this.userservice.deleteAvatar(id);
        this.clientAdminBackend.emit('deleteAvatar', 'Avatar deleted');
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createdusers_dto_1.CreatedUsersDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "CreateUsers", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "SearchUser", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "SearchUserById", null);
__decorate([
    (0, common_1.Get)(':id/avatar'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "SearchAvatarByIdUser", null);
__decorate([
    (0, common_1.Delete)(':id/user'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Delete)(':id/avatar'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteAvatar", null);
UsersController = UsersController_1 = __decorate([
    (0, common_1.Controller)('api/users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map