import { Outlet } from 'react-router-dom';

import EdgeProvider from '../../component/edge/edge-provider';

const EdgesBasePage = () => {
    return (
        <EdgeProvider>
            <Outlet/>
        </EdgeProvider>
    )
}

export default EdgesBasePage;
