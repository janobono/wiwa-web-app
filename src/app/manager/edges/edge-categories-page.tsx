import { useEffect, useState } from 'react';
import { Plus, Trash } from 'react-feather';

import { useEdgeState } from '../edges-base-page';
import { setEdgeCategoryItems } from '../../../api/controller/edge';
import { getEdgeCategories } from '../../../api/controller/ui';
import { CategoryItem, CategoryItemChange, CategoryItemField } from '../../../api/model';
import { CodeList, CodeListItem } from '../../../api/model/code-list';
import CategoryItemTable from '../../../component/category/category-item-table';
import SelectCodeListItemDialog from '../../../component/code-list/select-code-list-item-dialog';
import WiwaButton from '../../../component/ui/wiwa-button';
import { DialogAnswer, DialogType } from '../../../model/ui';
import { useAuthState } from '../../../state/auth';
import { useDialogState } from '../../../state/dialog';
import { useResourceState } from '../../../state/resource';

const EDGE_CATEGORIES_DIALOG_ID = 'edge-categories-dialog-001';

const EdgeCategoriesPage = () => {
    const authState = useAuthState();
    const dialogState = useDialogState();
    const resourceState = useResourceState();

    const edgeState = useEdgeState();

    const [codeLists, setCodeLists] = useState<CodeList[]>([]);

    const [busy, setBusy] = useState(false);
    const [data, setData] = useState<CategoryItem[]>();
    const [selected, setSelected] = useState<CategoryItem>();
    const [error, setError] = useState<string>();

    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        getEdgeCategories().then(data => {
            setCodeLists(data?.data || []);
        });
    }, []);

    useEffect(() => {
        if (edgeState?.selected) {
            setData([...edgeState.selected.categoryItems]);
        }
    }, [edgeState?.selected]);

    useEffect(() => {
        if (selected && data) {
            const index = data.findIndex(item => item.id === selected?.id);
            if (index !== -1) {
                setSelected(data[index]);
            }
        } else {
            setSelected(undefined);
        }
    }, [data, selected]);

    const submit = async (data: CategoryItemChange[]) => {
        setError(undefined);
        setBusy(true);
        try {
            const response = await setEdgeCategoryItems(edgeState?.selected?.id || -1, data, authState?.authToken?.accessToken);

            edgeState?.setSelected(response?.data);

            if (response?.error) {
                setError(resourceState?.manager?.edges.edgeCategories.error);
            }
        } finally {
            setBusy(false);
        }
    }

    const okHandler = async (codeListItem: CodeListItem) => {
        if (data) {
            const newData: CategoryItemChange[] = data.map(item => {
                return {categoryId: item.category.id, itemId: item.id};
            });
            newData.push({categoryId: codeListItem.codeListId, itemId: codeListItem.id});
            submit(newData).then();
        }
    }

    const deleteHandler = async (categoryItem: CategoryItem) => {
        if (data) {
            const newData = [...data]
            const index = newData.findIndex(item => item.id === categoryItem.id);
            if (index !== -1) {
                newData.splice(index, 1);
                submit(newData.map(item => {
                    return {categoryId: item.category.id, itemId: item.id};
                })).then();
            }
        }
    }

    return (error ?
            <div className="flex  flex-col justify-center items-center w-full">
                <div className="font-mono text-xl">{error}</div>
            </div>
            :
            <>
                <div className="flex flex-col p-5 w-full">
                    <div className="flex flex-col w-full items-center justify-center pb-5 gap-5">
                        <div className="join">
                            <WiwaButton
                                className="btn-primary join-item"
                                title={resourceState?.common?.action.add}
                                disabled={busy}
                                onClick={() => setShowDialog(true)}
                            ><Plus size={18}/>
                            </WiwaButton>

                            <WiwaButton
                                className="btn-accent join-item"
                                title={resourceState?.common?.action.delete}
                                disabled={busy || selected === undefined}
                                onClick={() => {
                                    dialogState?.showDialog({
                                        type: DialogType.YES_NO,
                                        title: resourceState?.manager?.edges.edgeCategories.deleteTitle,
                                        message: resourceState?.manager?.edges.edgeCategories.deleteMessage,
                                        callback: (answer: DialogAnswer) => {
                                            if (answer === DialogAnswer.YES) {
                                                if (selected) {
                                                    deleteHandler(selected).then();
                                                }
                                            }
                                        }
                                    });
                                }}
                            ><Trash size={18}/>
                            </WiwaButton>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <CategoryItemTable
                            fields={Object.values(CategoryItemField)}
                            rows={data}
                            selected={selected}
                            setSelected={setSelected}
                        />
                    </div>
                </div>

                <SelectCodeListItemDialog
                    dialogId={EDGE_CATEGORIES_DIALOG_ID}
                    codeLists={codeLists}
                    showDialog={showDialog}
                    setShowDialog={setShowDialog}
                    onSelectCodeListItem={okHandler}
                />
            </>
    )
}

export default EdgeCategoriesPage;
