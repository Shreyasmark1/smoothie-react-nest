import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Register } from 'src/auth/dto/register.dto';

@Injectable()
export class RepositoryService {

    constructor(@InjectModel(User.name) private userModal: Model<User>) { }

    async createNewUser(user: Register): Promise<UserDocument> {

        const createdUser = new this.userModal(user);

        const newUser = createdUser.save()

        return newUser
    }

    async findUserByEmail(email: string): Promise<UserDocument> {

        // return new Promise((resolve, reject) => {
        //     this.userModal.findOne({
        //         "email": email
        //     }).lean().exec()
        // })

        const user = await this.userModal.findOne({
            "email": email
        }).exec()
        
        return user;
    }
}
