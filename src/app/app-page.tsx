import { Route, Routes } from 'react-router-dom';

import HomePage from './home-page';
import NotFoundPage from './not-found-page.tsx';

import AdminPage from './admin/admin-page';
import AppImagesPage from './admin/app-images-page';
import AppInfoPage from './admin/app-info-page';
import BaseInfoPage from './admin/base-info-page';
import AdminBusinessConditionsPage from './admin/business-conditions-page';
import AdminCompanyInfoPage from './admin/company-info-page';
import AdminCookiesInfoPage from './admin/cookies-info-page';
import AdminGdprInfoPage from './admin/gdpr-info-page';
import UnitsPage from './admin/units-page';
import UsersPage from './admin/users-page';
import WorkingHoursPage from './admin/working-hours-page';

import AuthPage from './auth/auth-page';
import ChangeDetailsPage from './auth/change-details-page';
import ChangeEmailPage from './auth/change-email-page';
import ChangePasswordPage from './auth/change-password-page';
import ResetPasswordPage from './auth/reset-password-page';
import SignInPage from './auth/sign-in-page';
import SignOutPage from './auth/sign-out-page';
import SignUpPage from './auth/sign-up-page';

import ManagerPage from './manager/manager-page';
import CodeListsPage from './manager/code-lists-page';
import CodeListItemsPage from './manager/code-lists/code-list-items-page';
import ProductConfigPage from './manager/product-config-page';
import ProductCategoriesPage from './manager/product-config/product-categories-page';
import ProductsPage from './manager/products-page';
import ProductImagesPage from './manager/products/product-images-page';
import ProductPage from './manager/products/product-page';
import ProductCodeListItemsPage from './manager/products/product-code-list-items';
import ProductUnitPricesPage from './manager/products/product-unit-prices-page';

import UiPage from './ui/ui-page';
import BusinessConditionsPage from './ui/business-conditions-page';
import ConfirmPage from './ui/confirm-page';
import ContactInfoPage from './ui/contact-info-page';
import CookiesInfoPage from './ui/cookies-info-page';
import GdprInfoPage from './ui/gdpr-info-page';

const AppPage = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/admin" element={<AdminPage/>}>
                <Route path="app-images" element={<AppImagesPage/>}/>
                <Route path="app-info" element={<AppInfoPage/>}/>
                <Route path="base-info" element={<BaseInfoPage/>}/>
                <Route path="business-conditions" element={<AdminBusinessConditionsPage/>}/>
                <Route path="company-info" element={<AdminCompanyInfoPage/>}/>
                <Route path="cookies-info" element={<AdminCookiesInfoPage/>}/>
                <Route path="gdpr-info" element={<AdminGdprInfoPage/>}/>
                <Route path="units" element={<UnitsPage/>}/>
                <Route path="users" element={<UsersPage/>}/>
                <Route path="working-hours" element={<WorkingHoursPage/>}/>
            </Route>

            <Route path="/auth" element={<AuthPage/>}>
                <Route path="change-details" element={<ChangeDetailsPage/>}/>
                <Route path="change-email" element={<ChangeEmailPage/>}/>
                <Route path="change-password" element={<ChangePasswordPage/>}/>
                <Route path="reset-password" element={<ResetPasswordPage/>}/>
                <Route path="sign-in" element={<SignInPage/>}/>
                <Route path="sign-out" element={<SignOutPage/>}/>
                <Route path="sign-up" element={<SignUpPage/>}/>
            </Route>

            <Route path="/manager" element={<ManagerPage/>}>
                <Route path="code-lists" element={<CodeListsPage/>}/>
                <Route path="code-lists/:codeListId/items" element={<CodeListItemsPage/>}/>
                <Route path="product-config" element={<ProductConfigPage/>}/>
                <Route path="product-config/product-categories" element={<ProductCategoriesPage/>}/>
                <Route path="products" element={<ProductsPage/>}/>
                <Route path="products/:productId" element={<ProductPage/>}/>
                <Route path="products/:productId/code-list-items" element={<ProductCodeListItemsPage/>}/>
                <Route path="products/:productId/images" element={<ProductImagesPage/>}/>
                <Route path="products/:productId/unit-prices" element={<ProductUnitPricesPage/>}/>
            </Route>

            <Route path="/ui" element={<UiPage/>}>
                <Route path="business-conditions" element={<BusinessConditionsPage/>}/>
                <Route path="confirm/:token" element={<ConfirmPage/>}/>
                <Route path="contact-info" element={<ContactInfoPage/>}/>
                <Route path="cookies-info" element={<CookiesInfoPage/>}/>
                <Route path="gdpr-info" element={<GdprInfoPage/>}/>
            </Route>

            <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
    )
}

export default AppPage;
