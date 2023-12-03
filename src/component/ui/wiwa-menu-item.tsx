import { NavLink } from 'react-router-dom';

const WiwaMenuItem = (
    {
        label,
        to,
        disabled = false,
    }: {
        label?: string,
        to: string,
        disabled?: boolean
    }) => {
    return (
        <li className={disabled ? 'disabled' : ''}>
            {disabled ?
                <span>{label}</span>
                :
                <NavLink to={to}>{label}</NavLink>
            }
        </li>
    )
}

export default WiwaMenuItem;
