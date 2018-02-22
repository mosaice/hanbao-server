import { IsNotEmpty, IsString, MaxLength, IsEmail, MinLength, IsUrl, IsIn, IsPositive } from 'class-validator'


export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(50)
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @MinLength(8)
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  readonly name: string;

}