import { ReactNode, useContext, useEffect, useState } from 'react';

import { loadResource } from '../';
import { AppContext, AuthContext, CommonResourceContext } from '../../../';
import { ResourceCommon } from '../../../model/resource/common';
import { getUnits } from '../../../../api/controller/ui';
import { Unit, UnitId } from '../../../../api/model/application';

const RESOURCE = 'common';

const CommonResourceProvider = ({children}: { children: ReactNode }) => {
    const appState = useContext(AppContext);
    const authState = useContext(AuthContext);

    const [resource, setResource] = useState<ResourceCommon>();
    const [units, setUnits] = useState<Unit[]>();

    useEffect(() => {
        if (appState?.locale) {
            loadResource<ResourceCommon>(RESOURCE, appState.locale).then(data => setResource(data));
        }
    }, [appState?.locale]);

    useEffect(() => {
        getUnits().then(data => setUnits(data.data));
    }, [authState?.authToken]);

    const getUnitIdName = (unitId: UnitId) => {
        switch (unitId) {
            case UnitId.MILLIMETER:
                return resource?.unitId.millimeter;
            case UnitId.METER:
                return resource?.unitId.meter;
            case UnitId.SQUARE_METER:
                return resource?.unitId.squareMeter;
            case UnitId.KILOGRAM:
                return resource?.unitId.kilogram;
            case UnitId.PIECE:
                return resource?.unitId.piece;
        }
    }

    const getUnit = (unitId: UnitId) => {
        if (units) {
            return units.find(item => item.id === unitId)?.value;
        }
    }

    return (
        <CommonResourceContext.Provider
            value={
                {
                    resource,
                    getUnitIdName,
                    getUnit
                }
            }
        >{children}
        </CommonResourceContext.Provider>
    );
}

export default CommonResourceProvider;
