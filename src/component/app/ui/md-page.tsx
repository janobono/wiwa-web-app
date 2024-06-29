import { useEffect, useState } from 'react';

import { ClientResponse } from '../../../api/controller';
import { SingleValueBody } from '../../../api/model';
import WiwaMarkdownRenderer from '../../../component/ui/wiwa-markdown-renderer';

const MdPage = ({getData}: { getData: () => Promise<ClientResponse<SingleValueBody<string>>> }) => {

    const [data, setData] = useState('');

    useEffect(() => {
        getData().then(data => setData(data.data?.value || ''));
    }, [getData]);

    return (
        <WiwaMarkdownRenderer className="prose container p-5 mx-auto" md={data}/>
    )
}

export default MdPage;
