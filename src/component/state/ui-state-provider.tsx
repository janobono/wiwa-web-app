import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { useAuthState } from './auth-state-provider';
import { useConfigState } from './config-state-provider';
import { CompanyInfo, SingleValueBody } from '../../model/service';
import { ClientResponse, CONTEXT_PATH, getData, postData } from '../../data';

const PATH_CONFIG_TITLE = CONTEXT_PATH + 'config/title';
const PATH_CONFIG_COMPANY_INFO = CONTEXT_PATH + 'config/company-info';

const PATH_UI_TITLE = CONTEXT_PATH + 'ui/title';
const PATH_UI_COMPANY_INFO = CONTEXT_PATH + 'ui/company-info';

export interface UiState {
    title?: string,
    companyInfo?: CompanyInfo,
    changeTitle: (title: string) => Promise<ClientResponse<SingleValueBody<string>>>,
    changeCompanyInfo: (companyInfo: CompanyInfo) => Promise<ClientResponse<CompanyInfo>>
}

const uiStateContext = createContext<UiState | undefined>(undefined);

const UiStateProvider = ({children}: { children: ReactNode }) => {
    const configState = useConfigState();
    const authState = useAuthState();

    const [title, setTitle] = useState<string>();
    const [companyInfo, setCompanyInfo] = useState<CompanyInfo>();

    useEffect(() => {
        if (configState?.up) {
            const fetchTitle = async () => {
                const response = await getData<SingleValueBody<string>>(PATH_UI_TITLE);
                if (response.data) {
                    setTitle(response.data.value);
                }
            }
            fetchTitle().then();

            const fetchCompanyInfo = async () => {
                const response = await getData<CompanyInfo>(PATH_UI_COMPANY_INFO);
                if (response.data) {
                    setCompanyInfo(response.data);
                }
            }
            fetchCompanyInfo().then();
        }
    }, [configState?.up]);

    const changeTitle = async (title: string) => {
        const response = await postData<SingleValueBody<string>>(
            PATH_CONFIG_TITLE,
            {value: title},
            authState?.accessToken
        );

        if (response.data) {
            setTitle(response.data.value);
        }

        return response;
    }

    const changeCompanyInfo = async (companyInfo: CompanyInfo) => {
        const response = await postData<CompanyInfo>(
            PATH_CONFIG_COMPANY_INFO,
            companyInfo,
            authState?.accessToken
        );

        if (response.data) {
            setCompanyInfo(response.data);
        }

        return response;
    }

    return (
        <uiStateContext.Provider
            value={
                {
                    title,
                    companyInfo,
                    changeTitle,
                    changeCompanyInfo
                }
            }
        >{children}
        </uiStateContext.Provider>
    );
}

export default UiStateProvider;

export const useUiState = () => {
    return useContext(uiStateContext);
}
