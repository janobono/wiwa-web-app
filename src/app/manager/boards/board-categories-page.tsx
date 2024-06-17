import { useParams } from 'react-router-dom';

const BoardCategoriesPage = () => {
    const {boardId} = useParams();

    return (
        <>
            {boardId}
        </>
    )
}

export default BoardCategoriesPage;
