import React from 'react';
import { Footer, Header, Navigation } from './index';

const Layout: React.FC<any> = ({children}) => (
    <>
        <Header/>
        <Navigation/>
        {children}
        <Footer/>
    </>
);

export default Layout;
