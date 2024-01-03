import { useUiState } from '../../component/state/ui-state-provider';
import WiwaMarkdownRenderer from '../../component/ui/wiwa-markdown-renderer';

const CookiesInfoPage = () => {
    const uiState = useUiState();

    return (
        <WiwaMarkdownRenderer className="prose container p-5 mx-auto" md={uiState?.cookiesInfo}/>
    )
}

export default CookiesInfoPage;
