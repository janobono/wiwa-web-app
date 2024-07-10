import { useContext } from 'react';

import { WiwaError } from '../../api/model';
import { CommonResourceContext, ErrorContext } from '../../context';

const ErrorInfo = () => {
    const errorState = useContext(ErrorContext);

    return (
        <>
            {errorState?.data.map((item, index) =>
                <WiwaErrorPanel key={index} index={index} wiwaError={item}/>
            )}
        </>
    )
}

export default ErrorInfo;

const WiwaErrorPanel = ({index, wiwaError}: { index: number, wiwaError: WiwaError }) => {
    const errorState = useContext(ErrorContext);
    const commonResourceState = useContext(CommonResourceContext);

    return (
        <div className="alert alert-error text-xs md:text-base">
            <span>{commonResourceState?.resource?.error.title}</span>
            <span>{`${wiwaError.code}: ${wiwaError.message} [${wiwaError.timestamp}]`}</span>
            <button
                className="btn btn-sm normal-case text-xs md:text-base"
                onClick={() => errorState?.removeError(index)}
            >{commonResourceState?.resource?.action.close}</button>
        </div>
    )
}
