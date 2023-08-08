import { IsEmail, IsString, MinLength } from "class-validator"

export class Register {

    @MinLength(3)
    name: string

    @IsEmail()
    email: string

    @MinLength(6)
    @IsString({
        message: 'Password should be of type string',
    })
    password: string

}