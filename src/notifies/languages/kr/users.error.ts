import { NotifyDto } from 'src/notifies/dtos/notify.dto'

export const notifies: NotifyDto = {
    serviceName: 'users',
    language: 'kr',
    messages: {
        exist: {
            phone: '이 전화번호를 가진 사용자가 이미 있습니다',
            email: '이 이메일 주소를 가진 사용자가 이미 있습니다',
        },
        field: {
            fullname: '당신의 이름을 입력',
            experience: '경력을 입력하세요',
            phone: '전화번호를 입력하세요',
            email: '당신의 이메일 주소를 입력 해주세요',
            password: '암호를 입력',
            rePassword: '비밀번호를 다시 입력하세요',
            passwordEqual: '비밀번호가 일치하지 않습니다',
        },
    },
}
