import { useContext, useEffect, useState } from 'react';

import { ResourceContext } from '../../context';

const WiwaValue = ({value}: { value?: string }) => {
    const resourceState = useContext(ResourceContext);

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
