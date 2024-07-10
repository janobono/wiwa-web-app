import { ReactNode, useContext, useEffect, useState } from 'react';

import { loadResource } from '../';
import { AppContext, CustomerResourceContext } from '../../../';
import { ResourceCustomer } from '../../../model/resource/customer';

const RESOURCE = 'customer';

const CustomerResourceProvider = ({children}: { children: ReactNode }) => {
    const appState = useContext(AppContext);

    const [resource, setResource] = useState<ResourceCustomer>();

    useEffect(() => {
        if (appState?.locale) {
            loadResource<ResourceCustomer>(RESOURCE, appState.locale).then(data => setResource(data));
        }
    }, [appState?.locale]);

    return (
        <CustomerResourceContext.Provider
            value={
                {
                    resource
                }
            }
        >{children}
        </CustomerResourceContext.Provider>
    );
}

export default CustomerResourceProvider;
