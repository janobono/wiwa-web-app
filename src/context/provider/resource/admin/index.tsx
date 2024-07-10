import { ReactNode, useContext, useEffect, useState } from 'react';

import { loadResource } from '../';
import { AdminResourceContext, AppContext } from '../../../';
import { ResourceAdmin } from '../../../model/resource/admin';

const RESOURCE = 'admin';

const AdminResourceProvider = ({children}: { children: ReactNode }) => {
    const appState = useContext(AppContext);

    const [resource, setResource] = useState<ResourceAdmin>();

    useEffect(() => {
        if (appState?.locale) {
            loadResource<ResourceAdmin>(RESOURCE, appState.locale).then(data => setResource(data));
        }
    }, [appState?.locale]);

    return (
        <AdminResourceContext.Provider
            value={
                {
                    resource
                }
            }
        >{children}
        </AdminResourceContext.Provider>
    );
}

export default AdminResourceProvider;
