import { useContext, useEffect, useState } from 'react';
import { Edit } from 'react-feather';

import SelectCodeListDialog from '../code-lists/select-code-list-dialog';
import WiwaButton from '../../../ui/wiwa-button';
import { ClientResponse } from '../../../../api/controller';
import { Category } from '../../../../api/model';
import { AuthContext, CommonResourceContext, ErrorContext } from '../../../../context';

const CATEGORY_SELECT_CODE_LIST_DIALOG_ID = 'categories-select-code-lists-dialog-001';

const CategoryEditor = ({getCategory, setCategory}: {
    getCategory: (accessToken?: string) => Promise<ClientResponse<Category>>,
    setCategory: (categoryId: number, accessToken?: string) => Promise<ClientResponse<Category>>
}) => {
    const authState = useContext(AuthContext);
    const errorState = useContext(ErrorContext);
    const commonResourceState = useContext(CommonResourceContext);

    const [busy, setBusy] = useState(false);
    const [data, setData] = useState<Category>();

    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        getCategory(authState?.authToken?.accessToken).then(data => setData(data?.data));
    }, [authState?.authToken?.accessToken, getCategory]);

    const setHandler = async (category: Category) => {
        setBusy(true);
        try {
            const response = await setCategory(category.id, authState?.authToken?.accessToken);
            setData(response.data);
            errorState?.addError(response.error);
        } finally {
            setBusy(false);
        }
    }

    return (
        <>
            <div className="flex flex-row w-full items-center justify-center gap-5">
                {data &&
                    <div>{`${data?.code}:${data?.name}`}</div>
                }
                <WiwaButton
                    className="btn-primary join-item"
                    title={commonResourceState?.resource?.action.edit}
                    disabled={busy}
                    onClick={() => setShowDialog(true)}
                ><Edit size={18}/>
                </WiwaButton>
            </div>

            <SelectCodeListDialog
                dialogId={CATEGORY_SELECT_CODE_LIST_DIALOG_ID}
                showDialog={showDialog}
                setShowDialog={setShowDialog}
                okHandler={(codeList) => {
                    setHandler(codeList).then();
                }}
            />
        </>
    )
}

export default CategoryEditor;
