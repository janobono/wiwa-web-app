import { Navigate, Route, Routes } from 'react-router-dom';

import HomePage from './home-page';
import MaintenancePage from './maintenance-page';
import NotFoundPage from './not-found-page';

import AdminPage from './admin/admin-page';
import AdminApplicationImagesPage from './admin/application-images-page';
import AdminBaseInfoPage from './admin/base-info-page';
import AdminCompanyInfoPage from './admin/company-info-page';
import AdminTextInfoPage from './admin/text-info-page';
import AdminMailFormatPage from './admin/mail-format-page';
import AdminOrderFormatPage from './admin/order-format-page';
import AdminUnitsPage from './admin/units-page';
import AdminUsersPage from './admin/users-page';

import AuthPage from './auth/auth-page';
import AuthChangeDetailsPage from './auth/change-details-page';
import AuthChangeEmailPage from './auth/change-email-page';
import AuthChangePasswordPage from './auth/change-password-page';
import AuthResendConfirmationPage from './auth/resend-confirmation-page';
import AuthResetPasswordPage from './auth/reset-password-page';
import AuthSignInPage from './auth/sign-in-page';
import AuthSignOutPage from './auth/sign-out-page';
import AuthSignUpPage from './auth/sign-up-page';

import CustomerPage from './customer/customer-page';
import CustomerOrdersPage from './customer/orders-page';
import CustomerOrderCommentsPage from './customer/order-comments-page';
import CustomerOrderDetailPage from './customer/order-detail-page';
import CustomerOrderEditPage from './customer/order-edit-page';
import CustomerOrderItemEditPage from './customer/order-item-edit-page';
import CustomerOrderSubmitPage from './customer/order-submit-page';

import EmployeePage from './employee/employee-page';
import EmployeeOrdersPage from './employee/orders-page';

import ManagerPage from './manager/manager-page';
import ManagerCodeListsBasePage from './manager/code-lists-base-page';
import ManagerCodeListsPage from './manager/code-lists/code-lists-page';
import ManagerCodeListItemsPage from './manager/code-lists/code-list-items-page';
import ManagerCategoriesPage from './manager/categories-page';
import ManagerBoardsBasePage from './manager/boards-base-page';
import ManagerBoardsPage from './manager/boards/boards-page';
import ManagerBoardCategoriesPage from './manager/boards/board-categories-page';
import ManagerBoardImagePage from './manager/boards/board-image-page';
import ManagerEdgesBasePage from './manager/edges-base-page';
import ManagerEdgesPage from './manager/edges/edges-page';
import ManagerEdgeCategoriesPage from './manager/edges/edge-categories-page';
import ManagerEdgeImagePage from './manager/edges/edge-image-page';
import ManagerOrderInputsPage from './manager/order-inputs-page';
import ManagerOrdersBasePage from './manager/orders-base-page';
import ManagerOrdersPage from './manager/orders/orders-page';

import UiPage from './ui/ui-page';
import UiBusinessConditionsPage from './ui/business-conditions-page';
import UiConfirmPage from './ui/confirm-page';
import UiContactInfoPage from './ui/contact-info-page';
import UiCookiesInfoPage from './ui/cookies-info-page';
import UiGdprInfoPage from './ui/gdpr-info-page';
import UiOrderInfoPage from './ui/order-info-page';

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
                <Route path="change-details" element={<AuthChangeDetailsPage/>}/>
                <Route path="change-email" element={<AuthChangeEmailPage/>}/>
                <Route path="change-password" element={<AuthChangePasswordPage/>}/>
                <Route path="resend-confirmation" element={<AuthResendConfirmationPage/>}/>
                <Route path="reset-password" element={<AuthResetPasswordPage/>}/>
                <Route path="sign-in" element={<AuthSignInPage/>}/>
                <Route path="sign-out" element={<AuthSignOutPage/>}/>
                <Route path="sign-up" element={<AuthSignUpPage/>}/>
            </Route>

            <Route path="/customer" element={<CustomerPage/>}>
                <Route index element={<Navigate to="index" replace/>}/>
                <Route path="index" element={<CustomerOrdersPage/>}/>
                <Route path="order-comments" element={<CustomerOrderCommentsPage/>}/>
                <Route path="order-detail" element={<CustomerOrderDetailPage/>}/>
                <Route path="order-edit" element={<CustomerOrderEditPage/>}/>
                <Route path="order-item-edit" element={<CustomerOrderItemEditPage/>}/>
                <Route path="order-submit" element={<CustomerOrderSubmitPage/>}/>
            </Route>

            <Route path="/employee" element={<EmployeePage/>}>
                <Route index element={<Navigate to="index" replace/>}/>
                <Route path="index" element={<EmployeeOrdersPage/>}/>
            </Route>

            <Route path="/manager" element={<ManagerPage/>}>
                <Route index element={<Navigate to="orders" replace/>}/>
                <Route path="code-lists" element={<ManagerCodeListsBasePage/>}>
                    <Route index element={<Navigate to="index" replace/>}/>
                    <Route path="index" element={<ManagerCodeListsPage/>}/>
                    <Route path=":codeListId/items" element={<ManagerCodeListItemsPage/>}/>
                </Route>
                <Route path="categories" element={<ManagerCategoriesPage/>}/>
                <Route path="boards" element={<ManagerBoardsBasePage/>}>
                    <Route index element={<Navigate to="index" replace/>}/>
                    <Route path="index" element={<ManagerBoardsPage/>}/>
                    <Route path="categories" element={<ManagerBoardCategoriesPage/>}/>
                    <Route path="image" element={<ManagerBoardImagePage/>}/>
                </Route>
                <Route path="edges" element={<ManagerEdgesBasePage/>}>
                    <Route index element={<Navigate to="index" replace/>}/>
                    <Route path="index" element={<ManagerEdgesPage/>}/>
                    <Route path="categories" element={<ManagerEdgeCategoriesPage/>}/>
                    <Route path="image" element={<ManagerEdgeImagePage/>}/>
                </Route>
                <Route path="order-inputs" element={<ManagerOrderInputsPage/>}/>
                <Route path="orders" element={<ManagerOrdersBasePage/>}>
                    <Route index element={<Navigate to="index" replace/>}/>
                    <Route path="index" element={<ManagerOrdersPage/>}/>
                </Route>
            </Route>

            <Route path="/ui" element={<UiPage/>}>
                <Route path="business-conditions" element={<UiBusinessConditionsPage/>}/>
                <Route path="confirm/:token" element={<UiConfirmPage/>}/>
                <Route path="contact-info" element={<UiContactInfoPage/>}/>
                <Route path="cookies-info" element={<UiCookiesInfoPage/>}/>
                <Route path="gdpr-info" element={<UiGdprInfoPage/>}/>
                <Route path="order-info" element={<UiOrderInfoPage/>}/>
            </Route>

            <Route path="/maintenance" element={<MaintenancePage/>}/>
            <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
    )
}

export default AppPage;
