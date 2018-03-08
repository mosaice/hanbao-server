import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsEmail,
  MinLength,
  IsOptional,
  IsUrl,
  IsIn,
  IsPositive,
} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class EmailDto {
  @ApiModelProperty()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(50)
  readonly email: string;
}

export class ResetPasswordDto {
  @ApiModelProperty({ description: '重置的密码' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @MinLength(8)
  readonly password: string;

  @ApiModelProperty({ description: '通过邮件获取到的key' })
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
  @ApiModelProperty({ description: '用户昵称，系统唯一' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  readonly name: string;
}

export class UserProfileDto {
  @ApiModelProperty({ required: false, description: '账号个人描述' })
  @IsString()
  @IsOptional()
  readonly description?: string;

  @ApiModelProperty({ required: false, description: '账号个人头像' })
  @IsUrl()
  @IsOptional()
  readonly avator?: string;

  @ApiModelProperty({ required: false, description: '用户性别， male/female/unknown' })
  @IsIn(['male', 'female', 'unknown'])
  @IsOptional()
  readonly sex?: string;
}

export class PasswordDto {
  @ApiModelProperty({ description: '原密码' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @MinLength(8)
  readonly oldPassword: string;

  @ApiModelProperty({ description: '新密码' })
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

export class RegisterValidationDto {
  @ApiModelProperty({ required: false })
  @IsOptional()
  @IsEmail()
  @MaxLength(50)
  readonly email?: string;

  @ApiModelProperty({ description: '用户昵称，系统唯一', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(30)
  readonly name?: string;

}
