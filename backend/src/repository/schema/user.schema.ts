import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose"
import { HydratedDocument } from "mongoose";
const bcrypt = require('bcrypt')

export type UserDocument = HydratedDocument<User>;

@Schema({
    timestamps: true
})
export class User {

    @Prop({
        required: true
    })

    name: String

    @Prop({
        unique: true,
        lowercase: true,
    })
    email: String

    @Prop({
        required: true,
        minlength: [6, 'Minimum password length is 6 characters'],
    })
    password: String

    @Prop({
        default: 1
    })
    userType: Number
}

export const UserSchema = SchemaFactory.createForClass(User)

UserSchema.pre("save", async function (next) {
    const user = this
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(user.password, salt)
    user.password = hashPassword
    next()
});

