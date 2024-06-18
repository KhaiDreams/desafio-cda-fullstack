import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import {
  Response as ExpressResponse,
  Request as ExpressRequest,
} from 'express';
import { VerifyErrors, sign, verify } from 'jsonwebtoken';
import { prisma } from 'src/services/database/database.service';
import { MailerService } from 'src/services/mailer/mailer.controller';
import { RankingService } from 'src/services/ranking/ranking.service';
import { HtmlUserUpdate } from 'src/utils/html/update-user/html-update-user.utils';
import { regexEmail } from 'src/utils/regex/regex.util';

@Controller('/user')
export class UserController {
  private secret = process.env.SECRET as string;

  constructor(
    private readonly rankingService: RankingService,
    private readonly mailer: MailerService,
  ) {}

  @Get('/gift')
  async GiftUser(
    @Res() res: ExpressResponse,
    @Req() req: ExpressRequest,
  ): Promise<void> {
    const token = req.cookies.token as string;

    try {
      console.log('GiftUser: Verificando token');
      const decoded: any = verify(token, this.secret);
      delete decoded.exp;

      if (!decoded) {
        console.log('GiftUser: Token expirado');
        res.cookie('token', '', {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
          maxAge: 0,
        });
        throw new Error('Login expirado.');
      }

      console.log('GiftUser: Token válido, obtendo emblema');
      const emblem = await this.rankingService.getRandomEmblemToUser({
        id: decoded.id,
        emblems: decoded.emblems,
      });

      decoded.emblems.push(emblem);
      decoded.points += emblem.value;

      console.log('GiftUser: Emblema adicionado, atualizando token');
      const newToken = sign(decoded, this.secret, {
        expiresIn: '24h',
      });

      res
        .cookie('token', newToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
          maxAge: 24 * 60 * 60 * 1000,
        })
        .status(HttpStatus.OK)
        .json({ emblem });
    } catch (error) {
      console.log('GiftUser: Erro', error);

      throw new HttpException(
        error.message || 'Ocorreu um erro interno.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put('/update')
  async UpdateUser(@Res() res: ExpressResponse, @Req() req: ExpressRequest) {
    const code = req.cookies.code;
    const token = req.cookies.token;
    const data = req.body.data;

    try {
      console.log('UpdateUser: Verificando token');
      const decoded: any = verify(token, this.secret, (err: VerifyErrors | null, decoded: any) => {
        if (err) {
          res.cookie('token', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 0,
          });
          throw new Error('Login expirado.');
        }
        return decoded;
      });

      if (!code) {
        console.log('UpdateUser: Verificando formato de email');
        if (!regexEmail.test(data.email)) {
          return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Formato de email incorreto.' });
        }

        console.log('UpdateUser: Verificando email existente');
        const existingEmail = await prisma.user.findFirst({ where: { email: data.email } });
        if (existingEmail && existingEmail.email !== decoded.email) {
          return res.status(HttpStatus.CONFLICT).json({ message: 'Este email já está sendo usado.' });
        }

        console.log('UpdateUser: Verificando username existente');
        const existingUsername = await prisma.user.findFirst({ where: { username: data.username } });
        if (existingUsername && existingUsername.username !== decoded.username) {
          return res.status(HttpStatus.CONFLICT).json({ message: 'Este username já está sendo usado.' });
        }

        const value = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
        const html = new HtmlUserUpdate().generateHtml(value);
        await this.mailer.Send({ html, email: data.email });

        res.cookie(
          'code',
          {
            value,
            data: { ...data },
          },
          {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 24 * 60 * 60 * 1000,
          },
        );

        return res.status(HttpStatus.CREATED).json({ message: 'Código de verificação enviado.' });
      }

      const html = new HtmlUserUpdate().generateHtml(code.value);
      await this.mailer.Send({ html, email: code.data.email });

      return res.status(HttpStatus.CREATED).json({ message: 'Código de verificação reenviado.' });
    } catch (error) {
      console.error('UpdateUser: Erro ao atualizar usuário:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Erro no servidor.' });
    }
  }

  @Get('/update')
  async UpdatedUser(@Res() res: ExpressResponse, @Req() req: ExpressRequest) {
    const {
      data: { email, username, avatar, fullname },
    } = req.cookies.code;
    const code = req.query.code as string;
    const token = req.cookies.token as string;

    if (!code) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: 'É necessário um código.' });
    }

    try {
      console.log('UpdatedUser: Verificando token');
      const decoded: any = verify(token, this.secret);
      delete decoded.exp;

      if (!decoded) {
        res.cookie('token', '', {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
          maxAge: 0,
        });
        throw new Error('Login expirado.');
      }

      const updateData: Partial<{ email: string; username: string; fullname: string; avatar: string }> = {};
      if (email) updateData.email = email;
      if (username) updateData.username = username;
      if (fullname) updateData.fullname = fullname;
      if (avatar) updateData.avatar = avatar;

      console.log('UpdatedUser: Atualizando usuário no banco de dados');
      const user = await prisma.user.update({
        where: { id: decoded.id },
        data: updateData,
      });

      console.log('UpdatedUser: Atualização bem-sucedida:', user);
      const emblems = decoded.emblems || [];
      const points = emblems.reduce((acc, cur) => acc + cur.value, 0);

      const newDecoded = { ...decoded, ...user, emblems, points };

      const newToken = sign(newDecoded, this.secret, {
        expiresIn: '24h',
      });

      res.cookie('token', newToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 24 * 60 * 60 * 1000,
      });

      return res.status(HttpStatus.OK).json({
        email: user.email,
        username: user.username,
        avatar: user.avatar,
        fullname: user.fullname,
      });
    } catch (error) {
      console.error('UpdatedUser: Erro ao atualizar usuário:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Erro ao atualizar usuário.' });
    }
  }

  @Get('/update/cancel')
  async UpdateUserCancel(
    @Res() res: ExpressResponse,
    @Req() req: ExpressRequest,
  ) {
    res.cookie('code', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 0,
    });
    return res.status(HttpStatus.OK).json({ message: 'Atualização de usuário cancelada.' });
  }
}
