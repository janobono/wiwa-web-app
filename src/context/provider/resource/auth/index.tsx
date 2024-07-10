import { ReactNode, useContext, useEffect, useState } from 'react';

import { loadResource } from '../';
import { AppContext, AuthResourceContext } from '../../../';
import { ResourceAuth } from '../../../model/resource/auth';

const RESOURCE = 'auth';

const AuthResourceProvider = ({children}: { children: ReactNode }) => {
    const appState = useContext(AppContext);

    const [resource, setResource] = useState<ResourceAuth>();

    useEffect(() => {
        if (appState?.locale) {
            loadResource<ResourceAuth>(RESOURCE, appState.locale).then(data => setResource(data));
        }
    }, [appState?.locale]);

    return (
        <AuthResourceContext.Provider
            value={
                {
                    resource
                }
            }
        >{children}
        </AuthResourceContext.Provider>
    );
}

export default AuthResourceProvider;
