import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    readonly username: string;

    @IsString()
    @IsNotEmpty()
    readonly accountPassword: string;

    @IsString()
    @IsNotEmpty()
    readonly privateKey: string;

    @IsString()
    @IsNotEmpty()
    readonly publicKey: string;
}