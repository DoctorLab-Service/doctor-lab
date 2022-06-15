import { HttpException, HttpStatus } from '@nestjs/common'

export class ForbidenException extends HttpException {
    messages

    constructor(response) {
        super(response, HttpStatus.FORBIDDEN)
        this.messages = { ...response }
    }
}
