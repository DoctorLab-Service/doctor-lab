import { RolesList, SocialProviders, Validate } from "types"
import {
    ButtonSize,
    FormType,
    statusimage,
    DefaultProps,
    ButtonVariant,
    InputAutoComplete,
} from "./core"

/* 
    MODULES
*/

export interface FormProps {
    darkMode?: boolean
    setIsChangePassword?: Dispatch<SetStateAction<boolean>>
}

export interface LogoProps {
    darkMode: boolean;
    circle?: boolean;
    className?: string;
}

export interface ActionsProps extends DefaultProps {
    className?: string
}

export interface BackgroundProps {
    darkMode: boolean
    type: FormType
}

export interface ContentProps {
    children: ReactNode
}

/*
    COMPONENTS
*/
export interface TitleProps { }
export interface FooterProps { }
export interface Page404Props { }
export interface FormFooterProps { }
export interface MergingTextProps { }
export interface NotificationsProps { }
export interface ToggleLanguageProps { }
export interface ToggleThemeProps extends DefaultProps { }

export interface LoaderProps {
    className?: string
}

export interface FormBodyHeaderProps {
    formState: Form
}

export interface FormBodyFooterProps {
    paths?: any
    isAdmin?: boolean
    emptyForm?: boolean
    mutations: MutationsRequest
    onClick?: (e: MouseEventHandler<HTMLButtonElement>, request?: any) => void
}
export interface FormBodyProps {
    setIsChangePassword?: Dispatch<SetStateAction<boolean>>
}

export interface FormHeaderProps {
    darkMode?: boolean
    roles?: RolesList[]
    changeRole?: (idx: number) => void

}

export interface SocialButtonProps {
    text?: string
    scope?: string
    icon?: boolean
    circle?: boolean
    className?: string
    children?: ReactNode
    redirect_uri?: string
    provider: SocialProviders
    onLoginStart?: () => void
    onLogoutSuccess?: () => void
}

export interface SocialProps {
    providers: SocialProviders[]
}

export interface RolesProps {
    roles: RolesList[]
    changeRole: (idx: number) => void

}
export interface RoleItemProps {
    value: string
    src: string
    changed: boolean
    circle?: boolean
    className?: string
    onClick: MouseEventHandler<HTMLDivElement>
}

export interface SupportLinkProps {
    path: string,
    text?: string,
    size?: ButtonSize,
    className?: string,
}

export interface LanguagesOptions {
    value: string
    checked: boolean
}


export interface FieldsProps {
    placeholders?: any
}

export interface InputGroupProps {}


export interface TextareaProps {
    args?: any
    id: string
    name?: string
    value?: string
    image?: ReactNode
    className?: string
    validate?: Validate
    placeholder?: string
    children?: ReactNode
    statusimage?: statusimage
    value?: string
    autoComplete?: InputAutoComplete
    onChange?: (e: InputEvent<HTMLInputElement>) => void
    onBlur?: (e: InputEvent<HTMLInputElement>) => void
    onFocus?: (e: InputEvent<HTMLInputElement>) => void
}


export interface InputProps {
    args?: any
    id: string
    name?: string
    value?: string
    className?: string
    placeholder?: string
    image?: ReactNode
    validate?: Validate
    statusimage?: statusimage
    type?: HTMLInputTypeAttribute
    autoComplete?: InputAutoComplete
    onChange?: (e: InputEvent<HTMLInputElement>) => void
    onBlur?: (e: InputEvent<HTMLInputElement>) => void
    onFocus?: (e: InputEvent<HTMLInputElement>) => void
}


export interface ButtonProps {
    args?: any
    id?: string
    link?: string
    text?: string
    circle?: boolean
    button?: boolean
    noSize?: boolean
    loading?: boolean
    noReset?: boolean
    fullSize?: boolean
    disabled?: boolean
    className?: string
    size?: ButtonSize
    type?: ButtonType
    children?: ReactNode
    variant?: ButtonVariant
    onClick?: (e: MouseEventHandler<HTMLButtonElement>) => void
}


//  PAGES
export interface PageLayoutProps extends DefaultProps {
    setIsChangePassword?: Dispatch<SetStateAction<boolean>>
}
