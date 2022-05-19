export class FieldDto {
    [key: string]: string
}
export type TCheckFieldsDto = {
    <T>(notify: FieldDto, fields: T): FieldDto
}
