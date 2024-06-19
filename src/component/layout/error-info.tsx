import { WiwaError } from '../../api/model';
import { useErrorState } from '../../state/error';
import { useResourceState } from '../../state/resource';

const ErrorInfo = () => {
    const errorState = useErrorState();

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
    const errorState = useErrorState();
    const resourceState = useResourceState();

    return (
        <div className="alert alert-error text-xs md:text-base">
            <span>{resourceState?.common?.error.title}</span>
            <span>{`${wiwaError.code}: ${wiwaError.message} [${wiwaError.timestamp}]`}</span>
            <button
                className="btn btn-sm normal-case text-xs md:text-base"
                onClick={() => errorState?.removeError(index)}
            >{resourceState?.common?.action.close}</button>
        </div>
    )
}
