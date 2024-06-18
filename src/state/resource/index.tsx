import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { useAppState } from '../app';
import { useAuthState } from '../auth';
import { Unit, UnitId } from '../../api/model/application';
import { ResourceAdmin } from '../../model/resource/admin';
import { ResourceAuth } from '../../model/resource/auth';
import { ResourceCommon } from '../../model/resource/common';
import { ResourceCustomer } from '../../model/resource/customer';
import { ResourceEmployee } from '../../model/resource/employee';
import { ResourceManager } from '../../model/resource/manager';
import { ResourceUi } from '../../model/resource/ui';
import { getUnits } from '../../api/controller/ui';

const RESOURCE_ADMIN = 'admin';
const RESOURCE_AUTH = 'auth';
const RESOURCE_COMMON = 'common';
const RESOURCE_CUSTOMER = 'customer';
const RESOURCE_EMPLOYEE = 'employee';
const RESOURCE_MANAGER = 'manager';
const RESOURCE_UI = 'ui';

const RESOURCE_MAP = new Map<string, any>();

async function loadResource<T>(resource: string, locale?: string) {
    const resourceFile = '/resource/' + resource + '_' + locale + '.json';
    if (!RESOURCE_MAP.has(resourceFile)) {
        const response = await fetch(resourceFile);
        RESOURCE_MAP.set(resourceFile, await response.json() as T);
    }
    return RESOURCE_MAP.get(resourceFile) as T;
}

export interface ResourceState {
    admin?: ResourceAdmin,
    auth?: ResourceAuth,
    common?: ResourceCommon,
    customer?: ResourceCustomer,
    employee?: ResourceEmployee,
    manager?: ResourceManager,
    ui?: ResourceUi,
    getUnitIdName: (unitId: UnitId) => string | undefined,
    getUnit: (unitId: UnitId) => string | undefined
}

const resourceStateContext = createContext<ResourceState | undefined>(undefined);

const ResourceStateProvider = ({children}: { children: ReactNode }) => {
    const appState = useAppState();
    const authState = useAuthState();

    const [admin, setAdmin] = useState<ResourceAdmin>();
    const [auth, setAuth] = useState<ResourceAuth>();
    const [common, setCommon] = useState<ResourceCommon>();
    const [customer, setCustomer] = useState<ResourceCustomer>();
    const [employee, setEmployee] = useState<ResourceEmployee>();
    const [manager, setManager] = useState<ResourceManager>();
    const [ui, setUi] = useState<ResourceUi>();

    const [units, setUnits] = useState<Unit[]>();

    useEffect(() => {
        if (appState?.locale) {
            loadResource<ResourceAdmin>(RESOURCE_ADMIN, appState.locale).then(data => setAdmin(data));
            loadResource<ResourceAuth>(RESOURCE_AUTH, appState.locale).then(data => setAuth(data));
            loadResource<ResourceCommon>(RESOURCE_COMMON, appState.locale).then(data => setCommon(data));
            loadResource<ResourceCustomer>(RESOURCE_CUSTOMER, appState.locale).then(data => setCustomer(data));
            loadResource<ResourceEmployee>(RESOURCE_EMPLOYEE, appState.locale).then(data => setEmployee(data));
            loadResource<ResourceManager>(RESOURCE_MANAGER, appState.locale).then(data => setManager(data));
            loadResource<ResourceUi>(RESOURCE_UI, appState.locale).then(data => setUi(data));
        }
    }, [appState?.locale]);

    useEffect(() => {
        getUnits().then(data => setUnits(data.data));
    }, [authState?.authToken]);

    const getUnitIdName = (unitId: UnitId) => {
        switch (unitId) {
            case UnitId.MILLIMETER:
                return common?.unitId.millimeter;
            case UnitId.METER:
                return common?.unitId.meter;
            case UnitId.SQUARE_METER:
                return common?.unitId.squareMeter;
            case UnitId.KILOGRAM:
                return common?.unitId.kilogram;
            case UnitId.PIECE:
                return common?.unitId.piece;
        }
    }

    const getUnit = (unitId: UnitId) => {
        if (units) {
            return units.find(item => item.id === unitId)?.value;
        }
    }

    return (
        <resourceStateContext.Provider
            value={
                {
                    admin,
                    auth,
                    common,
                    customer,
                    employee,
                    manager,
                    ui,
                    getUnitIdName,
                    getUnit
                }
            }
        >{children}
        </resourceStateContext.Provider>
    );
}

export default ResourceStateProvider;

export const useResourceState = () => {
    return useContext(resourceStateContext);
}
