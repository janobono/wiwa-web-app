import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Edit } from 'react-feather';

import { Entry } from '../../../api/model';
import BaseDialog from '../../dialog/base-dialog';
import WiwaFormInputString from '../../ui/wiwa-form-input-string';
import WiwaButton from '../../ui/wiwa-button';
import { useDialogState } from '../../../state/dialog';
import { useResourceState } from '../../../state/resource';

const EntryListEditor = ({dialogId, busy, keys, entries, submitHandler}: {
    dialogId: string,
    busy: boolean,
    keys: string[],
    entries: Entry<string, string>[],
    submitHandler: (entries: Entry<string, string>[]) => Promise<void>
}) => {
    const resourceState = useResourceState();

    const [data, setData] = useState<Entry<string, string>[]>();
    const [showDialog, setShowDialog] = useState(false);
    const [selectedKey, setSelectedKey] = useState<string>();
    const [selectedValue, setSelectedValue] = useState<string>();

    useEffect(() => {
        setData(entries);
    }, [entries]);

    return (
        <>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                    <tr>
                        <th>
                            {resourceState?.admin?.orderFormat.key}
                        </th>
                        <th>
                            {resourceState?.admin?.orderFormat.value}
                        </th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {keys?.map(key =>
                        <tr key={key} className="hover">
                            <td>{key}</td>
                            <td>{data?.find(item => item.key === key)?.value || key}</td>
                            <td>
                                <WiwaButton
                                    className="btn-primary md:btn-xs"
                                    title={resourceState?.common?.action.edit}
                                    disabled={busy}
                                    onClick={() => {
                                        setSelectedKey(key);
                                        setSelectedValue(data?.find(item => item.key === key)?.value || key);
                                        setShowDialog(true);
                                    }}
                                ><Edit size={18}/>
                                </WiwaButton>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
                <div className="flex flex-col items-center justify-center p-5">
                    <WiwaButton
                        className="btn-primary"
                        disabled={busy}
                        onClick={() => {
                            if (data) {
                                submitHandler(data).then();
                            }
                        }}
                    >{resourceState?.common?.action.submit}
                    </WiwaButton>
                </div>
            </div>
            <EntryDialog
                dialogId={dialogId}
                showDialog={showDialog}
                key={selectedKey || ''}
                value={selectedValue || ''}
                setValue={setSelectedValue}
                okHandler={() => {
                    if (selectedKey !== undefined && data !== undefined) {
                        const newData = [...data];
                        const index = newData.findIndex(item => item.key == selectedKey);
                        console.log(selectedKey);
                        console.log(newData);
                        if (index !== -1) {
                            newData[index] = {key: selectedKey, value: selectedValue || selectedKey};
                        } else {
                            newData.push({key: selectedKey, value: selectedValue || selectedKey});
                        }
                        setData(newData);
                        setShowDialog(false);
                    }
                }}
                cancelHandler={() => setShowDialog(false)}
            />
        </>
    )
}

export default EntryListEditor;

const EntryDialog = ({dialogId, showDialog, key, value, setValue, okHandler, cancelHandler}: {
    dialogId: string,
    showDialog: boolean,
    key: string,
    value: string,
    setValue: (value: string) => void,
    okHandler: () => void,
    cancelHandler: () => void
}) => {
    const dialogState = useDialogState();
    const resourceState = useResourceState();

    const [valueValid, setValueValid] = useState(false);

    return (!dialogState?.modalRoot ? null : createPortal(
        <BaseDialog id={dialogId} showDialog={showDialog} closeHandler={cancelHandler}>
            <div className="container p-5 mx-auto">
                <div className="flex flex-col items-center justify-center">
                    <div className="text-lg md:text-xl font-bold text-center">
                        {key}
                    </div>

                    <WiwaFormInputString
                        label={resourceState?.admin?.orderFormat.editEntry.label}
                        required={true}
                        placeholder={resourceState?.admin?.orderFormat.editEntry.placeholder}
                        value={value}
                        setValue={setValue}
                        setValid={setValueValid}
                        validate={() => {
                            if (value.trim().length === 0) {
                                return {
                                    valid: false,
                                    message: resourceState?.admin?.orderFormat.editEntry.required
                                };
                            }
                            return {valid: true};
                        }}
                    />

                    <div className="join pt-5">
                        <WiwaButton
                            className="btn-primary join-item"
                            disabled={!valueValid}
                            onClick={okHandler}
                        >{resourceState?.common?.action.ok}
                        </WiwaButton>
                        <WiwaButton
                            className="btn-accent join-item"
                            onClick={cancelHandler}
                        >{resourceState?.common?.action.cancel}
                        </WiwaButton>
                    </div>
                </div>
            </div>
        </BaseDialog>
        , dialogState.modalRoot))
}

