import { IsNotEmpty, IsString, MaxLength, IsEmail, MinLength } from 'class-validator'
import { ApiModelProperty } from '@nestjs/swagger';

export class AccountDto {
  @ApiModelProperty()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(50)
  readonly email: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @MinLength(8)
  readonly password: string;
}

export class CreateUserDto extends AccountDto {
  @ApiModelProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  readonly name: string;
}
