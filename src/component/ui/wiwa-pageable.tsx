import { ChevronLeft, ChevronRight } from 'react-feather';

import { useResourceState } from '../state/resource-state-provider';
import WiwaButton from './wiwa-button';

const WiwaPageable = (
    {
        isPrevious,
        previousHandler,
        page,
        pageHandler,
        isNext,
        nextHandler,
        disabled = false
    }: {
        isPrevious: boolean,
        previousHandler: () => void,
        page: number,
        pageHandler: () => void,
        isNext: boolean,
        nextHandler: () => void,
        disabled?: boolean
    }) => {
    const resourceState = useResourceState();

    return (
        <div className="join">
            <WiwaButton
                className="join-item"
                title={resourceState?.common?.pageable.previous}
                disabled={disabled || !isPrevious}
                onClick={previousHandler}
            ><ChevronLeft size={18}/>
            </WiwaButton>
            <WiwaButton
                className="join-item"
                disabled={disabled}
                onClick={pageHandler}
            ><span>{resourceState?.common?.pageable.page}</span><span> </span>{page}</WiwaButton>
            <WiwaButton
                className="join-item"
                title={resourceState?.common?.pageable.next}
                disabled={disabled || !isNext}
                onClick={nextHandler}
            ><ChevronRight size={18}/>
            </WiwaButton>
        </div>
    )
}

export default WiwaPageable;
