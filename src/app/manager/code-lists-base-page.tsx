import { Outlet } from 'react-router-dom';

import CodeListStateProvider from '../../state/code-list';
import CodeListItemStateProvider from '../../state/code-list-item';

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
