import * as bcrypt from 'bcrypt'

export const checkPassword = async (aPassword: string, cPassword: string): Promise<boolean> => {
    const statusCompare: boolean = await bcrypt.compare(aPassword, cPassword)
    return statusCompare
}
