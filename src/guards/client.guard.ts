import {
    Injectable,
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus
} from "@nestjs/common";

@Injectable()
export class ClientGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        if(request.headers.authorization) {
            return true;
        }
        throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
    }
}