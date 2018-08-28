import { Controller, Post, Body, BadRequestException, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('api/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('signup')
    signup(@Body() createUserDto: CreateUserDto) {
        this.usersService.signup(createUserDto);
    }

    @Post('login')
    @HttpCode(200)
    async login(@Body() loginUserDto: LoginUserDto) {
        const token = await this.usersService.login(loginUserDto);
        if (token) {
            return {
                token,
            };
        }
        throw new BadRequestException();
    }
}