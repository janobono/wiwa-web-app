import { createContext, ReactNode, useState } from 'react';
import { Outlet } from 'react-router-dom';

import AccessDefender from '../../component/layout/access-defender';
import BaseFooter from '../../component/layout/base-footer';
import Navigation from '../../component/layout/navigation';
import { Page } from '../../api/model';
import { Order } from '../../api/model/order';

const CustomerPage = () => {
    return (
        <AccessDefender>
            <Navigation/>
            <main className="w-full bg-base text-base-content">
                <CustomerProvider>
                    <Outlet/>
                </CustomerProvider>
            </main>
            <BaseFooter/>
        </AccessDefender>
    )
}

export default CustomerPage;

export interface CustomerState {
    busy: boolean,
    setBusy: (busy: boolean) => void,
    data?: Page<Order>,
    setData: (data?: Page<Order>) => void,
    selected?: Order,
    setSelected: (order?: Order) => void
}

export const CustomerContext = createContext<CustomerState | undefined>(undefined);

const CustomerProvider = ({children}: { children: ReactNode }) => {
    const [busy, setBusy] = useState(false);
    const [data, setData] = useState<Page<Order>>();
    const [selected, setSelected] = useState<Order>();

    return (
        <CustomerContext.Provider
            value={
                {
                    busy,
                    setBusy,
                    data,
                    setData,
                    selected,
                    setSelected
                }
            }
        >{children}
        </CustomerContext.Provider>
    );
}
