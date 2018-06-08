import { Injectable } from '@nestjs/common';
import { User } from './user.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    private readonly users: User[] = [];
    private globalIndex: number = 1;

    signup(user: CreateUserDto) {
        const newUser: User = {
            ...user,
            id: this.globalIndex,
        };
        this.users.push(newUser);
        this.globalIndex++;
    }
}