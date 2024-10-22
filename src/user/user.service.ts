import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.model';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>
    ) { }

    async createUser(user: User): Promise<User> {
        return new this.userModel({
            email: user.email,
            password: user.password
        }).save();
    }

    async getUsers(): Promise<User[]> {
        return await this.userModel.find().exec();
    }

    async getUserById(id: string): Promise<User> {
        return await this.userModel.findById(id);
    }

    async updateUser(id: string, user: User): Promise<any> {
        return this.userModel.findByIdAndUpdate(id, user);
    }

    async deleteUser(id: string): Promise<any> {
        return this.userModel.findByIdAndDelete(id);
    }

}
