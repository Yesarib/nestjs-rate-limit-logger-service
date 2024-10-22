import { Body, Controller, Delete, Get, Param, Post, Put, Ip } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.model';
import { Throttle, SkipThrottle } from '@nestjs/throttler';
import { LoggerService } from 'src/logger/logger.service';

// @SkipThrottle()
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }
    private readonly logger = new LoggerService(UserController.name)

    @Post()
    async createUser(@Body() user: User) {
        return await this.userService.createUser(user);
    }

    @Get()
    async getUsers(@Ip() ip: string) {
        this.logger.specialLog(`Request for all users from: \t ${ip}`, UserController.name)
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
