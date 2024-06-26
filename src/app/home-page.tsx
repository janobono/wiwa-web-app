import { useEffect, useState } from 'react';

import { getApplicationInfo, getWelcomeText } from '../api/controller/ui';
import Footer from '../component/layout/footer';
import Navigation from '../component/layout/navigation';
import WiwaMarkdownRenderer from '../component/ui/wiwa-markdown-renderer';

const HomePage = () => {

    const [welcomeText, setWelcomeText] = useState('');
    const [applicationInfo, setApplicationInfo] = useState<string[]>([]);

    useEffect(() => {
        getWelcomeText().then(data => setWelcomeText(data.data?.value || ''));
        getApplicationInfo().then(data => setApplicationInfo(data.data || []));
    }, []);

    return (
        <>
            <Navigation/>
            <main className="w-full bg-base text-base-content">
                <div className="container flex flex-col justify-center items-center gap-5 p-5 m-auto">
                    <WiwaMarkdownRenderer className="prose max-w-none" md={welcomeText}/>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {applicationInfo?.map((item, index) =>
                            <WiwaMarkdownRenderer className="prose prose-sm" key={index} md={item}/>
                        )}
                    </div>
                </div>
            </main>
            <Footer/>
        </>
    )
}

export default HomePage;
