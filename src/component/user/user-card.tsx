import React from 'react';
import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';

import { Authority, User } from '../../client/model';
import { RESOURCE } from '../../locale';
import { UserAuthoritiesComponent } from './index';

interface UserCardProps {
    user: User,
    selected: boolean,
    onSelect: (user: User) => void
}

const classes = {
    base: 'flex flex-row items-center overflow-hidden rounded bg-white shadow-md shadow-slate-200 hover:bg-gray-300 border-2 border-transparent hover:cursor-pointer',
    selected: 'border-blue-500',
    disabled: 'bg-red-400',
    notConfirmed: 'bg-yellow-400'
}

const UserCard: React.FC<UserCardProps> = (props) => {
    const {t} = useTranslation();

    const hasAuthority = (user: User, authority: Authority) => {
        return user.authorities.some(a => a === authority);
    };

    return (
        <div
            className={twMerge(`
                ${classes.base}
                ${props.selected && classes.selected}
                ${!props.user.enabled && classes.disabled}
                ${props.user.enabled && !props.user.confirmed && classes.notConfirmed}
            `)}
            onClick={() => props.onSelect(props.user)}
        >

            <div
                className="grid grid-cols-1 md:grid-cols-2 p-2 place-items-start gap-2 w-full text-xs items-center">

                <div className="font-bold">{t(RESOURCE.COMPONENT.USER.USER_CARD.USERNAME)}</div>
                <div>{props.user.username}</div>

                <div className="font-bold">{t(RESOURCE.COMPONENT.USER.USER_CARD.EMAIL)}</div>
                <div>{props.user.email}</div>

                <div className="font-bold">{t(RESOURCE.COMPONENT.USER.USER_CARD.FIRST_NAME)}</div>
                <div>{props.user.firstName}</div>

                <div className="font-bold">{t(RESOURCE.COMPONENT.USER.USER_CARD.LAST_NAME)}</div>
                <div>{props.user.lastName}</div>

                <div className="font-bold">{t(RESOURCE.COMPONENT.USER.USER_CARD.AUTHORITIES)}</div>
                <UserAuthoritiesComponent authorities={props.user.authorities}/>
            </div>
        </div>
    )
}

export default UserCard;
