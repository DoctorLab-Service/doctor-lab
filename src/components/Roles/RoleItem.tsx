import classNames from 'classnames'
import { FC } from 'react'
import { RoleItemProps } from 'types/props'



const RoleItem: FC<RoleItemProps> = ({ value, src, changed, circle, className, onClick }) => {
    const itemClasses = classNames(
        'item',
        className,
        changed && 'changed',
        circle && 'circle'    
    )
    const roleClasses = classNames(
        'item-role',
        circle && 'circle'    
    )
    return (
        <div className={itemClasses} onClick={onClick}>
            <div className={roleClasses}>
                <img className='item-role-image' src={src} alt={value} />
            </div>
            <span className='item-text'>{value}</span>
        </div >
    )
}

RoleItem.defaultProps = {
    value: '',
    src: '',
    className: '',
    changed: false,
    circle: true,
}

export default RoleItem
