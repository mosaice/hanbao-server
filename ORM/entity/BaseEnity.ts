import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { validate } from 'class-validator';
import { BadRequestException } from '@nestjs/common';

export abstract class BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    select: false,
  })
  createAt: Date;

  @UpdateDateColumn({
    select: false,
  })
  updateAt: Date;

  @BeforeInsert()
  async validateBeforeInsert() {
    const validateErrors = await validate(this, {
      validationError: { target: false },
    });
    if (validateErrors.length > 0) {
      throw new BadRequestException(validateErrors);
    }
  }

  @BeforeUpdate()
  async validateBeforeUpdate() {
    const validateErrors = await validate(this, {
      validationError: { target: false },
      skipMissingProperties: true,
    });
    if (validateErrors.length > 0) {
      throw new BadRequestException(validateErrors);
    }
  }

}
