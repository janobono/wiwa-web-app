import { useEffect, useState } from 'react';

import { useAppState } from '../../state/app';

const WiwaValueNumber = ({value}: { value?: number }) => {
    const appState = useAppState();

    const [data, setData] = useState<string>();

    useEffect(() => {
        if (value) {
            if (appState?.locale) {
                setData(value.toLocaleString(appState?.locale.replace('_', '-')));
            } else {
                setData(value.toString());
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

export default WiwaValueNumber;
