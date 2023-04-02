import React from 'react'
import { ApplicationInfoItem } from '../../client/model';
import { APP_IMAGES_PATH_PREFIX } from '../../client';
import { twMerge } from 'tailwind-merge';

interface ApplicationInfoItemCardProps {
    applicationInfoItem: ApplicationInfoItem,
    editMode?: boolean,
    selected?: boolean,
    onSelect?: (applicationInfoItem: ApplicationInfoItem) => void
}

const classes = {
    base: 'overflow-hidden rounded bg-white text-slate-500 shadow-md shadow-slate-200',
    editMode: 'hover:bg-gray-300 border-2 border-transparent hover:cursor-pointer',
    selected: 'border-blue-500'
}

const ApplicationInfoItemCard: React.FC<ApplicationInfoItemCardProps> = (props) => {
    const onSelect = (applicationInfoItem: ApplicationInfoItem) => {
        if (props.editMode && props.onSelect) {
            props.onSelect(applicationInfoItem);
        }
    }

    return (
        <div className={twMerge(`
                ${classes.base}
                ${props.editMode && classes.editMode}
                ${props.editMode && props.selected && classes.selected}
            `)}
             onClick={() => onSelect(props.applicationInfoItem)}
        >
            <img
                className="aspect-video w-full"
                src={APP_IMAGES_PATH_PREFIX + props.applicationInfoItem.imageFileName}
                alt={props.applicationInfoItem.imageFileName}
            />
            <div className="p-5">
                <div className="mb-5">
                    <h3 className="text-xl font-medium text-slate-700">{props.applicationInfoItem.title}</h3>
                </div>
                <div className="text-justify text-sm">{props.applicationInfoItem.text}</div>
            </div>
        </div>
    )
}

export default ApplicationInfoItemCard;
