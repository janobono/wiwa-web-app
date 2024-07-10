import { ReactNode, useContext, useEffect, useState } from 'react';

import { loadResource } from '../';
import { AppContext, UiResourceContext } from '../../../';
import { ResourceUi } from '../../../model/resource/ui';

const RESOURCE = 'ui';

const UiResourceProvider = ({children}: { children: ReactNode }) => {
    const appState = useContext(AppContext);

    const [resource, setResource] = useState<ResourceUi>();

    useEffect(() => {
        if (appState?.locale) {
            loadResource<ResourceUi>(RESOURCE, appState.locale).then(data => setResource(data));
        }
    }, [appState?.locale]);

    return (
        <UiResourceContext.Provider
            value={
                {
                    resource,
                }
            }
        >{children}
        </UiResourceContext.Provider>
    );
}

export default UiResourceProvider;
