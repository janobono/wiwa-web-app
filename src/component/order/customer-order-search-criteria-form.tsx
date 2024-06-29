import { ReactNode, useContext, useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronUp } from 'react-feather';

import OrderStatusValue from './order-status-value';
import WiwaButton from '../ui/wiwa-button';
import WiwaFormInputDatetime from '../ui/wiwa-form-input-datetime';
import WiwaFormCheckBox from '../ui/wiwa-form-check-box.tsx';
import { OrderSearchCriteria, OrderStatus } from '../../api/model/order';
import { ResourceContext } from '../../context';

const CustomerOrderSearchCriteriaForm = ({searchHandler, children}: {
    searchHandler: (criteria: OrderSearchCriteria) => void
    children?: ReactNode
}) => {
    const resourceState = useContext(ResourceContext);

    const [statusNew, setStatusNew] = useState(false);
    const [statusSent, setStatusSent] = useState(false);
    const [statusInProduction, setStatusInProduction] = useState(false);
    const [statusReady, setStatusReady] = useState(false);
    const [statusFinished, setStatusFinished] = useState(false);
    const [statusCancelled, setStatusCancelled] = useState(false);

    const [createdFrom, setCreatedFrom] = useState<Date>();
    const [createdTo, setCreatedTo] = useState<Date>();

    const [extended, setExtended] = useState(false);

    const didMount = useRef(false);

    useEffect(() => {
        if (!didMount.current) {
            didMount.current = true;
            return;
        }
        searchHandler(createCriteria());
    }, [statusNew, statusSent, statusInProduction, statusReady, statusFinished, statusCancelled, createdFrom, createdTo]);

    const createCriteria = () => {
        const criteria: OrderSearchCriteria = {statuses: []};
        if (statusNew) {
            criteria.statuses?.push(OrderStatus.NEW);
        }
        if (statusSent) {
            criteria.statuses?.push(OrderStatus.SENT);
        }
        if (statusInProduction) {
            criteria.statuses?.push(OrderStatus.IN_PRODUCTION);
        }
        if (statusReady) {
            criteria.statuses?.push(OrderStatus.READY);
        }
        if (statusFinished) {
            criteria.statuses?.push(OrderStatus.FINISHED);
        }
        if (statusCancelled) {
            criteria.statuses?.push(OrderStatus.CANCELLED);
        }
        if (createdFrom) {
            criteria.createdFrom = createdFrom.toISOString();
        }
        if (createdTo) {
            criteria.createdTo = createdTo.toISOString();
        }
        return criteria;
    }

    return (
        <>
            <div className="join join-vertical md:join-horizontal w-full">
                <WiwaButton
                    title={resourceState?.common?.action.extendedSearch}
                    className="join-item"
                    onClick={() => setExtended(!extended)}
                >{extended ?
                    <ChevronUp size={18}/>
                    :
                    <ChevronDown size={18}/>
                }</WiwaButton>
                {children}
            </div>

            {extended &&
                <>
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-5 w-full">
                        <WiwaFormCheckBox
                            className="flex flex-row gap-2 items-center"
                            value={statusNew}
                            setValue={setStatusNew}>
                            <OrderStatusValue value={OrderStatus.NEW}/>
                        </WiwaFormCheckBox>
                        <WiwaFormCheckBox
                            className="flex flex-row gap-2 items-center"
                            value={statusSent}
                            setValue={setStatusSent}>
                            <OrderStatusValue value={OrderStatus.SENT}/>
                        </WiwaFormCheckBox>
                        <WiwaFormCheckBox
                            className="flex flex-row gap-2 items-center"
                            value={statusInProduction}
                            setValue={setStatusInProduction}>
                            <OrderStatusValue value={OrderStatus.IN_PRODUCTION}/>
                        </WiwaFormCheckBox>
                        <WiwaFormCheckBox
                            className="flex flex-row gap-2 items-center"
                            value={statusReady}
                            setValue={setStatusReady}>
                            <OrderStatusValue value={OrderStatus.READY}/>
                        </WiwaFormCheckBox>
                        <WiwaFormCheckBox
                            className="flex flex-row gap-2 items-center"
                            value={statusFinished}
                            setValue={setStatusFinished}>
                            <OrderStatusValue value={OrderStatus.FINISHED}/>
                        </WiwaFormCheckBox>
                        <WiwaFormCheckBox
                            className="flex flex-row gap-2 items-center"
                            value={statusCancelled}
                            setValue={setStatusCancelled}>
                            <OrderStatusValue value={OrderStatus.CANCELLED}/>
                        </WiwaFormCheckBox>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                        <WiwaFormInputDatetime
                            label={resourceState?.customer?.orderCriteria.createdFromLabel}
                            value={createdFrom}
                            setValue={setCreatedFrom}
                        />
                        <WiwaFormInputDatetime
                            label={resourceState?.customer?.orderCriteria.createdToLabel}
                            value={createdTo}
                            setValue={setCreatedTo}
                        />
                    </div>
                </>
            }
        </>
    )
}

export default CustomerOrderSearchCriteriaForm;
