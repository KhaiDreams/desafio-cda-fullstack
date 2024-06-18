import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { Response as ExpressResponse } from 'express';
import { regexEmail, regexPassword } from 'src/utils/regex/regex.util';
import { prisma } from 'src/services/database/database.service';
import { genSalt, hash } from 'bcrypt';
import { Prisma } from '@prisma/client';
import { sign } from 'jsonwebtoken';

@Controller('/register')
export class RegisterController {
  private secret = process.env.SECRET as string;

  @Post()
  async Register(
    @Res() res: ExpressResponse,
    @Body() body: any,
  ): Promise<void> {
    const { username, email, password } = body;
    try {
      if (!regexPassword.test(password) || !regexEmail.test(email)) {
        throw new Error('O nome de usuário ou email tem um formato inválido!');
      }

      const salt = await genSalt(12);
      const passwordHash = await hash(password, salt);

      const user = await prisma.user.create({
        data: { username, email, password: passwordHash },
      });

      const token = sign(
        {
          id: user.id,
          username: user.username,
          email: user.email,
          avatar: user.avatar,
          points: 0,
          emblems: [],
        },
        this.secret,
        { expiresIn: '24h' },
      );

      res
        .status(HttpStatus.CREATED)
        .cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
          maxAge: 24 * 60 * 60 * 1000,
        })
        .json({ token });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        const metaTarget = error.meta?.target;

        if (metaTarget === 'User_email_key') {
          throw new HttpException(
            'Este email já está sendo usado.',
            HttpStatus.BAD_REQUEST,
          );
        }
        if (metaTarget === 'User_username_key') {
          throw new HttpException(
            'Este nome de usuário já está sendo usado.',
            HttpStatus.BAD_REQUEST,
          );
        }
      }

      throw new HttpException(
        'Ocorreu um erro interno.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
