import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schema/user.schema';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User.name) private userModal: Model<User>){}

    async createUser(user:User): Promise<User>{

        const createdUser = new this.userModal(user);

        return createdUser.save();
        
    }

    async findAll(): Promise<User> {
        return this.userModal.findOne({email: 'admin3@admin.com'}).exec();
      }

}
