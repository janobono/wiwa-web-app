import { useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Edit } from 'react-feather';

import { setUnits } from '../../api/controller/config';
import { getUnits } from '../../api/controller/ui';
import { Unit, UnitField } from '../../api/model/application';
import UnitTable from '../../component/app/admin/units/unit-table';
import BaseDialog from '../../component/dialog/base-dialog';
import WiwaBreadcrumb from '../../component/ui/wiwa-breadcrumb';
import WiwaButton from '../../component/ui/wiwa-button';
import WiwaFormInputString from '../../component/ui/wiwa-form-input-string';
import { AdminResourceContext, AuthContext, CommonResourceContext, DialogContext, ErrorContext } from '../../context';

const UNIT_VALUE_DIALOG_ID = 'admin-unit-value-dialog-001';

const UnitsPage = () => {
    const authState = useContext(AuthContext);
    const errorState = useContext(ErrorContext);
    const commonResourceState = useContext(CommonResourceContext);

    const [busy, setBusy] = useState(false);
    const [data, setData] = useState<Unit[]>();
    const [selected, setSelected] = useState<Unit>();

    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        getUnits().then(data => setData(data.data));
    }, []);

    const okHandler = async (unit: Unit) => {
        setBusy(true);
        try {
            if (data) {
                const newData = [...data];
                const index = newData.findIndex(item => item.id === unit.id);
                if (index !== -1) {
                    newData[index] = unit;
                    const response = await setUnits(newData, authState?.authToken?.accessToken);

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
            <WiwaBreadcrumb breadcrumbs={[
                {key: 0, label: commonResourceState?.resource?.navigation.adminNav.title || ''},
                {
                    key: 1,
                    label: commonResourceState?.resource?.navigation.adminNav.units || '',
                    to: '/admin/units'
                }
            ]}/>
            <div className="flex flex-col p-5 gap-5 w-full">
                <div className="join">
                    <WiwaButton
                        className="btn-primary"
                        title={commonResourceState?.resource?.action.edit}
                        disabled={busy || selected === undefined}
                        onClick={() => {
                            setShowDialog(true);
                        }}
                    ><Edit size={18}/>
                    </WiwaButton>
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
    const dialogState = useContext(DialogContext);
    const adminResourceState = useContext(AdminResourceContext);
    const commonResourceState = useContext(CommonResourceContext);

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
                        {adminResourceState?.resource?.units.editUnit.title}
                    </div>

                    <WiwaFormInputString
                        label={unit ? commonResourceState?.getUnitIdName(unit.id) : ''}
                        required={true}
                        placeholder={adminResourceState?.resource?.units.editUnit.valuePlaceholder}
                        value={value}
                        setValue={setValue}
                        setValid={setValueValid}
                        validate={() => {
                            if (value.trim().length === 0) {
                                return {
                                    valid: false,
                                    message: adminResourceState?.resource?.units.editUnit.valueRequired
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
                        >{commonResourceState?.resource?.action.ok}
                        </WiwaButton>
                        <WiwaButton
                            className="btn-accent join-item"
                            onClick={cancelHandler}
                        >{commonResourceState?.resource?.action.cancel}
                        </WiwaButton>
                    </div>
                </div>
            </div>
        </BaseDialog>
        , dialogState.modalRoot))
}
