import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose"
import { IsEmail, MinLength } from "class-validator";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema({
    timestamps: true
})
export class User {

    @Prop({
        required: true
    })

    @MinLength(3)
    name: String

    @Prop({
        unique: true,
        lowercase: true,
    })
    @IsEmail()
    email: String

    @Prop({
        required: true,
        minlength: [6, 'Minimum password length is 6 characters'],
    })
    @MinLength(6)
    password: String
}

export const UserSchema = SchemaFactory.createForClass(User)

