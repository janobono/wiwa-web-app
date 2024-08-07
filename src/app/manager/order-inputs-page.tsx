import { useContext, useState } from 'react';

import ManufacturePropertiesEditor from '../../component/app/manager/order-inputs/manufacture-properties-editor';
import PriceForGluingLayerEditor from '../../component/app/manager/order-inputs/price-for-gluing-layer-editor';
import PricesForGluingEdgeEditor from '../../component/app/manager/order-inputs/prices-for-gluing-edge-editor';
import PricesForCuttingEditor from '../../component/app/manager/order-inputs/prices-for-cutting-editor';
import FreeDayEditor from '../../component/app/manager/order-inputs/free-day-editor';
import VatRateEditor from '../../component/app/manager/order-inputs/vat-rate-editor';
import WiwaBreadcrumb from '../../component/ui/wiwa-breadcrumb';
import WiwaSelect from '../../component/ui/wiwa-select';
import { CommonResourceContext, ManagerResourceContext } from '../../context';

const OrderInputsPage = () => {
    const commonResourceState = useContext(CommonResourceContext);
    const managerResourceState = useContext(ManagerResourceContext);

    const [index, setIndex] = useState(0);

    return (
        <>
            <WiwaBreadcrumb breadcrumbs={[
                {key: 0, label: commonResourceState?.resource?.navigation.managerNav.title || ''},
                {
                    key: 1,
                    label: commonResourceState?.resource?.navigation.managerNav.orderInputs || '',
                    to: '/manager/order-inputs'
                }
            ]}/>

            <div className="flex flex-col p-5 gap-5 w-full">
                <WiwaSelect
                    defaultValue="0"
                    onChange={event => setIndex(Number(event.currentTarget.value))}
                >
                    <option disabled value="0">{managerResourceState?.resource?.orderInputs.option.select}</option>
                    <option value="1">{managerResourceState?.resource?.orderInputs.option.vatRate}</option>
                    <option
                        value="2">{managerResourceState?.resource?.orderInputs.option.manufactureProperties}</option>
                    <option value="3">{managerResourceState?.resource?.orderInputs.option.priceForGluingLayer}</option>
                    <option value="4">{managerResourceState?.resource?.orderInputs.option.pricesForGluingEdge}</option>
                    <option value="5">{managerResourceState?.resource?.orderInputs.option.pricesForCutting}</option>
                    <option value="6">{managerResourceState?.resource?.orderInputs.option.freeDays}</option>
                </WiwaSelect>

                {index == 1 && <VatRateEditor/>}
                {index == 2 && <ManufacturePropertiesEditor/>}
                {index == 3 && <PriceForGluingLayerEditor/>}
                {index == 4 && <PricesForGluingEdgeEditor/>}
                {index == 5 && <PricesForCuttingEditor/>}
                {index == 6 && <FreeDayEditor/>}
            </div>
        </>
    )
}

export default OrderInputsPage;
