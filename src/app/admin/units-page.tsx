import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Edit } from 'react-feather';

import WiwaUnitId from '../../component/app/wiwa-unit-id';
import BaseDialog from '../../component/dialog/base-dialog';
import { useDialogState } from '../../component/state/dialog-state-provider';
import { useResourceState } from '../../component/state/resource-state-provider';
import { useUnitState } from '../../component/state/unit-provider';
import WiwaButton from '../../component/ui/wiwa-button';
import WiwaFormInput from '../../component/ui/wiwa-form-input';
import { getUnitIdName, Unit, UnitId } from '../../model/service';

const UNIT_VALUE_DIALOG_ID = 'admin-unit-value-dialog-001';

const UnitsPage = () => {
    const unitState = useUnitState();
    const resourceState = useResourceState();

    const [showDialog, setShowDialog] = useState(false);
    const [selectedUnitId, setSelectedUnitId] = useState<UnitId>();
    const [error, setError] = useState<string>();

    const okHandler = async (unit: Unit) => {
        setError(undefined);
        const response = unitState?.setData([unit]);
        if (response) {
            setError(resourceState?.admin?.units.editUnit.error);
        }
    }

    return (error ?
            <div className="flex  flex-col justify-center items-center w-full">
                <div className="font-mono text-xl">{error}</div>
            </div>
            :
            <>
                <div className="flex flex-col p-5 w-full">
                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            <thead>
                            <tr>
                                <th>{resourceState?.admin?.units.id}</th>
                                <th>{resourceState?.admin?.units.value}</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {unitState?.data?.map((unit) =>
                                <tr key={unit.id} className="hover">
                                    <td><WiwaUnitId unitId={unit.id}/></td>
                                    <td>{unit.value}</td>
                                    <th>
                                        <WiwaButton
                                            className="btn-primary md:btn-xs"
                                            title={resourceState?.admin?.units.editUnit.title}
                                            disabled={unitState?.busy}
                                            onClick={() => {
                                                setSelectedUnitId(unit.id);
                                                setShowDialog(true);
                                            }}
                                        ><Edit size={18}/>
                                        </WiwaButton>
                                    </th>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
                <UnitDialog
                    showDialog={showDialog}
                    unitId={selectedUnitId}
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

const UnitDialog = ({showDialog, unitId, okHandler, cancelHandler}: {
    showDialog: boolean,
    unitId?: UnitId,
    okHandler: (unit: Unit) => void,
    cancelHandler: () => void
}) => {
    const dialogState = useDialogState();
    const unitState = useUnitState();
    const resourceState = useResourceState();

    const [value, setValue] = useState('');
    const [valueValid, setValueValid] = useState(false);

    useEffect(() => {
        if (unitId) {
            setValue(unitState?.getValue(unitId) || '');
        }
    }, [showDialog, unitId, unitState]);

    return (!dialogState?.modalRoot ? null : createPortal(
        <BaseDialog id={UNIT_VALUE_DIALOG_ID} showDialog={showDialog} closeHandler={cancelHandler}>
            <div className="container p-5 mx-auto">
                <div className="flex flex-col items-center justify-center">
                    <div className="text-lg md:text-xl font-bold text-center">
                        {resourceState?.admin?.units.editUnit.title}
                    </div>

                    <WiwaFormInput
                        label={unitId ? getUnitIdName(unitId) : ''}
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
                                if (unitId) {
                                    okHandler({id: unitId, value});
                                }
                            }}
                        >{resourceState?.common?.action.ok}
                        </WiwaButton>
                        <WiwaButton
                            className="btn-accent join-item"
                            onClick={() => {
                                cancelHandler();
                            }}
                        >{resourceState?.common?.action.cancel}
                        </WiwaButton>
                    </div>
                </div>
            </div>
        </BaseDialog>
        , dialogState.modalRoot))
}
