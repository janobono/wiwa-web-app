import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Edit } from 'react-feather';

import { getUnits } from '../../api/controller/ui';
import { Unit, UnitField } from '../../api/model/application';
import BaseDialog from '../../component/dialog/base-dialog';
import WiwaButton from '../../component/ui/wiwa-button';
import WiwaFormInput from '../../component/ui/wiwa-form-input';
import { getUnitIdName } from '../../model';
import { useAuthState } from '../../state/auth';
import { useDialogState } from '../../state/dialog';
import { useResourceState } from '../../state/resource';
import { setUnits } from '../../api/controller/config';
import UnitTable from '../../component/app/admin/unit-table.tsx';

const UNIT_VALUE_DIALOG_ID = 'admin-unit-value-dialog-001';

const UnitsPage = () => {
    const authState = useAuthState();
    const resourceState = useResourceState();

    const [busy, setBusy] = useState(false);
    const [data, setData] = useState<Unit[]>();
    const [selected, setSelected] = useState<Unit>();
    const [error, setError] = useState<string>();

    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        getUnits().then(data => setData(data.data));
    }, []);

    const okHandler = async (unit: Unit) => {
        setError(undefined);
        setBusy(true);
        try {
            if (data) {
                const newData = [...data];
                const index = newData.findIndex(item => item.id === unit.id);
                if (index !== -1) {
                    newData[index] = unit;
                    const response = await setUnits(newData, authState?.authToken?.accessToken);

                    setData(response.data);

                    if (response?.error) {
                        setError(resourceState?.admin?.units.editUnit.error);
                    }
                }
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
                <div className="flex flex-col p-5 w-full">
                    <div className="flex flex-col w-full items-center justify-center pb-5 gap-5">
                        <div className="join">
                            <WiwaButton
                                className="btn-primary"
                                title={resourceState?.common?.action.edit}
                                disabled={busy || selected === undefined}
                                onClick={() => {
                                    setShowDialog(true);
                                }}
                            ><Edit size={18}/>
                            </WiwaButton>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <UnitTable
                            fields={Object.values(UnitField)}
                            rows={data}
                            selected={selected}
                            setSelected={setSelected}
                        />
                    </div>
                </div>

                <UnitDialog
                    showDialog={showDialog}
                    unit={selected}
                    okHandler={(data) => {
                        okHandler(data).then();
                        setShowDialog(false);
                    }}
                    cancelHandler={() => setShowDialog(false)}
                />
            </>
    )
}

export default UnitsPage;

const UnitDialog = ({showDialog, unit, okHandler, cancelHandler}: {
    showDialog: boolean,
    unit?: Unit,
    okHandler: (unit: Unit) => void,
    cancelHandler: () => void
}) => {
    const dialogState = useDialogState();
    const resourceState = useResourceState();

    const [value, setValue] = useState('');
    const [valueValid, setValueValid] = useState(false);

    useEffect(() => {
        if (unit) {
            setValue(unit.value);
        }
    }, [unit]);

    return (!dialogState?.modalRoot ? null : createPortal(
        <BaseDialog id={UNIT_VALUE_DIALOG_ID} showDialog={showDialog} closeHandler={cancelHandler}>
            <div className="container p-5 mx-auto">
                <div className="flex flex-col items-center justify-center">
                    <div className="text-lg md:text-xl font-bold text-center">
                        {resourceState?.admin?.units.editUnit.title}
                    </div>

                    <WiwaFormInput
                        label={unit ? getUnitIdName(unit.id) : ''}
                        required={true}
                        placeholder={resourceState?.admin?.units.editUnit.valuePlaceholder}
                        value={value}
                        setValue={setValue}
                        setValid={setValueValid}
                        validate={() => {
                            if (value.trim().length === 0) {
                                return {
                                    valid: false,
                                    message: resourceState?.admin?.units.editUnit.valueRequired
                                };
                            }
                            return {valid: true};
                        }}
                    />

                    <div className="join pt-5">
                        <WiwaButton
                            className="btn-primary join-item"
                            disabled={!valueValid}
                            onClick={() => {
                                if (unit) {
                                    okHandler({id: unit.id, value});
                                }
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
