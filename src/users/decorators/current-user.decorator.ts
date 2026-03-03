import {
    createParamDecorator,
    ExecutionContext
} from '@nestjs/common';

export const CurrentUser = createParamDecorator(
    (data: never, context: ExecutionContext) => { // Execution context works with http, grpc, websockets, graphql or any other protocol
    //never- will never used,accessed (So in decorator alerts for not providing any value )
    const request = context.switchToHttp().getRequest(); //context is a wrapper around request object

    return request.currentUser;
    }
)