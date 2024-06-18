import {
  Response as ExpressResponse,
  Request as ExpressRequest,
} from 'express';
import { Controller, Get, Req, Res, HttpStatus } from '@nestjs/common';
import { prisma } from 'src/services/database/database.service';
import { VerifyErrors, verify } from 'jsonwebtoken';

@Controller('ranking')
export class RankingController {
  private secret = process.env.SECRET as string;

  @Get()
  async getRanking(@Res() res: ExpressResponse, @Req() req: ExpressRequest) {
    const token = req.cookies.token;
    try {
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

      const ranking = await prisma.user.findMany({
        orderBy: [{ points: 'desc' }],
        take: 13,
        select: {
          id: true,
          username: true,
          avatar: true,
          points: true,
        },
      });

      const haveUser = ranking.find((user) => user.id === decoded.id);
      if (!haveUser) {
        const user = await prisma.user.findUnique({
          where: { id: decoded.id },
          select: {
            id: true,
            username: true,
            avatar: true,
            points: true,
          },
        });

        ranking.push(user);
      }

      return res.status(HttpStatus.OK).json({ ranking });
    } catch (error: any) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message || 'Ocorreu um erro interno.' });
    }
  }
}
