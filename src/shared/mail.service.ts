import { Component } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { register } from './template/register';
import { password } from './template/password';

@Component()
export class MailService {
  transporter: any;

  constructor() {
    this.transporter = nodemailer.createTransport({
      pool: true,
      host: 'smtp.163.com',
      port: 465,
      secure: true,
      auth: {
        user: mailAccount,
        pass: mailPassword,
      },
    });
  }

  registerMail({ to, link }) {
    const message = {
      from: '"notify"<a309584795@163.com>',
      to,
      subject: 'Welcome to join us!',
      html: register(link),
    };

    this.transporter.sendMail(message, (error, info) => {
      if (error) {
        console.log('Error occurred');
        console.log(error.message);
        return;
      }
      console.log(`Message sent successfully! to: ${to}`);
    });

  }

  passwordMail({ to, link}) {
    const message = {
      from: '"notify"<a309584795@163.com>',
      to,
      subject: 'hanbao reset password mail!',
      html: password(link),
    };

    this.transporter.sendMail(message, (error, info) => {
      if (error) {
        console.log('Error occurred');
        console.log(error.message);
        return;
      }
      console.log(`Message sent successfully! to: ${to}`);
    });

  }

}