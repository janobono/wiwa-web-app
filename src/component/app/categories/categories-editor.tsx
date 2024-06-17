import { useEffect, useState } from 'react';
import { Plus, Trash } from 'react-feather';

import CategoryTable from '../../category/category-table';
import SelectCodeListDialog from '../../code-list/select-code-list-dialog';
import WiwaButton from '../../ui/wiwa-button';
import { ClientResponse } from '../../../api/controller';
import { Category, CategoryField } from '../../../api/model';
import { DialogAnswer, DialogType } from '../../../model/ui';
import { useAuthState } from '../../../state/auth';
import { useDialogState } from '../../../state/dialog';
import { useResourceState } from '../../../state/resource';

const CATEGORIES_SELECT_CODE_LIST_DIALOG_ID = 'categories-select-code-list-dialog-001';

const CategoriesEditor = ({getCategories, setCategories}: {
    getCategories: () => Promise<ClientResponse<Category[]>>,
    setCategories: (categoryIds: number[], accessToken?: string) => Promise<ClientResponse<Category[]>>
}) => {
    const authState = useAuthState();
    const dialogState = useDialogState();
    const resourceState = useResourceState();

    const [busy, setBusy] = useState(false);
    const [data, setData] = useState<Category[]>();
    const [selected, setSelected] = useState<Category>();
    const [error, setError] = useState<string>();

    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        getCategories().then(data => setData(data?.data));
    }, [getCategories]);

    useEffect(() => {
        if (selected && data) {
            const index = data.findIndex(item => item.id === selected.id);
            if (index !== -1) {
                setSelected(data[index]);
            }
        } else {
            setSelected(undefined);
        }
    }, [data, selected]);

    const updateCategories = async (categories: Category[]) => {
        setError(undefined);
        setBusy(true);
        try {
            const response = await setCategories(categories.map(item => item.id), authState?.authToken?.accessToken);
            setData(response?.data);
            if (response?.error) {
                setError(resourceState?.manager?.categories.setCategoriesError);
            }
        } finally {
            setBusy(false);
        }
    }

    const addHandler = async (category: Category) => {
        if (data) {
            const newData = [...data, category];
            await updateCategories(newData);
        }
    }

    const deleteHandler = async (category: Category) => {
        if (data) {
            const newData = [...data];
            const index = newData.findIndex(item => item.id === category.id);
            if (index !== -1) {
                newData.splice(index, 1);
                await updateCategories(newData);
            }
        }
    }

    return (error ?
            <div className="flex  flex-col justify-center items-center w-full">
                <div className="font-mono text-xl">{error}</div>
            </div>
            :
            <>
                <div className="flex flex-row w-full items-center justify-center pb-5">
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
                                    title: resourceState?.manager?.categories.deleteCategoryQuestionTitle,
                                    message: resourceState?.manager?.categories.deleteCategoryQuestionMessage,
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
                    <CategoryTable
                        fields={Object.values(CategoryField)}
                        rows={data}
                        selected={selected}
                        setSelected={setSelected}
                    />
                </div>

                <SelectCodeListDialog
                    dialogId={CATEGORIES_SELECT_CODE_LIST_DIALOG_ID}
                    showDialog={showDialog}
                    setShowDialog={setShowDialog}
                    okHandler={(codeList) => {
                        addHandler(codeList).then();
                    }}
                />
            </>
    )
}

export default CategoriesEditor;
