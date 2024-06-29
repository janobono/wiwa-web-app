import { useContext, useEffect, useState } from 'react';

import { AppContext } from '../../context';

const WiwaValueDatetime = ({value}: { value?: string }) => {
    const appState = useContext(AppContext);

    const [data, setData] = useState<string>();

    useEffect(() => {
        if (value) {
            const date = new Date(Date.parse(value));
            if (appState?.locale) {
                setData(date.toLocaleString(appState?.locale.replace('_', '-')));
            } else {
                setData(date.toLocaleString());
            }
        } else {
            setData(undefined);
        }
    }, [appState?.locale, value]);

    return (
        <>
            {data}
        </>
    )
}

export default WiwaValueDatetime;
