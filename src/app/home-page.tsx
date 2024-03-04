import Navigation from '../component/layout/navigation';
import Footer from '../component/layout/footer';
import { useUiState } from '../component/state/ui-state-provider';
import WiwaMarkdownRenderer from '../component/ui/wiwa-markdown-renderer';

const HomePage = () => {
    const uiState = useUiState();

    return (
        <>
            <Navigation/>
            <main className="w-full bg-base text-base-content">
                <div className="container flex flex-col justify-center items-center gap-5 p-5 m-auto">
                    <WiwaMarkdownRenderer className="prose max-w-none" md={uiState?.welcomeText}/>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {uiState?.applicationInfo?.map((item, index) =>
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
