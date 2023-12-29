import { useEffect, useState } from 'react';

import { useResourceState } from '../state/resource-state-provider';

const WiwaValue = ({value}: { value?: string }) => {
    const resourceState = useResourceState();

    const [data, setData] = useState<string>();

    useEffect(() => {
        if (value === 'true') {
            setData(resourceState?.common?.value.yes);
        } else if (value === 'false') {
            setData(resourceState?.common?.value.no);
        } else {
            setData(value);
        }
    }, [resourceState?.common, value]);

    return (
        <>
            {data}
        </>
    )
}

export default WiwaValue;
