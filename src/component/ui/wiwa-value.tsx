import { useContext, useEffect, useState } from 'react';

import { CommonResourceContext } from '../../context';

const WiwaValue = ({value}: { value?: string }) => {
    const commonResourceState = useContext(CommonResourceContext);

    const [data, setData] = useState<string>();

    useEffect(() => {
        if (value === 'true') {
            setData(commonResourceState?.resource?.value.yes);
        } else if (value === 'false') {
            setData(commonResourceState?.resource?.value.no);
        } else {
            setData(value);
        }
    }, [commonResourceState?.resource, value]);

    return (
        <>
            {data}
        </>
    )
}

export default WiwaValue;
