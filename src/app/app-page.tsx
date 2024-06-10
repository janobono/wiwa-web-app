import { Navigate, Route, Routes } from 'react-router-dom';

import HomePage from './home-page';
import MaintenancePage from './maintenance-page';
import NotFoundPage from './not-found-page';

import AdminPage from './admin/admin-page';
import AdminApplicationImagesPage from './admin/application-images-page.tsx';
import AdminBaseInfoPage from './admin/base-info-page';
import AdminCompanyInfoPage from './admin/company-info-page';
import AdminTextInfoPage from './admin/text-info-page.tsx';
import AdminMailFormatPage from './admin/mail-format-page';
import AdminOrderFormatPage from './admin/order-format-page';
import AdminUnitsPage from './admin/units-page';
import AdminUsersPage from './admin/users-page';

import AuthPage from './auth/auth-page';
import ChangeDetailsPage from './auth/change-details-page';
import ChangeEmailPage from './auth/change-email-page';
import ChangePasswordPage from './auth/change-password-page';
import ResendConfirmationPage from './auth/resend-confirmation-page';
import ResetPasswordPage from './auth/reset-password-page';
import SignInPage from './auth/sign-in-page';
import SignOutPage from './auth/sign-out-page';
import SignUpPage from './auth/sign-up-page';

import ManagerPage from './manager/manager-page';
import CodeListsBasePage from './manager/code-lists-base-page';
import CodeListsPage from './manager/code-lists/code-lists-page';
import CodeListItemsPage from './manager/code-lists/code-list-items-page';

import UiPage from './ui/ui-page';
import BusinessConditionsPage from './ui/business-conditions-page';
import ConfirmPage from './ui/confirm-page';
import ContactInfoPage from './ui/contact-info-page';
import CookiesInfoPage from './ui/cookies-info-page';
import GdprInfoPage from './ui/gdpr-info-page';
import OrderInfoPage from './ui/order-info-page';

const AppPage = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/admin" element={<AdminPage/>}>
                <Route index element={<Navigate to="application-images" replace/>}/>
                <Route path="application-images" element={<AdminApplicationImagesPage/>}/>
                <Route path="base-info" element={<AdminBaseInfoPage/>}/>
                <Route path="company-info" element={<AdminCompanyInfoPage/>}/>
                <Route path="mail-format" element={<AdminMailFormatPage/>}/>
                <Route path="order-format" element={<AdminOrderFormatPage/>}/>
                <Route path="text-info" element={<AdminTextInfoPage/>}/>
                <Route path="units" element={<AdminUnitsPage/>}/>
                <Route path="users" element={<AdminUsersPage/>}/>
            </Route>

            <Route path="/auth" element={<AuthPage/>}>
                <Route path="change-details" element={<ChangeDetailsPage/>}/>
                <Route path="change-email" element={<ChangeEmailPage/>}/>
                <Route path="change-password" element={<ChangePasswordPage/>}/>
                <Route path="resend-confirmation" element={<ResendConfirmationPage/>}/>
                <Route path="reset-password" element={<ResetPasswordPage/>}/>
                <Route path="sign-in" element={<SignInPage/>}/>
                <Route path="sign-out" element={<SignOutPage/>}/>
                <Route path="sign-up" element={<SignUpPage/>}/>
            </Route>

            <Route path="/manager" element={<ManagerPage/>}>
                <Route index element={<Navigate to="code-lists" replace/>}/>
                <Route path="code-lists" element={<CodeListsBasePage/>}>
                    <Route index element={<Navigate to="index" replace/>}/>
                    <Route path="index" element={<CodeListsPage/>}/>
                    <Route path=":codeListId/items" element={<CodeListItemsPage/>}/>
                </Route>
            </Route>

            <Route path="/ui" element={<UiPage/>}>
                <Route path="business-conditions" element={<BusinessConditionsPage/>}/>
                <Route path="confirm/:token" element={<ConfirmPage/>}/>
                <Route path="contact-info" element={<ContactInfoPage/>}/>
                <Route path="cookies-info" element={<CookiesInfoPage/>}/>
                <Route path="gdpr-info" element={<GdprInfoPage/>}/>
                <Route path="order-info" element={<OrderInfoPage/>}/>
            </Route>

            <Route path="/maintenance" element={<MaintenancePage/>}/>
            <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
    )
}

export default AppPage;
