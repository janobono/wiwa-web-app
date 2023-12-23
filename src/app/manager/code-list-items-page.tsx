import { useParams } from 'react-router-dom';

const CodeListItemsPage = () => {
    const {codeListId} = useParams();


    return (
        <>
            <div>{codeListId}</div>
        </>
    )
}

export default CodeListItemsPage;
