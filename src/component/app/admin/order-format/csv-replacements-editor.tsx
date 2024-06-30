import { useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Plus, Trash } from 'react-feather';

import EntryTable from './entry-table';
import BaseDialog from '../../../dialog/base-dialog';
import WiwaButton from '../../../ui/wiwa-button';
import WiwaFormInputString from '../../../ui/wiwa-form-input-string';
import { Entry, EntryField } from '../../../../api/model';
import { DialogContext, ResourceContext } from '../../../../context';

const CsvReplacementsEditor = ({dialogId, busy, entries, submitHandler}: {
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
        if (entries) {
            setData([...entries]);
        }
    }, [entries]);

    return (
        <>
            <div className="join">
                <WiwaButton
                    className="btn-primary join-item"
                    title={resourceState?.common?.action.add}
                    disabled={busy}
                    onClick={() => {
                        setShowDialog(true);
                    }}
                ><Plus size={18}/>
                </WiwaButton>

                <WiwaButton
                    className="btn-accent join-item"
                    title={resourceState?.common?.action.delete}
                    disabled={busy || selected === undefined}
                    onClick={() => {
                        if (data) {
                            const newData = [...data];
                            const index = newData.findIndex(item => item.key === selected?.key);
                            if (index !== -1) {
                                newData.splice(index, 1);
                                setData(newData);
                            }
                        }
                    }}
                ><Trash size={18}/>
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

            <CsvReplacementDialog
                dialogId={dialogId}
                showDialog={showDialog}
                okHandler={(entry) => {
                    if (data) {
                        const newData = [...data];
                        const index = newData.findIndex(item => item.key === entry.key);
                        if (index !== -1) {
                            newData.splice(index, 1);
                        }
                        newData.push(entry);
                        setData(newData);
                    }
                    setShowDialog(false);
                }}
                cancelHandler={() => setShowDialog(false)}
            />
        </>
    )
}

export default CsvReplacementsEditor;

const CsvReplacementDialog = ({dialogId, showDialog, okHandler, cancelHandler}: {
    dialogId: string,
    showDialog: boolean,
    okHandler: (entry: Entry) => void,
    cancelHandler: () => void
}) => {
    const dialogState = useContext(DialogContext);
    const resourceState = useContext(ResourceContext);

    const [regex, setRegex] = useState('');
    const [regexValid, setRegexValid] = useState(false);

    const [replacement, setReplacement] = useState('');

    useEffect(() => {
        setRegex('');
        setReplacement('');
    }, [showDialog]);

    return (!dialogState?.modalRoot ? null : createPortal(
        <BaseDialog id={dialogId} showDialog={showDialog} closeHandler={cancelHandler}>
            <div className="container p-5 mx-auto">
                <div className="flex flex-col items-center justify-center">
                    <div className="text-lg md:text-xl font-bold text-center">
                        {resourceState?.admin?.orderFormat.csvReplacement.title}
                    </div>

                    <WiwaFormInputString
                        label={resourceState?.admin?.orderFormat.csvReplacement.regexLabel}
                        required={true}
                        placeholder={resourceState?.admin?.orderFormat.csvReplacement.regexPlaceholder}
                        value={regex}
                        setValue={setRegex}
                        setValid={setRegexValid}
                        validate={() => {
                            if (regex.trim().length === 0) {
                                return {
                                    valid: false,
                                    message: resourceState?.admin?.orderFormat.csvReplacement.regexRequired
                                };
                            }
                            return {valid: true};
                        }}
                    />

                    <WiwaFormInputString
                        label={resourceState?.admin?.orderFormat.csvReplacement.replacementLabel}
                        required={true}
                        value={replacement}
                        setValue={setReplacement}
                    />

                    <div className="join pt-5">
                        <WiwaButton
                            className="btn-primary join-item"
                            disabled={!regexValid}
                            onClick={() => okHandler({key: regex || '', value: replacement || ''})}
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
