import { Outlet } from 'react-router-dom';

import CodeListStateProvider from '../../component/state/code-list-state-provider.tsx';
import CodeListItemStateProvider from '../../component/state/code-list-item-state-provider.tsx';

const CodeListsBasePage = () => {
    return (
        <CodeListStateProvider>
            <CodeListItemStateProvider>
                <Outlet/>
            </CodeListItemStateProvider>
        </CodeListStateProvider>
    )
}

export default CodeListsBasePage;
