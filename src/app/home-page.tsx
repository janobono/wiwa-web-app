import { useEffect, useState } from 'react';

import Navigation from '../component/layout/navigation';
import Footer from '../component/layout/footer';
import { useConfigState } from '../component/state/config-state-provider';
import WiwaMarkdownRenderer from '../component/ui/wiwa-markdown-renderer';
import { ApplicationInfo, SingleValueBody } from '../model/service';
import { CONTEXT_PATH, getData } from '../data';

const PATH_UI_WELCOME_TEXT = CONTEXT_PATH + 'ui/welcome-text';
const PATH_UI_APPLICATION_INFO = CONTEXT_PATH + 'ui/application-info';

const HomePage = () => {
    const configState = useConfigState();

    const [welcomeText, setWelcomeText] = useState<string>();
    const [applicationInfo, setApplicationInfo] = useState<ApplicationInfo>();

    useEffect(() => {
        if (configState?.up) {
            const fetchWelcomeText = async () => {
                const response = await getData<SingleValueBody<string>>(PATH_UI_WELCOME_TEXT);
                if (response.data) {
                    setWelcomeText(response.data.value);
                }
            }
            fetchWelcomeText().then();

            const fetchApplicationInfo = async () => {
                const response = await getData<ApplicationInfo>(PATH_UI_APPLICATION_INFO);
                if (response.data) {
                    setApplicationInfo(response.data);
                }
            }
            fetchApplicationInfo().then();
        }
    }, [configState?.up]);

    return (
        <>
            <Navigation/>
            <main className="w-full bg-base text-base-content">
                <div className="container flex flex-col justify-center items-center gap-5 p-5 m-auto">
                    <WiwaMarkdownRenderer className="prose max-w-none" md={welcomeText}/>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {applicationInfo ?
                            applicationInfo.items.map(
                                (item, index) =>
                                    <WiwaMarkdownRenderer className="prose prose-sm" key={index} md={item}/>
                            )
                            : <></>
                        }
                    </div>
                </div>
            </main>
            <Footer/>
        </>
    )
}

export default HomePage;
