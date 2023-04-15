import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { IUser } from '../utils/interfaces/user.interface';

@Injectable({ scope: Scope.REQUEST })
export class SessionService {
  constructor(@Inject(REQUEST) private request: Request) {}

  get user(): IUser | null {
    return this.request.user as IUser;
  }
}
