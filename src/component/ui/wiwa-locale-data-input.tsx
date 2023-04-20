import React, { useEffect, useState } from 'react';

import { LOCALE, toLocale } from '../../locale';
import { FlagSk, FlagUs } from './icon';

import { WiwaInput, WiwaLocaleComponentProps } from './index';

const WiwaLocaleDataInput: React.FC<WiwaLocaleComponentProps> = (props) => {
    const [value, setValue] = useState('');

    useEffect(() => {
        const item = props.data?.items.find(item => item.language === props.language);
        if (item) {
            setValue(item.data);
        }
    }, []);

    useEffect(() => {
        props.setData((prevState) => {
                const nextItems = [...prevState.items.filter(item => item.language !== props.language),
                    {language: props.language, data: value}
                ];
                return {items: nextItems};
            }
        );
    }, [value]);

    return (
        <div className="flex flex-row gap-2 items-center">
            {toLocale(props.language) === LOCALE.EN ? <FlagUs/> : <FlagSk/>}
            <WiwaInput
                className="w-full p-0.5"
                type="text"
                id={props.name + '_' + props.language}
                name={props.name + '_' + props.language}
                value={value}
                onChange={event => setValue(event.target.value)}
            />
        </div>
    );
}

export default WiwaLocaleDataInput;
