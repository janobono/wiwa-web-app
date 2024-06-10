import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Minus, Plus } from 'react-feather';

import { Entry } from '../../../api/model';
import BaseDialog from '../../dialog/base-dialog';
import WiwaFormInput from '../../ui/wiwa-form-input';
import WiwaButton from '../../ui/wiwa-button';
import { useDialogState } from '../../../state/dialog';
import { useResourceState } from '../../../state/resource';

const CsvReplacementsEditor = ({dialogId, busy, entries, submitHandler}: {
    dialogId: string,
    busy: boolean,
    entries: Entry<string, string>[],
    submitHandler: (entries: Entry<string, string>[]) => Promise<void>
}) => {
    const resourceState = useResourceState();

    const [data, setData] = useState<Entry<string, string>[]>();
    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        if (entries) {
            setData([...entries]);
        }
    }, [entries]);

    return (
        <>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                    <tr>
                        <th>
                            {resourceState?.admin?.orderFormat.csvReplacement.regexLabel}
                        </th>
                        <th>
                            {resourceState?.admin?.orderFormat.csvReplacement.replacementLabel}
                        </th>
                        <th>
                            <WiwaButton
                                className="btn-primary md:btn-xs"
                                title={resourceState?.common?.action.add}
                                disabled={busy}
                                onClick={() => {
                                    setShowDialog(true);
                                }}
                            ><Plus size={18}/>
                            </WiwaButton>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {data?.map(entry =>
                        <tr key={entry.key} className="hover">
                            <td>{entry.key}</td>
                            <td>{entry.value}</td>
                            <td>
                                <WiwaButton
                                    className="btn-primary md:btn-xs"
                                    title={resourceState?.common?.action.delete}
                                    disabled={busy}
                                    onClick={() => {
                                        if (data) {
                                            const newData = [...data];
                                            const index = newData.findIndex(item => item.key === entry.key);
                                            if (index !== -1) {
                                                newData.splice(index, 1);
                                                setData(newData);
                                            }
                                        }
                                    }}
                                ><Minus size={18}/>
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
    okHandler: (entry: Entry<string, string>) => void,
    cancelHandler: () => void
}) => {
    const dialogState = useDialogState();
    const resourceState = useResourceState();

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

                    <WiwaFormInput
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

                    <WiwaFormInput
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

