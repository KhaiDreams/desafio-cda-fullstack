import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { VerifyErrors, verify } from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const secret = process.env.SECRET as string;
    const token = req.cookies.token;

    if (token) {
      verify(token, secret, (err: VerifyErrors | null, decoded: any) => {
        if (err) {
          res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 0,
          });
          next();
        }
      });

      return res.status(400).json({ message: 'O usuário já está logado.' });
    }

    next();
  }
}
