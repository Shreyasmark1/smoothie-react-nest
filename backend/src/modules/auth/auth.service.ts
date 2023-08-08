import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { RepositoryService } from 'src/repository/repository.service';
import { Register } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Login } from './dto/login.dto';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {

    constructor(
        private readonly repository: RepositoryService,
        private readonly jwtService: JwtService,
        private readonly config: ConfigService
    ) { }

    async signUp(req: Register): Promise<any> {

        let newUser = await this.repository.createNewUser(req)

        delete newUser.password

        const { jwt, refreshToken } = await this.generateAccessToken({ userId: newUser._id, email: newUser.email, username: newUser.name })

        return { jwt, refreshToken, newUser }
    }

    async login(req: Login): Promise<any> {

        let user = await this.repository.findUserByEmail(req.email)

        if (!user) {
            throw new ForbiddenException(null, "Invalid credentials")
        }

        const result = await bcrypt.compare(req.password, user.password)

        if (!result) {

            throw new UnauthorizedException(null, "Invalid credentials")

        }

        delete user.password

        const { jwt, refreshToken } = await this.generateAccessToken({ userId: user._id, email: user.email, username: user.name })

        return { jwt, refreshToken, user }

    }

    private generateAccessToken(payload: any): any {

        const secret = this.config.get<string>('secret')

        const jwtToken: string = this.jwtService.sign({ payload }, { expiresIn: this.config.get<number>('tokenValidity'), secret: secret })
        const refreshToken: string = this.jwtService.sign({ payload }, { expiresIn: this.config.get<number>('refreshTokenValidity'), secret: secret })

        return {
            jwt: jwtToken,
            refreshToken: refreshToken
        }
    }
}
