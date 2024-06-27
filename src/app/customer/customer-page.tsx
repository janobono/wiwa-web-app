import { createContext, ReactNode, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Authority, Page } from '../../api/model';
import { Order } from '../../api/model/order';
import AuthDefender from '../../component/layout/auth-defender';
import BaseFooter from '../../component/layout/base-footer';
import MaintenanceDefender from '../../component/layout/maintenance-defender';
import Navigation from '../../component/layout/navigation';

const CustomerPage = () => {
    return (
        <MaintenanceDefender>
            <AuthDefender authority={Authority.W_CUSTOMER}>
                <Navigation/>
                <main className="w-full bg-base text-base-content">
                    <CustomerProvider>
                        <Outlet/>
                    </CustomerProvider>
                </main>
                <BaseFooter/>
            </AuthDefender>
        </MaintenanceDefender>
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
