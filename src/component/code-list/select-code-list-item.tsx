import { useEffect, useState } from 'react';

import WiwaButton from '../ui/wiwa-button';
import WiwaSpinner from '../ui/wiwa-spinner';
import { CodeListItem, CodeListItemField } from '../../api/model/code-list';
import { useResourceState } from '../../state/resource';
import { useCodeListState } from '../../state/code-list';
import { useCodeListItemState } from '../../state/code-list-item';

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
    const resourceState = useResourceState();
    const codeListState = useCodeListState();
    const codeListItemState = useCodeListItemState();

    const [home, setHome] = useState<{ name: string, item?: CodeListItem }>();
    const [menu, setMenu] = useState<CodeListItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>();

    useEffect(() => {
        const fetchHome = async () => {
            if (codeListItemId) {
                const response = await codeListItemState?.getCodeListItem(codeListItemId);
                if (response?.data) {
                    setHome({name: response.data.value, item: response.data});
                }
            } else {
                const response = await codeListState?.getCodeList(codeListId);
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
        setError(undefined);
        setLoading(true);
        try {
            const response = await codeListItemState?.getCodeListItems({codeListId, parentId}, {
                page: 0,
                size: 10000,
                sort: {
                    field: CodeListItemField.sortNum,
                    asc: true
                }
            });
            if (response?.error) {
                setError(resourceState?.common?.error.unknown);
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
                        {codeListItemState?.data?.map(item =>
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
