import { EmailSVG, PasswordSVG, PhoneSVG, SubjectSVG, UserSVG } from "assets/icons"
import { Input, Textarea } from "components/ui"
import { FC, useState } from "react"
import { InputStatus } from "types/core"
import { InputGroupProps } from "types/props"


const InputGroup: FC<InputGroupProps> = ({ pagename }) => {
    const [statusField, setStatusField] = useState<InputStatus>(undefined)

    const isLogin = pagename === 'login'
    const isRegister = pagename === 'register'
    const isForgot = pagename === 'forgot'
    const isSupport = pagename === 'support'
    const isVerification = pagename === 'verification'
    const isChangePassword = pagename === 'changePassword'
    
    // * FORMS FIELDS
    // * login = email,password
    // * register = fullname,email,phone,password,rePassword
    // * changePassword = password,rePassword
    // * forgot = email
    // * support = email,subject,message
    // * verification = code(phone)

    return (
        <div className='input-group'>
            {
                (isRegister || isLogin || isForgot || isSupport) && <Input
                id='email'
                type='email'
                status={statusField}
                image={<EmailSVG className='input-icon' />} // <PhoneSVG className='input-icon'/>
                placeholder={isLogin ? 'Phone or E-Mail' : 'E-Mail'} 
                />
            }
            
            {
              (isRegister || isSupport) &&  <Input
                    id={isSupport ? 'subject' : 'fullname'}
                    status={statusField}
                    image={isSupport ? <SubjectSVG className='input-icon' /> : <UserSVG className='input-icon' />  } 
                    placeholder={isSupport ? 'Subject' : 'Fullname'}
                />
            }

            {
                (isRegister || isVerification) && <Input
                    id={!isVerification ? 'phone' : 'code'}
                    type={!isVerification ? 'phone' : 'text'}
                    status={statusField}
                    image={<PhoneSVG className='input-icon' />} 
                    placeholder={!isVerification ? 'Phone' : 'Your code from sms'}
                />
            }
                    
            {
                (isLogin || isRegister || isChangePassword) && <Input
                    id='password'
                    type='password'
                    status={statusField}
                    autoComplete='off'
                    image={<PasswordSVG className='input-icon' />}
                    placeholder={!isChangePassword ? 'Password' : 'New password' }
                />
            }
            {

                (isRegister || isChangePassword) && <Input
                    id='rePassword'
                    type='password'
                    status={statusField}
                    autoComplete='off'
                    image={<PasswordSVG className='input-icon' />}
                    placeholder='Confirm Password' 
                />
            }
            {
                isSupport && <Textarea 
                    id="message"
                    status={statusField}
                    placeholder="Write your question."
                    value=''
                    onChange={(e) => console.log(e.target.value)}
                    />
            }

        </div>
    )
}

export default InputGroup
