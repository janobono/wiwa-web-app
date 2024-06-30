import { useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Edit, Plus, Trash } from 'react-feather';

import FreeDayTable from './free-day-table';
import BaseDialog from '../../../dialog/base-dialog';
import WiwaButton from '../../../ui/wiwa-button';
import WiwaFormInputDate from '../../../ui/wiwa-form-input-date';
import WiwaFormInputString from '../../../ui/wiwa-form-input-string';
import { setFreeDays } from '../../../../api/controller/config';
import { getFreeDays } from '../../../../api/controller/ui';
import { FreeDay, FreeDayField } from '../../../../api/model/application';
import { AuthContext, DialogContext, ErrorContext, ResourceContext } from '../../../../context';
import { DialogAnswer, DialogType } from '../../../../context/model/dialog';

const FREE_DAY_DIALOG_ID = 'free-day-dialog-001';

const FreeDayEditor = () => {
    const authState = useContext(AuthContext);
    const dialogState = useContext(DialogContext);
    const errorState = useContext(ErrorContext);
    const resourceState = useContext(ResourceContext);

    const [busy, setBusy] = useState(false);
    const [data, setData] = useState<FreeDay[]>();
    const [selected, setSelected] = useState<FreeDay>();

    const [edit, setEdit] = useState(false);
    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        getFreeDays().then(data => setData(data.data));
    }, []);

    const okHandler = async (freeDay: FreeDay) => {
        setBusy(true);
        try {
            if (data) {
                const newData = [...data];
                const index = newData.findIndex(item => item.day === freeDay.day && item.month === freeDay.month);
                if (index !== -1) {
                    newData[index] = freeDay;
                } else {
                    newData.push(freeDay);
                }

                const response = await setFreeDays(newData, authState?.authToken?.accessToken);

                setData(response.data);

                errorState?.addError(response.error);
            }
        } finally {
            setBusy(false);
        }
    }

    const deleteHandler = async (freeDay: FreeDay) => {
        setBusy(true);
        try {
            if (data) {
                const newData = [...data];
                const index = newData.findIndex(item => item.day === freeDay.day && item.month === freeDay.month);
                if (index !== -1) {
                    newData.splice(index, 1);
                    const response = await setFreeDays(newData, authState?.authToken?.accessToken);
                    setData(response.data);
                    errorState?.addError(response.error);
                }
            }
        } finally {
            setBusy(false);
        }
    }

    return (
        <>
            <div className="flex flex-col p-5 w-full">
                <div className="join">
                    <WiwaButton
                        className="btn-primary join-item"
                        title={resourceState?.common?.action.add}
                        disabled={busy}
                        onClick={() => {
                            setEdit(false);
                            setShowDialog(true);
                        }}
                    ><Plus size={18}/>
                    </WiwaButton>
                    <WiwaButton
                        className="btn-secondary join-item"
                        title={resourceState?.common?.action.edit}
                        disabled={busy || selected === undefined}
                        onClick={() => {
                            setEdit(true);
                            setShowDialog(true);
                        }}
                    ><Edit size={18}/>
                    </WiwaButton>
                    <WiwaButton
                        className="btn-accent join-item"
                        title={resourceState?.common?.action.delete}
                        disabled={busy || selected === undefined}
                        onClick={() => {
                            dialogState?.showDialog({
                                type: DialogType.YES_NO,
                                title: resourceState?.manager?.orderInputs.freeDay.deleteQuestionTitle,
                                message: resourceState?.manager?.orderInputs.freeDay.deleteQuestionMessage,
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
                    <FreeDayTable
                        fields={Object.values(FreeDayField)}
                        rows={data}
                        selected={selected}
                        setSelected={setSelected}
                    />
                </div>
            </div>

            <FreeDayDialog
                showDialog={showDialog}
                freeDay={edit ? selected : undefined}
                okHandler={(data) => {
                    okHandler(data).then();
                    setShowDialog(false);
                }}
                cancelHandler={() => setShowDialog(false)}
            />
        </>
    )
}

export default FreeDayEditor;

const FreeDayDialog = ({showDialog, freeDay, okHandler, cancelHandler}: {
    showDialog: boolean,
    freeDay?: FreeDay,
    okHandler: (freeDay: FreeDay) => void,
    cancelHandler: () => void
}) => {
    const dialogState = useContext(DialogContext);
    const resourceState = useContext(ResourceContext);

    const [name, setName] = useState('');
    const [nameValid, setNameValid] = useState(false);

    const [date, setDate] = useState<Date>();
    const [dateValid, setDateValid] = useState(false);

    useEffect(() => {
        if (freeDay) {
            setName(freeDay.name);
            const freeDayDate = new Date(Date.now());
            freeDayDate.setMonth(freeDay.month - 1, freeDay.day);
            setDate(freeDayDate);
        } else {
            setName('');
            const freeDayDate = new Date(Date.now());
            setDate(freeDayDate);
        }
    }, [freeDay]);

    const isFormValid = (): boolean => {
        return nameValid && dateValid;
    }

    return (!dialogState?.modalRoot ? null : createPortal(
        <BaseDialog id={FREE_DAY_DIALOG_ID} showDialog={showDialog} closeHandler={cancelHandler}>
            <div className="container p-5 mx-auto">
                <div className="flex flex-col items-center justify-center">
                    <div className="text-lg md:text-xl font-bold text-center">
                        {resourceState?.manager?.orderInputs.freeDay.title}
                    </div>

                    <WiwaFormInputString
                        label={resourceState?.manager?.orderInputs.freeDay.nameLabel}
                        required={true}
                        placeholder={resourceState?.manager?.orderInputs.freeDay.namePlaceholder}
                        value={name}
                        setValue={setName}
                        setValid={setNameValid}
                        validate={() => {
                            if (name.trim().length === 0) {
                                return {
                                    valid: false,
                                    message: resourceState?.manager?.orderInputs.freeDay.nameRequired
                                };
                            }
                            return {valid: true};
                        }}
                    />

                    <WiwaFormInputDate
                        label={resourceState?.manager?.orderInputs.freeDay.dateLabel}
                        required={true}
                        placeholder={resourceState?.manager?.orderInputs.freeDay.datePlaceholder}
                        value={date}
                        setValue={setDate}
                        setValid={setDateValid}
                        validate={() => {
                            if (date === undefined) {
                                return {
                                    valid: false,
                                    message: resourceState?.manager?.orderInputs.freeDay.dateRequired
                                };
                            }
                            return {valid: true};
                        }}
                    />

                    <div className="join pt-5">
                        <WiwaButton
                            className="btn-primary join-item"
                            disabled={!isFormValid()}
                            onClick={() => {
                                okHandler({
                                    name,
                                    day: date ? date.getDate() : 1,
                                    month: date ? date.getMonth() + 1 : 1
                                });
                            }}
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
