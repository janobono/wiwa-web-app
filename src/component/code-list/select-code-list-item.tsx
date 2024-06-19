import { useEffect, useState } from 'react';

import WiwaButton from '../ui/wiwa-button';
import WiwaSpinner from '../ui/wiwa-spinner';
import { getCodeList } from '../../api/controller/code-list';
import { getCodeListItem, getCodeListItems } from '../../api/controller/code-list-item';
import { CodeListItem, CodeListItemField } from '../../api/model/code-list';
import { useAuthState } from '../../state/auth';
import { useErrorState } from '../../state/error';

const SelectCodeListItem = (
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
    const errorState = useErrorState();

    const [busy, setBusy] = useState(true);
    const [data, setData] = useState<CodeListItem[]>();

    const [home, setHome] = useState<{ name: string, item?: CodeListItem }>();
    const [menu, setMenu] = useState<CodeListItem[]>([]);

    useEffect(() => {
        const fetchHome = async () => {
            if (codeListItemId) {
                const response = await getCodeListItem(codeListItemId, authState?.authToken?.accessToken);
                if (response?.data) {
                    setHome({name: response.data.value, item: response.data});
                }
            } else {
                const response = await getCodeList(codeListId, authState?.authToken?.accessToken);
                if (response?.data) {
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
        setBusy(true);
        try {
            const response = await getCodeListItems(
                {
                    codeListId,
                    root: !parentId,
                    parentId
                },
                {
                    page: 0,
                    size: 10000,
                    sort: {
                        field: CodeListItemField.sortNum,
                        asc: true
                    }
                },
                authState?.authToken?.accessToken
            );
            setData(response?.data?.content);
            errorState?.addError(response?.error);
        } finally {
            setBusy(false);
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

    return (busy ?
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
                    {data?.map(item =>
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

export default SelectCodeListItem;
