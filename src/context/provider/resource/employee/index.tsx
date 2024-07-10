import { ReactNode, useContext, useEffect, useState } from 'react';

import { loadResource } from '../';
import { AppContext, EmployeeResourceContext } from '../../../';
import { ResourceEmployee } from '../../../model/resource/employee';

const RESOURCE = 'employee';

const EmployeeResourceProvider = ({children}: { children: ReactNode }) => {
    const appState = useContext(AppContext);

    const [resource, setResource] = useState<ResourceEmployee>();

    useEffect(() => {
        if (appState?.locale) {
            loadResource<ResourceEmployee>(RESOURCE, appState.locale).then(data => setResource(data));
        }
    }, [appState?.locale]);

    return (
        <EmployeeResourceContext.Provider
            value={
                {
                    resource
                }
            }
        >{children}
        </EmployeeResourceContext.Provider>
    );
}

export default EmployeeResourceProvider;
