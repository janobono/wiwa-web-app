import { ReactNode, useContext, useEffect, useState } from 'react';

import { loadResource } from '../';
import { AppContext, ManagerResourceContext } from '../../../';
import { ResourceManager } from '../../../model/resource/manager';

const RESOURCE = 'manager';

const ManagerResourceProvider = ({children}: { children: ReactNode }) => {
    const appState = useContext(AppContext);

    const [resource, setResource] = useState<ResourceManager>();

    useEffect(() => {
        if (appState?.locale) {
            loadResource<ResourceManager>(RESOURCE, appState.locale).then(data => setResource(data));
        }
    }, [appState?.locale]);

    return (
        <ManagerResourceContext.Provider
            value={
                {
                    resource
                }
            }
        >{children}
        </ManagerResourceContext.Provider>
    );
}

export default ManagerResourceProvider;
