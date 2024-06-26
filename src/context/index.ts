import { createContext } from 'react';

import { AppState } from './model/app';
import { AuthState } from './model/auth';
import { DialogState } from './model/dialog';
import { ErrorState } from './model/error';
import { HealthState } from './model/health';
import { ResourceState } from './model/resource';

export const AppContext = createContext<AppState | undefined>(undefined);
export const AuthContext = createContext<AuthState | undefined>(undefined);
export const DialogContext = createContext<DialogState | undefined>(undefined);
export const ErrorContext = createContext<ErrorState | undefined>(undefined);
export const HealthContext = createContext<HealthState | undefined>(undefined);
export const ResourceContext = createContext<ResourceState | undefined>(undefined);
