import { useContext, useState } from 'react';

import ManufacturePropertiesEditor from '../../component/app/manager/manufacture-properties-editor';
import PriceForGluingLayerEditor from '../../component/app/manager/price-for-gluing-layer-editor';
import PricesForGluingEdgeEditor from '../../component/app/manager/prices-for-gluing-edge-editor';
import PricesForCuttingEditor from '../../component/app/manager/prices-for-cutting-editor';
import FreeDayEditor from '../../component/app/manager/free-day-editor';
import VatRateEditor from '../../component/app/manager/vat-rate-editor';
import WiwaBreadcrumb from '../../component/ui/wiwa-breadcrumb';
import WiwaSelect from '../../component/ui/wiwa-select';
import { ResourceContext } from '../../context';

const OrderInputsPage = () => {
    const resourceState = useContext(ResourceContext);

    const [index, setIndex] = useState(0);

    return (
        <>
            <WiwaBreadcrumb breadcrumbs={[
                {key: 0, label: resourceState?.common?.navigation.managerNav.title || ''},
                {
                    key: 1,
                    label: resourceState?.common?.navigation.managerNav.orderInputs || '',
                    to: '/manager/order-inputs'
                }
            ]}/>

            <div className="flex flex-col p-5 gap-5 w-full">
                <WiwaSelect
                    defaultValue="0"
                    onChange={event => setIndex(Number(event.currentTarget.value))}
                >
                    <option disabled value="0">{resourceState?.manager?.orderInputs.option.select}</option>
                    <option value="1">{resourceState?.manager?.orderInputs.option.vatRate}</option>
                    <option value="2">{resourceState?.manager?.orderInputs.option.manufactureProperties}</option>
                    <option value="3">{resourceState?.manager?.orderInputs.option.priceForGluingLayer}</option>
                    <option value="4">{resourceState?.manager?.orderInputs.option.pricesForGluingEdge}</option>
                    <option value="5">{resourceState?.manager?.orderInputs.option.pricesForCutting}</option>
                    <option value="6">{resourceState?.manager?.orderInputs.option.freeDays}</option>
                </WiwaSelect>

                <div>
                    {index == 1 && <VatRateEditor/>}
                    {index == 2 && <ManufacturePropertiesEditor/>}
                    {index == 3 && <PriceForGluingLayerEditor/>}
                    {index == 4 && <PricesForGluingEdgeEditor/>}
                    {index == 5 && <PricesForCuttingEditor/>}
                    {index == 6 && <FreeDayEditor/>}
                </div>
            </div>
        </>
    )
}

export default OrderInputsPage;
