import { tokensStub } from 'src/token/test/__stubs'

export const inputAuthStub = (key?: 'phone' | 'email' | 'googleId' | 'facebookId') => {
    const input = {
        phone: '+380970005555',
        email: 'dl.email@mail.com',
        googleId: '12345678910123456789',
        facebookId: '1234567890',
    }
    return key
        ? {
              login: {
                  [key]: input[key],
                  password: 'dl.password',
              },
          }
        : {
              refreshToken: {
                  refreshToken: tokensStub().refreshToken,
              },
          }
}
