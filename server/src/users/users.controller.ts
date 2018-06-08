import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('api/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('signup')
    signup(@Body() createUserDto: CreateUserDto) {
        this.usersService.signup(createUserDto);
    }
}