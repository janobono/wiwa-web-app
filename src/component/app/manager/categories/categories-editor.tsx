import { useContext, useEffect, useState } from 'react';
import { Plus, Trash } from 'react-feather';

import CategoryTable from './/category-table';
import SelectCodeListDialog from '../code-lists/select-code-list-dialog';
import WiwaButton from '../../../ui/wiwa-button';
import { ClientResponse } from '../../../../api/controller';
import { Category, CategoryField } from '../../../../api/model';
import { AuthContext, DialogContext, ErrorContext, ResourceContext } from '../../../../context';
import { DialogAnswer, DialogType } from '../../../../context/model/dialog';

const CATEGORIES_SELECT_CODE_LIST_DIALOG_ID = 'categories-select-code-lists-dialog-001';

const CategoriesEditor = ({getCategories, setCategories}: {
    getCategories: () => Promise<ClientResponse<Category[]>>,
    setCategories: (categoryIds: number[], accessToken?: string) => Promise<ClientResponse<Category[]>>
}) => {
    const authState = useContext(AuthContext);
    const dialogState = useContext(DialogContext);
    const errorState = useContext(ErrorContext);
    const resourceState = useContext(ResourceContext);

    const [busy, setBusy] = useState(false);
    const [data, setData] = useState<Category[]>();
    const [selected, setSelected] = useState<Category>();

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
        setBusy(true);
        try {
            const response = await setCategories(categories.map(item => item.id), authState?.authToken?.accessToken);
            setData(response?.data);
            errorState?.addError(response?.error);
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

    return (
        <>
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
