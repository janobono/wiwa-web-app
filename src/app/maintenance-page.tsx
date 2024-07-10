import { useContext } from 'react';

import Footer from '../component/layout/footer';
import Navigation from '../component/layout/navigation';
import { CommonResourceContext } from '../context';

const MaintenancePage = () => {
    const commonResourceState = useContext(CommonResourceContext);

    return (
        <>
            <Navigation/>
            <main className="w-full bg-base text-base-content">
                <div className="flex  flex-col justify-center items-center w-full">
                    <div className="font-mono text-xl">{commonResourceState?.resource?.maintenance}</div>
                </div>
            </main>
            <Footer/>
        </>
    )
}

export default MaintenancePage;
