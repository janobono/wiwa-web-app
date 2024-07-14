import { ChevronsRight, ChevronsUp } from 'react-feather';

const BoardStructure = ({rotate}: { rotate: boolean }) => {
    return (
        <>
            {rotate ?
                <ChevronsUp size={28}/>
                :
                <ChevronsRight size={28}/>
            }
        </>
    )
}

export default BoardStructure;
