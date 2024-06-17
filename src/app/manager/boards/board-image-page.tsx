import { useParams } from 'react-router-dom';

const BoardImagePage = () => {
    const {boardId} = useParams();

    return (
        <>
            {boardId}
        </>
    )
}

export default BoardImagePage;
