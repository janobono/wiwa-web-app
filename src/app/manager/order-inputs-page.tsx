import { useState } from 'react';

import ManufacturePropertiesEditor from '../../component/app/manager/manufacture-properties-editor';
import PriceForGluingLayerEditor from '../../component/app/manager/price-for-gluing-layer-editor';
import PricesForGluingEdgeEditor from '../../component/app/manager/prices-for-gluing-edge-editor';
import PricesForCuttingEditor from '../../component/app/manager/prices-for-cutting-editor';
import FreeDaysEditor from '../../component/app/manager/free-days-editor';
import WiwaBreadcrumb from '../../component/ui/wiwa-breadcrumb';
import WiwaSelect from '../../component/ui/wiwa-select';
import { useResourceState } from '../../state/resource';

const OrderInputsPage = () => {
    const resourceState = useResourceState();

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
                    <option value="1">{resourceState?.manager?.orderInputs.option.manufactureProperties}</option>
                    <option value="2">{resourceState?.manager?.orderInputs.option.priceForGluingLayer}</option>
                    <option value="3">{resourceState?.manager?.orderInputs.option.pricesForGluingEdge}</option>
                    <option value="4">{resourceState?.manager?.orderInputs.option.pricesForCutting}</option>
                    <option value="5">{resourceState?.manager?.orderInputs.option.freeDays}</option>
                </WiwaSelect>

                <div>
                    {index == 1 && <ManufacturePropertiesEditor/>}
                    {index == 2 && <PriceForGluingLayerEditor/>}
                    {index == 3 && <PricesForGluingEdgeEditor/>}
                    {index == 4 && <PricesForCuttingEditor/>}
                    {index == 5 && <FreeDaysEditor/>}
                </div>
            </div>
        </>
    )
}

export default OrderInputsPage;
