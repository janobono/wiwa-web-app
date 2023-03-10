import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { RESOURCE } from './locale';
import {
    hasCustomerAuthority,
    hasEmployeeAuthority,
    hasManagerAuthority,
    useActuatorState,
    useAuthState,
    useUiState
} from './state';

import { Layout } from './component/layout';

import { HomePage, NotFoundPage } from './component/page';
import { ConfirmPage, ResetPasswordPage, SignInPage, SignUpPage, UserAccountPage } from './component/page/auth';
import {
    ApplicationImagesConfigPage,
    CompanyInfoConfigPage,
    ConfigPage,
    CookiesInfoConfigPage,
    GdprInfoConfigPage,
    UiConfigPage,
    WorkingHoursConfigPage
} from './component/page/config';
import { ContactInfoPage, CookiesInfoPage, GdprInfoPage } from './component/page/ui';
import { UsersPage } from './component/page/users';

import { WiwaSpinner } from './component/ui';

const App: React.FC = () => {
    const {t} = useTranslation();
    const actuatorState = useActuatorState();
    const authState = useAuthState();
    const uiState = useUiState();

    useEffect(() => {
        document.title = uiState?.title ? uiState.title : t(RESOURCE.TITLE)
    }, [uiState?.title]);

    return (
        actuatorState?.up ?
            <BrowserRouter>
                <Layout>
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/auth">
                            <Route path="confirm/:token" element={<ConfirmPage/>}/>
                            <Route path="reset-password" element={<ResetPasswordPage/>}/>
                            <Route path="sign-in" element={<SignInPage/>}/>
                            <Route path="sign-up" element={<SignUpPage/>}/>
                            <Route path="user-account" element={<UserAccountPage/>}/>
                        </Route>
                        <Route path="/ui">
                            <Route path="contact-info" element={<ContactInfoPage/>}/>
                            <Route path="cookies-info" element={<CookiesInfoPage/>}/>
                            <Route path="gdpr-info" element={<GdprInfoPage/>}/>
                        </Route>
                        {hasManagerAuthority(authState?.user) &&
                            <>
                                <Route path="/config" element={<ConfigPage/>}>
                                    <Route path="application-images" element={<ApplicationImagesConfigPage/>}/>
                                    <Route path="ui" element={<UiConfigPage/>}/>
                                    <Route path="company-info" element={<CompanyInfoConfigPage/>}/>
                                    <Route path="cookies-info" element={<CookiesInfoConfigPage/>}/>
                                    <Route path="gdpr-info" element={<GdprInfoConfigPage/>}/>
                                    <Route path="working-hours" element={<WorkingHoursConfigPage/>}/>
                                </Route>
                                <Route path="/users" element={<UsersPage/>}/>
                            </>
                        }
                        {hasEmployeeAuthority(authState?.user) &&
                            <></>
                        }
                        {hasCustomerAuthority(authState?.user) &&
                            <></>
                        }
                        <Route path="*" element={<NotFoundPage/>}/>
                    </Routes>
                </Layout>
            </BrowserRouter>
            :
            <div className="flex gap-5 w-full h-screen items-center justify-center">
                <WiwaSpinner/>
                <div>{t(RESOURCE.CONNECTING)}</div>
            </div>
    );
}

export default App;
