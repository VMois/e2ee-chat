import { Injectable } from '@nestjs/common';
import { User } from './user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { createHash } from 'crypto';

@Injectable()
export class UsersService {
    private readonly users: User[] = [];
    private globalIndex: number = 1;

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
}