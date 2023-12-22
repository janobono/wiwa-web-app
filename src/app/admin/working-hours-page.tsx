import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Edit } from 'react-feather';

import MdDialog from '../../component/dialog/md-dialog';
import { useAuthState } from '../../component/state/auth-state-provider';
import { useConfigState } from '../../component/state/config-state-provider';
import { useDialogState } from '../../component/state/dialog-state-provider';
import { useResourceState } from '../../component/state/resource-state-provider';
import WiwaButton from '../../component/ui/wiwa-button';
import WiwaMarkdownRenderer from '../../component/ui/wiwa-markdown-renderer';
import { SingleValueBody } from '../../model/service';
import { CONTEXT_PATH, getData, postData } from '../../data';

const PATH_UI_WORKING_HOURS = CONTEXT_PATH + 'ui/working-hours';
const PATH_CONFIG_WORKING_HOURS = CONTEXT_PATH + 'config/working-hours';
const WORKING_HOURS_DIALOG_ID = 'admin-working-hours-dialog-001';

const WorkingHoursPage = () => {
    const configState = useConfigState();
    const resourceState = useResourceState();

    const [workingHours, setWorkingHours] = useState('');
    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        if (configState?.up) {
            const fetchWorkingHours = async () => {
                const response = await getData<SingleValueBody<string>>(PATH_UI_WORKING_HOURS);
                if (response.data) {
                    setWorkingHours(response.data.value);
                }
            }
            fetchWorkingHours().then();
        }
    }, [configState?.up]);

    return (
        <>
            <div className="flex flex-col p-5 gap-5 w-full">
                <div className="border border-solid flex flex-col justify-between">
                    <div className="p-5 flex content-stretch justify-center items-center">
                        <WiwaButton
                            className="btn-primary"
                            title={resourceState?.admin?.workingHours.title}
                            onClick={() => setShowDialog(true)}
                        ><Edit size={18}/></WiwaButton>
                    </div>
                    <div className="p-5 flex content-stretch justify-center items-center">
                        <WiwaMarkdownRenderer className="prose max-w-none" md={workingHours}/>
                    </div>
                </div>
            </div>

            <WorkingHoursDialog
                workingHours={workingHours}
                setWorkingHours={setWorkingHours}
                showDialog={showDialog}
                setShowDialog={setShowDialog}
            />
        </>
    )
}

export default WorkingHoursPage;

const WorkingHoursDialog = (
    {
        workingHours,
        setWorkingHours,
        showDialog,
        setShowDialog
    }: {
        workingHours: string,
        setWorkingHours: (workingHours: string) => void
        showDialog: boolean,
        setShowDialog: (showDialog: boolean) => void
    }) => {
    const authState = useAuthState();
    const dialogState = useDialogState();
    const resourceState = useResourceState();

    const [value, setValue] = useState('');
    const [valid, setValid] = useState(false);
    const [error, setError] = useState<string>();
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        setValue(workingHours);
    }, [workingHours, showDialog]);

    const okHandler = async () => {
        setDisabled(true);
        try {
            if (valid) {
                const response = await postData(
                    PATH_CONFIG_WORKING_HOURS,
                    {value},
                    authState?.accessToken || ''
                );
                if (response.error) {
                    setError(resourceState?.admin?.workingHours.error);
                } else {
                    setWorkingHours(value);
                    setShowDialog(false);
                }
            }
        } finally {
            setDisabled(false);
        }
    }

    return (!dialogState?.modalRoot ? null : createPortal(
        <MdDialog
            disabled={disabled}
            id={WORKING_HOURS_DIALOG_ID}
            showDialog={showDialog}
            title={resourceState?.admin?.workingHours.title}
            label={resourceState?.admin?.workingHours.valueLabel}
            required={true}
            placeholder={resourceState?.admin?.workingHours.valuePlaceholder}
            value={value}
            setValue={setValue}
            validate={() => {
                if (value.trim().length === 0) {
                    setValid(false);
                    return {
                        valid: false,
                        message: resourceState?.admin?.workingHours.valueRequired
                    };
                }
                setValid(true);
                return {valid: true};
            }}
            rows={20}
            error={error}
            okHandler={okHandler}
            cancelHandler={() => setShowDialog(false)}
        />
        , dialogState.modalRoot))
}
