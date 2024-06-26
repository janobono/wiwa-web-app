import { ResourceAdmin } from './admin';
import { ResourceAuth } from './auth';
import { ResourceCommon } from './common';
import { ResourceCustomer } from './customer';
import { ResourceEmployee } from './employee';
import { ResourceManager } from './manager';
import { ResourceUi } from './ui';
import { UnitId } from '../../../api/model/application';

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
