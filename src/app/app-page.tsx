import { Navigate, Route, Routes } from 'react-router-dom';

import HomePage from './home-page';
import NotFoundPage from './not-found-page';

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
import CodeListsBasePage from './manager/code-lists-base-page';
import CodeListsPage from './manager/code-lists/code-lists-page';
import CodeListItemsPage from './manager/code-lists/code-list-items-page';
import ProductConfigBasePage from './manager/product-config-base-page';
import ProductConfigPage from './manager/product-config/product-config-page';
import ProductCategoriesPage from './manager/product-config/product-categories-page';
import SearchItemsPage from './manager/product-config/search-items-page.tsx';
import ProductsBasePage from './manager/products-base-page';
import ProductsPage from './manager/products/products-page';
import ProductPage from './manager/products/product-page';
import ProductCategoryItemsPage from './manager/products/product-category-items-page';
import ProductImagesPage from './manager/products/product-images-page';
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
                <Route index element={<Navigate to="app-images" replace/>}/>
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
                <Route index element={<Navigate to="code-lists" replace/>}/>
                <Route path="code-lists" element={<CodeListsBasePage/>}>
                    <Route index element={<Navigate to="index" replace/>}/>
                    <Route path="index" element={<CodeListsPage/>}/>
                    <Route path=":codeListId/items" element={<CodeListItemsPage/>}/>
                </Route>
                <Route path="products" element={<ProductsBasePage/>}>
                    <Route index element={<Navigate to="index" replace/>}/>
                    <Route path="index" element={<ProductsPage/>}/>
                    <Route path=":productId/index" element={<ProductPage/>}/>
                    <Route path=":productId/category-items" element={<ProductCategoryItemsPage/>}/>
                    <Route path=":productId/images" element={<ProductImagesPage/>}/>
                    <Route path=":productId/unit-prices" element={<ProductUnitPricesPage/>}/>
                </Route>
                <Route path="product-config" element={<ProductConfigBasePage/>}>
                    <Route index element={<Navigate to="index" replace/>}/>
                    <Route path="index" element={<ProductConfigPage/>}/>
                    <Route path="product-categories" element={<ProductCategoriesPage/>}/>
                    <Route path="search-items" element={<SearchItemsPage/>}/>
                </Route>
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
