import React from 'react';
import { twMerge } from 'tailwind-merge';

import { ApplicationImage } from '../../client/model';

interface ApplicationImageCardProps {
    applicationImage: ApplicationImage,
    selected: boolean,
    onSelect: (applicationImage: ApplicationImage) => void
}

const classes = {
    base: 'flex flex-row items-center overflow-hidden rounded bg-white shadow-md shadow-slate-200 hover:bg-gray-300 border-2 border-transparent hover:cursor-pointer',
    selected: 'border-blue-500'
}

const ApplicationImageCard: React.FC<ApplicationImageCardProps> = (props) => {
    return (
        <div
            className={twMerge(`
                ${classes.base}
                ${props.selected && classes.selected}
            `)}
            onClick={() => props.onSelect(props.applicationImage)}
        >
            <img
                src={props.applicationImage.thumbnail}
                alt={props.applicationImage.fileName}
                className="flex-none w-[50px] h-[50px] object-scale-down object-center"
            />
            <div className="flex-grow text-center text-sm">
                {props.applicationImage.fileName.length > 25 ? props.applicationImage.fileName.substring(0, 22) + '...' : props.applicationImage.fileName}
            </div>
        </div>
    )
}

export default ApplicationImageCard;
