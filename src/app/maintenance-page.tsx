import Footer from '../component/layout/footer';
import Navigation from '../component/layout/navigation';
import { useResourceState } from '../state/resource';

const MaintenancePage = () => {
    const resourceState = useResourceState();

    return (
        <>
            <Navigation/>
            <main className="w-full bg-base text-base-content">
                <div className="flex  flex-col justify-center items-center w-full">
                    <div className="font-mono text-xl">{resourceState?.common?.maintenance}</div>
                </div>
            </main>
            <Footer/>
        </>
    )
}

export default MaintenancePage;
