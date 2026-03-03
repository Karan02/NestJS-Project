import {
    UseInterceptors,
    NestInterceptor,
    ExecutionContext,
    CallHandler
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs'
import { plainToClass } from 'class-transformer'
import { UserDto } from 'src/users/dtos/user.dto'

// this interface means any class
interface ClassConstructor {
    new (...args:any[]):{}
}

export function Serialize(dto:ClassConstructor){
    return UseInterceptors(new SerializerInterceptor(dto));
}

export class SerializerInterceptor implements NestInterceptor {
    constructor(private dto:any) {}

    intercept(context: ExecutionContext, handler: CallHandler<any>): Observable<any> | Promise<Observable<any>> {

        // Run something before a request is handled
        // by the request handler
        // console.log('I m running before the handler',context);


        return handler.handle().pipe(
            map((data:any) =>{
                // Run something before the response is sent out
                // console.log("Im running before response is sent out",data);
                return plainToClass(this.dto,data, {
                    excludeExtraneousValues: true
                });
            }),
        );
    }

}