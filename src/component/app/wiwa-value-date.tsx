import { useEffect, useState } from 'react';

import { useAppState } from '../state/app-state-provider';

const WiwaValueDate = ({value}: { value?: string }) => {
    const appState = useAppState();

    const [data, setData] = useState<string>();

    useEffect(() => {
        if (value) {
            const date = new Date(Date.parse(value));
            if (appState?.locale) {
                setData(date.toLocaleDateString(appState?.locale.replace('_', '-')));
            } else {
                setData(date.toLocaleDateString());
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

export default WiwaValueDate;
