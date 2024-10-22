import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.model';
import { Throttle, SkipThrottle } from '@nestjs/throttler';


@SkipThrottle()
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {

    }

    @Post()
    async createUser(@Body() user: User) {
        return await this.userService.createUser(user);
    }

    @Get()
    async getUsers() {
        return await this.userService.getUsers();
    }

    @Get(':userId')
    async getUserById(@Param('userId') userId: string) {
        return await this.userService.getUserById(userId)
    }

    @Put(':userId')
    async updateUser(@Param('userId') userId: string, @Body() user: User) {
        return await this.userService.updateUser(userId, user)
    }

    @Delete(':userId')
    async deleteUser(@Param('userId') userId: string) {
        return await this.userService.deleteUser(userId)
    }
}
