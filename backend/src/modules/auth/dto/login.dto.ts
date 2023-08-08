import { IsEmail, IsString, Matches, MinLength } from "class-validator"

export class Login {
    @IsEmail()
    email: string

    @MinLength(6)
    @Matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
        {
            message:
                'Password must contain at least one letter, one number, and one special character',
        },
    )
    @IsString({
        message: 'Password should be of type string'
    })
    password: string
}