import { createContext } from 'react';

import { AppState } from './model/app';
import { AuthState } from './model/auth';
import { DialogState } from './model/dialog';
import { ErrorState } from './model/error';
import { HealthState } from './model/health';
import { AdminResourceState } from './model/resource/admin';
import { AuthResourceState } from './model/resource/auth';
import { CommonResourceState } from './model/resource/common';
import { CustomerResourceState } from './model/resource/customer';
import { EmployeeResourceState } from './model/resource/employee';
import { ManagerResourceState } from './model/resource/manager';
import { UiResourceState } from './model/resource/ui';

export const AppContext = createContext<AppState | undefined>(undefined);
export const AuthContext = createContext<AuthState | undefined>(undefined);
export const DialogContext = createContext<DialogState | undefined>(undefined);
export const ErrorContext = createContext<ErrorState | undefined>(undefined);
export const HealthContext = createContext<HealthState | undefined>(undefined);
export const AdminResourceContext = createContext<AdminResourceState | undefined>(undefined);
export const AuthResourceContext = createContext<AuthResourceState | undefined>(undefined);
export const CommonResourceContext = createContext<CommonResourceState | undefined>(undefined);
export const CustomerResourceContext = createContext<CustomerResourceState | undefined>(undefined);
export const EmployeeResourceContext = createContext<EmployeeResourceState | undefined>(undefined);
export const ManagerResourceContext = createContext<ManagerResourceState | undefined>(undefined);
export const UiResourceContext = createContext<UiResourceState | undefined>(undefined);
