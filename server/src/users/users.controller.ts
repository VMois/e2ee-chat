import { Controller, Post, Body, Res } from '@nestjs/common';
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
    login(@Body() loginUserDto: LoginUserDto, @Res() res) {
        //this.usersService.signup(createUserDto);
    }
}