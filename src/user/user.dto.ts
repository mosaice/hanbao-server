import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsEmail,
  MinLength,
  IsOptional,
  IsUrl,
  IsIn,
  IsPositive
} from 'class-validator'
import { ApiModelProperty } from '@nestjs/swagger';

export class EmailDto {
  @ApiModelProperty()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(50)
  readonly email: string;
}

export class ResetPasswordDto {
  @ApiModelProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @MinLength(8)
  readonly password: string;

  @ApiModelProperty()  
  @IsNotEmpty()
  @IsString()
  readonly userKey: string;
}

export class AccountDto extends EmailDto {
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

export class UserProfileDto {
  @ApiModelProperty()  
  @IsString()
  @IsOptional()
  readonly description?: string;

  @ApiModelProperty()  
  @IsUrl()
  @IsOptional()  
  readonly avator?: string;

  @ApiModelProperty()  
  @IsIn(['male', 'female', 'unknown'])
  @IsOptional()
  readonly sex?: string;
}

export class PasswordDto {
  @ApiModelProperty()  
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @MinLength(8)
  readonly oldPassword: string;

  @ApiModelProperty()  
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @MinLength(8) 
  readonly newPassword: string;
}

export class UserBaseInformation {

  @IsPositive()
  readonly id: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(50)
  readonly email: string;

}
