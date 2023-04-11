import React from 'react';
import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';

import { User } from '../../client/model';
import { RESOURCE } from '../../locale';
import { WiwaButton } from '../ui';
import { Edit } from 'react-feather';

interface UserCardProps {
    user: User,
    selected: boolean,
    onSelect: (user: User) => void
}

const classes = {
    base: 'flex flex-row items-center overflow-hidden rounded bg-white shadow-md shadow-slate-200 hover:bg-gray-300 border-2 border-transparent hover:cursor-pointer',
    selected: 'border-blue-500'
}

const UserCard: React.FC<UserCardProps> = (props) => {
    const {t} = useTranslation();

    return (
        <div
            className={twMerge(`
                ${classes.base}
                ${props.selected && classes.selected}
            `)}
            onClick={() => props.onSelect(props.user)}
        >

            <div
                className="grid grid-cols-1 md:grid-cols-2 place-items-start gap-2 w-full text-xs md:text-base items-center">

                <div className="font-bold">{t(RESOURCE.COMPONENT.USER.USER_CARD.USERNAME)}</div>
                <div>{props.user.username}</div>

                <div className="font-bold">{t(RESOURCE.COMPONENT.USER.USER_CARD.EMAIL)}</div>
                <div>{props.user.email}</div>

                <div className="font-bold">{t(RESOURCE.COMPONENT.USER.USER_CARD.TITLE_BEFORE)}</div>
                <div>{props.user.titleBefore}</div>

                <div className="font-bold">{t(RESOURCE.COMPONENT.USER.USER_CARD.FIRST_NAME)}</div>
                <div>{props.user.firstName}</div>

                <div className="font-bold">{t(RESOURCE.COMPONENT.USER.USER_CARD.MID_NAME)}</div>
                <div>{props.user.midName}</div>

                <div className="font-bold">{t(RESOURCE.COMPONENT.USER.USER_CARD.LAST_NAME)}</div>
                <div>{props.user.lastName}</div>

                <div className="font-bold">{t(RESOURCE.COMPONENT.USER.USER_CARD.TITLE_AFTER)}</div>
                <div>{props.user.titleAfter}</div>

                <div className="font-bold">{t(RESOURCE.COMPONENT.USER.USER_CARD.GDPR)}</div>
                <div>{props.user.gdpr ? t(RESOURCE.ACTION.YES) : t(RESOURCE.ACTION.NO)}</div>

                <div className="font-bold">{t(RESOURCE.COMPONENT.USER.USER_CARD.CONFIRMED)}</div>
                <div>{props.user.confirmed ? t(RESOURCE.ACTION.YES) : t(RESOURCE.ACTION.NO)}</div>

                <div className="font-bold">{t(RESOURCE.COMPONENT.USER.USER_CARD.ENABLED)}</div>
                <div>{props.user.enabled ? t(RESOURCE.ACTION.YES) : t(RESOURCE.ACTION.NO)}</div>

                <div className="font-bold">{t(RESOURCE.COMPONENT.USER.USER_CARD.AUTHORITIES)}</div>
                <div></div>
            </div>
        </div>
    )
}

export default UserCard;
