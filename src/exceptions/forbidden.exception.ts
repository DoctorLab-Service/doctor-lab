import { HttpException, HttpStatus } from '@nestjs/common'

export class ForbiddenException extends HttpException {
    messages

    constructor(response) {
        super(response, HttpStatus.FORBIDDEN)
        this.messages = { ...response }
    }
}
