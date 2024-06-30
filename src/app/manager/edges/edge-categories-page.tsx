import { useContext, useEffect, useState } from 'react';
import { Plus, Trash } from 'react-feather';

import { getEdgeCategories } from '../../../api/controller/ui';
import { CategoryItem, CategoryItemChange, CategoryItemField } from '../../../api/model';
import { CodeList, CodeListItem } from '../../../api/model/code-list';
import CategoryItemTable from '../../../component/app/manager/categories/category-item-table';
import SelectCodeListItemDialog from '../../../component/app/manager/code-lists/select-code-list-item-dialog';
import { EdgeContext } from '../../../component/edge/edge-provider';
import WiwaBreadcrumb from '../../../component/ui/wiwa-breadcrumb';
import WiwaButton from '../../../component/ui/wiwa-button';
import { DialogContext, ResourceContext } from '../../../context';
import { DialogAnswer, DialogType } from '../../../context/model/dialog';

const EDGE_CATEGORIES_DIALOG_ID = 'edge-categories-dialog-001';

const EdgeCategoriesPage = () => {
    const dialogState = useContext(DialogContext);
    const resourceState = useContext(ResourceContext);
    const edgeState = useContext(EdgeContext);

    const [codeLists, setCodeLists] = useState<CodeList[]>([]);
    const [data, setData] = useState<CategoryItem[]>();
    const [selected, setSelected] = useState<CategoryItem>();
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

    const okHandler = async (codeListItem: CodeListItem) => {
        if (data) {
            const newData: CategoryItemChange[] = data.map(item => {
                return {categoryId: item.category.id, itemId: item.id};
            });
            newData.push({categoryId: codeListItem.codeListId, itemId: codeListItem.id});
            edgeState?.setEdgeCategoryItems(newData).then();
        }
    }

    const deleteHandler = async (categoryItem: CategoryItem) => {
        if (data) {
            const newData = [...data]
            const index = newData.findIndex(item => item.id === categoryItem.id);
            if (index !== -1) {
                newData.splice(index, 1);
                edgeState?.setEdgeCategoryItems(newData.map(item => {
                    return {categoryId: item.category.id, itemId: item.id};
                })).then();
            }
        }
    }

    return (
        <>
            <WiwaBreadcrumb breadcrumbs={[
                {key: 0, label: resourceState?.common?.navigation.managerNav.title || ''},
                {
                    key: 1,
                    label: resourceState?.common?.navigation.managerNav.edges || '',
                    to: '/manager/edges'
                },
                {
                    key: 2,
                    label: resourceState?.common?.navigation.managerNav.edgeCategories || '',
                    to: '/manager/edges/categories'
                }
            ]}/>
            <div className="flex flex-col gap-5 p-5 w-full">
                <div className="join">
                    <WiwaButton
                        className="btn-primary join-item"
                        title={resourceState?.common?.action.add}
                        disabled={edgeState?.busy || !edgeState?.editEnabled}
                        onClick={() => setShowDialog(true)}
                    ><Plus size={18}/>
                    </WiwaButton>

                    <WiwaButton
                        className="btn-accent join-item"
                        title={resourceState?.common?.action.delete}
                        disabled={edgeState?.busy || !edgeState?.editEnabled}
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
