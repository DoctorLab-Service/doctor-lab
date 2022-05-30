import { NotifyDto } from 'src/notifies/dtos/notify.dto'

export const notifies: NotifyDto = {
    serviceName: 'users',
    language: 'KR',
    messages: {
        isExist: {
            phone: '이 전화번호를 가진 사용자가 이미 있습니다',
            email: '이 이메일 주소를 가진 사용자가 이미 있습니다',
        },
        isEmpty: {
            rePassword: '비밀번호를 반복해주세요',
        },
        isLength: {
            fullname: '전체 이름은 3자 이상이어야 합니다.',
            country: '국가는 64자 이하여야 합니다',
            state: '상태는 64자 이하여야 합니다',
            address: '주소는 64자 이하여야 합니다',
            email: '이메일은 3자 이상이어야 합니다',
            experience: '경험치는 3자 이상이어야 합니다',
            password: '비밀번호는 6자 이상이어야 합니다',
        },
        isValid: {
            phone: '유효하지 않은 전화 번호',
            email: '잘못된 이메일 주소',
            passwordEqual: '비밀번호가 일치하지 않습니다',
        },
        isNotFound: {
            user: '사용자를 찾을 수 없습니다',
            users: '아무것도 찾을 수 없음',
        },
        isNotCreate: {
            user: '계정을 만들 수 없습니다',
        },
    },
}
