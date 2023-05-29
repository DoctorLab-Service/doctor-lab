import { RolesList, SocialProviders } from "types"
import {
    ButtonSize,
    ButtonType,
    ButtonVariant,
    DefaultProps,
    FormType,
    InputAutoComplete,
    InputStatus,
    Roles,
    statusimage
} from "./core"

// MODULES
export interface FormProps {
    darkMode?: boolean
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

//  COMPONENTS
export interface FormBodyHeaderProps {
    pagename: FormType
    currentRole?: Roles
}

export interface FormBodyFooterProps {
    pathWithRole?: string
    pagename?: FormType
    onClick: () => void
}
export interface FormBodyProps {
    currentRole?: Roles
    pagename?: FormType
}

export interface FormHeaderProps {
    darkMode?: boolean
    roles?: RolesList[]
    changeRole?: (idx: number) => void

}
export interface SocialButtonProps {
    provider: SocialProviders
    circle?: boolean
    scope?: string
    redirect_uri?: string
    onLoginStart?: () => void
    onLogoutSuccess?: () => void
    className?: string
    icon?: boolean
    text?: string
    children?: ReactNode
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

export interface ToggleThemeProps extends DefaultProps { }

export interface ToggleLanguageProps {
    langauges?: LanguagesOptions[]
    defaultValue?: string
}

export interface LanguagesOptions {
    value: string
    checked: boolean
}

export interface InputGroupProps {
    pagename?: FormType
}


export interface TextareaProps {
    children?: ReactNode
    value?: string
    autoComplete?: InputAutoComplete
    className?: string
    id: string
    name?: string
    placeholder?: string
    image?: ReactNode
    status?: InputStatus
    statusimage?: statusimage
    value?: string
    args?: any
    onChange?: (e: InputEvent<HTMLInputElement>) => void
    onBlur?: (e: InputEvent<HTMLInputElement>) => void
    onFocus?: (e: InputEvent<HTMLInputElement>) => void
}


export interface InputProps {
    autoComplete?: InputAutoComplete
    className?: string
    id: string
    name?: string
    placeholder?: string
    type?: HTMLInputTypeAttribute
    image?: ReactNode
    status?: InputStatus
    statusimage?: statusimage
    value?: string
    args?: any
    onChange?: (e: InputEvent<HTMLInputElement>) => void
    onBlur?: (e: InputEvent<HTMLInputElement>) => void
    onFocus?: (e: InputEvent<HTMLInputElement>) => void
}


export interface ButtonProps {
    link?: string
    id?: string
    text?: string
    className?: string
    size?: ButtonSize
    type?: ButtonType
    onClick?: (e: MouseEventHandler<HTMLButtonElement>) => void
    children?: ReactNode
    variant?: ButtonVariant
    fullSize?: boolean
    noReset?: boolean
    circle?: boolean
    button?: boolean
    noSize?: boolean
    args?: any
}



//  PAGES
export interface PageLayoutProps extends DefaultProps {}
