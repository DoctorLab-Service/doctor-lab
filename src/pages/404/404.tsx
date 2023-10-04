import { usePaths } from "hooks"
import { FC } from "react"
import { Page404Props } from "types/props"

import './style.sass'
import { Button } from "components/ui"
import { useTranslate } from "utils/languages"

const Page404: FC<Page404Props> = () => {
    const { translation: { error404: { info, links } } } = useTranslate('auth', [['error404', true]])
    const { paths } = usePaths()

    return (
        <div id="notfound">
            <div className="notfound">
                <div className="notfound-404">
                    <h1>4<span>0</span>4</h1>
                </div>
                <p>{info}</p>
                <Button
                    size='large'
                    link={paths.main}
                    text={links.back}
                    />
            </div>
        </div>
    )
}

export default Page404
