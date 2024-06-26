import { useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Edit } from 'react-feather';

import { Entry, EntryField } from '../../../api/model';
import BaseDialog from '../../dialog/base-dialog';
import WiwaFormInputString from '../../ui/wiwa-form-input-string';
import WiwaButton from '../../ui/wiwa-button';
import { DialogContext, ResourceContext } from '../../../context';
import EntryTable from './entry-table';

const EntriesEditor = ({dialogId, busy, entries, submitHandler}: {
    dialogId: string,
    busy: boolean,
    entries: Entry[],
    submitHandler: (entries: Entry[]) => Promise<void>
}) => {
    const resourceState = useContext(ResourceContext);

    const [data, setData] = useState<Entry[]>();
    const [selected, setSelected] = useState<Entry>();
    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        setData(entries);
    }, [entries]);

    return (
        <>
            <div className="join">
                <WiwaButton
                    className="btn-primary join-item"
                    title={resourceState?.common?.action.edit}
                    disabled={busy || selected === undefined}
                    onClick={() => {
                        setShowDialog(true);
                    }}
                ><Edit size={18}/>
                </WiwaButton>
            </div>

            <div className="overflow-x-auto">
                <EntryTable
                    fields={Object.values(EntryField)}
                    rows={data}
                    selected={selected}
                    setSelected={setSelected}
                />
            </div>

            <div className="flex flex-col items-center justify-center">
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

            {selected &&
                <EntryDialog
                    dialogId={dialogId}
                    showDialog={showDialog}
                    entry={selected}
                    okHandler={(entry) => {
                        if (data) {
                            const newData = [...data];
                            const index = newData.findIndex(item => item.key === entry.key);
                            if (index !== -1) {
                                newData[index] = entry;
                                submitHandler(newData).then();
                            }
                            setShowDialog(false);
                        }
                    }}
                    cancelHandler={() => setShowDialog(false)}
                />
            }
        </>
    )
}

export default EntriesEditor;

const EntryDialog = ({dialogId, showDialog, entry, okHandler, cancelHandler}: {
    dialogId: string,
    showDialog: boolean,
    entry: Entry,
    okHandler: (entry: Entry) => void,
    cancelHandler: () => void
}) => {
    const dialogState = useContext(DialogContext);
    const resourceState = useContext(ResourceContext);

    const [value, setValue] = useState('');
    const [valueValid, setValueValid] = useState(false);

    useEffect(() => {
        setValue(entry.value);
    }, [showDialog, entry]);

    return (!dialogState?.modalRoot ? null : createPortal(
        <BaseDialog id={dialogId} showDialog={showDialog} closeHandler={cancelHandler}>
            <div className="container p-5 mx-auto">
                <div className="flex flex-col items-center justify-center">
                    <div className="text-lg md:text-xl font-bold text-center">
                        {entry.key}
                    </div>

                    <WiwaFormInputString
                        label={resourceState?.admin?.orderFormat.editEntry.label}
                        required={true}
                        placeholder={resourceState?.admin?.orderFormat.editEntry.placeholder}
                        value={value}
                        setValue={setValue}
                        setValid={setValueValid}
                        validate={() => {
                            if (value.length === 0) {
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
                            onClick={() => okHandler(
                                {key: entry.key, value}
                            )}
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
