import { useEffect, useState } from 'react';
import { Edit } from 'react-feather';

import SelectCodeListDialog from '../code-list/select-code-list-dialog';
import WiwaButton from '../ui/wiwa-button';
import { ClientResponse } from '../../api/controller';
import { Category } from '../../api/model';
import { useAuthState } from '../../state/auth';
import { useResourceState } from '../../state/resource';

const CATEGORY_SELECT_CODE_LIST_DIALOG_ID = 'category-select-code-list-dialog-001';

const CategoryEditor = ({getCategory, setCategory}: {
    getCategory: (accessToken?: string) => Promise<ClientResponse<Category>>,
    setCategory: (categoryId: number, accessToken?: string) => Promise<ClientResponse<Category>>
}) => {
    const authState = useAuthState();
    const resourceState = useResourceState();

    const [busy, setBusy] = useState(false);
    const [data, setData] = useState<Category>();
    const [error, setError] = useState<string>();

    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        getCategory(authState?.authToken?.accessToken).then(data => setData(data?.data));
    }, [authState?.authToken?.accessToken, getCategory]);

    const setHandler = async (category: Category) => {
        setError(undefined);
        setBusy(true);
        try {
            const response = await setCategory(category.id, authState?.authToken?.accessToken);
            setData(response.data);

            if (response?.error) {
                setError(resourceState?.manager?.categories.setCategoryError);
            }
        } finally {
            setBusy(false);
        }
    }

    return (error ?
            <div className="flex  flex-col justify-center items-center w-full">
                <div className="font-mono text-xl">{error}</div>
            </div>
            :
            <>
                <div className="flex flex-row w-full items-center justify-center gap-5">
                    {data &&
                        <div>{`${data?.code}:${data?.name}`}</div>
                    }
                    <WiwaButton
                        className="btn-primary join-item"
                        title={resourceState?.common?.action.edit}
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
