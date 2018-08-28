import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { createHash } from 'crypto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class UsersService {
    private users: User[] = [];
    private globalIndex: number = 1;

    constructor(
        private readonly jwtService: JwtService,
    ) {}

    signup(user: CreateUserDto) {
        // for tutorial purpose, better use bcrypt :)
        const hash = createHash('sha512');
        hash.update(user.accountPassword);
        const newUser: User = {
            username: user.username,
            accountPassword: hash.digest('hex'),
            privateKey: user.privateKey,
            publicKey: user.publicKey,
            id: this.globalIndex,
        };
        this.users.push(newUser);
        this.globalIndex++;
    }

    login(credentials: LoginUserDto) {
        let userData: User;
        for (const user of this.users) {
            if (user.username === credentials.username) {
                userData = user;
                break;
            }
        }
        if (!userData) {
            return Promise.resolve();
        }
        const hash = createHash('sha512');
        hash.update(credentials.accountPassword);
        if (hash.digest('hex') !== userData.accountPassword) {
            return Promise.resolve();
        }
        const user: JwtPayload = { username: userData.username };
        return this.jwtService.sign(user);
    }
}