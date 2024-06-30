import { Outlet } from 'react-router-dom';

import BoardProvider from '../../component/board/board-provider';

const BoardsBasePage = () => {
    return (
        <BoardProvider>
            <Outlet/>
        </BoardProvider>
    )
}

export default BoardsBasePage;
