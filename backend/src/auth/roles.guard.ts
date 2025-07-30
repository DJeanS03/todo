import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    const request = context
      .switchToHttp()
      .getRequest<{ user?: { role?: string | string[] } }>();
    const user = request.user;

    console.log('Required roles:', requiredRoles);
    console.log('User payload:', user);

    if (!requiredRoles) {
      return true;
    }

    const userRoles = user?.role;

    if (!userRoles) return false;

    if (Array.isArray(userRoles)) {
      return requiredRoles.some((role) => userRoles.includes(role));
    }

    return requiredRoles.includes(userRoles);
  }
}
