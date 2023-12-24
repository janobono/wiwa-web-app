import { useEffect, useState } from 'react';

import { useAuthState } from '../state/auth-state-provider';
import { useResourceState } from '../state/resource-state-provider';
import WiwaButton from '../ui/wiwa-button';
import WiwaSpinner from '../ui/wiwa-spinner';
import { CodeList, CodeListItem, Page } from '../../model/service';
import { CONTEXT_PATH, getData, setQueryParam } from '../../data';

const PATH_CODE_LISTS = CONTEXT_PATH + 'code-lists';

const WiwaSelectCodeListItem = (
    {
        codeListId,
        codeListItemId,
        itemSelectedHandler
    }: {
        codeListId: number,
        codeListItemId?: number,
        itemSelectedHandler: (item?: CodeListItem) => void
    }) => {
    const authState = useAuthState();
    const resourceState = useResourceState();

    const [home, setHome] = useState<{ name: string, item?: CodeListItem }>();
    const [menu, setMenu] = useState<CodeListItem[]>([]);
    const [data, setData] = useState<CodeListItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>();

    useEffect(() => {
        const fetchHome = async () => {
            if (codeListItemId) {
                const response = await getData<CodeListItem>(
                    PATH_CODE_LISTS + '/items/' + codeListItemId,
                    undefined,
                    authState?.accessToken || ''
                );
                if (response.data) {
                    setHome({name: response.data.value, item: response.data});
                }
            } else {
                const response = await getData<CodeList>(
                    PATH_CODE_LISTS + '/' + codeListId,
                    undefined,
                    authState?.accessToken || ''
                );
                if (response.data) {
                    setHome({name: response.data.name});
                }
            }
        }
        fetchHome().then();
    }, [codeListId, codeListItemId]);

    useEffect(() => {
        if (home) {
            fetchData(home.item?.id).then();
        }
    }, [home]);

    const fetchData = async (parentId?: number) => {
        setError(undefined);
        setLoading(true);
        try {
            if (authState?.accessToken !== undefined) {
                const queryParams = new URLSearchParams();
                if (parentId) {
                    setQueryParam(queryParams, 'parent-id', parentId);
                } else {
                    setQueryParam(queryParams, 'root', 'true');
                }
                const response = await getData<Page<CodeListItem>>(
                    PATH_CODE_LISTS + '/items',
                    queryParams,
                    authState?.accessToken || ''
                );

                if (response.error) {
                    setError(resourceState?.common?.error.unknown);
                } else if (response.data) {
                    setData(response.data.content);
                }
            }
        } finally {
            setLoading(false);
        }
    }

    const menuHandler = (id?: number) => {
        if (id) {
            const newMenu = [...menu];
            const index = newMenu.findIndex(item => item.id === id);
            newMenu.splice(index + 1);
            setMenu(newMenu);
            itemSelectedHandler(newMenu[index])
        } else {
            setMenu([]);
            itemSelectedHandler(undefined);
        }
        fetchData(id).then();
    }

    const selectItemHandler = (item: CodeListItem) => {
        setMenu([...menu, item]);
        fetchData(item.id).then();
        itemSelectedHandler(item);
    }

    return (error ?
            <div className="flex  flex-col justify-center items-center w-full">
                <div className="font-mono text-xl">{error}</div>
            </div>
            :
            loading ?
                <WiwaSpinner/>
                :
                <>
                    <div className="text-sm breadcrumbs">
                        <ul>
                            {home &&
                                <li>
                                    <a onClick={() => menuHandler(undefined)}>
                                        {home.name}
                                    </a>
                                </li>
                            }
                            {menu.map(item =>
                                <li key={item.id}>
                                    <a onClick={() => menuHandler(item.id)}>
                                        {item.value}
                                    </a>
                                </li>
                            )}
                        </ul>
                    </div>
                    <div className="w-full flex flex-row">
                        {data.map(item =>
                            <WiwaButton
                                className="btn-ghost"
                                key={item.id}
                                onClick={() => selectItemHandler(item)}
                            >
                                {item.value}
                            </WiwaButton>
                        )}
                    </div>
                </>
    )
}

export default WiwaSelectCodeListItem;
