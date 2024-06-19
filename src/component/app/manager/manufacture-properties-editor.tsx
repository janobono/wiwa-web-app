import { useAuthState } from '../../../state/auth';
import { useErrorState } from '../../../state/error';
import { useResourceState } from '../../../state/resource';
import { useEffect, useState } from 'react';
import { ManufactureProperties } from '../../../api/model/application';
import { getManufactureProperties, setManufactureProperties } from '../../../api/controller/config';
import WiwaButton from '../../ui/wiwa-button';
import { Dimensions } from '../../../api/model';

const ManufacturePropertiesEditor = () => {
    const authState = useAuthState();
    const errorState = useErrorState();
    const resourceState = useResourceState();

    const [busy, setBusy] = useState(false);
    const [value, setValue] = useState<ManufactureProperties>();

    const [minimalSystemDimensions, setMinimalSystemDimensions] = useState<Dimensions>();
    const [minimalSystemDimensionsValid, setMinimalSystemDimensionsValid] = useState(false);

    const [minimalEdgedBoardDimensions, setMinimalEdgedBoardDimensions] = useState<Dimensions>();
    const [minimalEdgedBoardDimensionsValid, setMinimalEdgedBoardDimensionsValid] = useState(false);

    const [minimalLayeredBoardDimensions, setMinimalLayeredBoardDimensions] = useState<Dimensions>();
    const [minimalLayeredBoardDimensionsValid, setMinimalLayeredBoardDimensionsValid] = useState(false);

    const [minimalFrameBoardDimensions, setMinimalFrameBoardDimensions] = useState<Dimensions>();
    const [minimalFrameBoardDimensionsValid, setMinimalFrameBoardDimensionsValid] = useState(false);

    const [edgeWidthAppend, setEdgeWidthAppend] = useState<number>();
    const [edgeWidthAppendValid, setEdgeWidthAppendValid] = useState(false);

    const [edgeLengthAppend, setEdgeLengthAppend] = useState<number>();
    const [edgeLengthAppendValid, setEdgeLengthAppendValid] = useState(false);

    const [duplicatedBoardAppend, setDuplicatedBoardAppend] = useState<number>();
    const [duplicatedBoardAppendValid, setDuplicatedBoardAppendValid] = useState(false);

    useEffect(() => {
        getManufactureProperties(authState?.authToken?.accessToken).then(data => setValue(data.data));
    }, [authState?.authToken?.accessToken]);

    useEffect(() => {
        if (value) {
            setMinimalSystemDimensions(value.minimalSystemDimensions);
            setMinimalSystemDimensionsValid(true);

            setMinimalEdgedBoardDimensions(value.minimalEdgedBoardDimensions);
            setMinimalEdgedBoardDimensionsValid(true);

            setMinimalLayeredBoardDimensions(value.minimalLayeredBoardDimensions);
            setMinimalLayeredBoardDimensionsValid(true);

            setMinimalFrameBoardDimensions(value.minimalFrameBoardDimensions);
            setMinimalFrameBoardDimensionsValid(true);

            setEdgeWidthAppend(value.edgeWidthAppend);
            setEdgeWidthAppendValid(true);

            setEdgeLengthAppend(value.edgeLengthAppend);
            setEdgeLengthAppendValid(true);

            setDuplicatedBoardAppend(value.duplicatedBoardAppend);
            setDuplicatedBoardAppendValid(true);
        }
    }, [value]);

    const isFormValid = (): boolean => {
        return minimalSystemDimensionsValid && minimalEdgedBoardDimensionsValid && minimalLayeredBoardDimensionsValid
            && minimalLayeredBoardDimensionsValid && minimalFrameBoardDimensionsValid && edgeWidthAppendValid
            && edgeLengthAppendValid && duplicatedBoardAppendValid;
    }

    const submit = async () => {
        setBusy(true);
        try {
            if (isFormValid()) {
                const response = await setManufactureProperties({
                        minimalSystemDimensions: minimalSystemDimensions ? minimalSystemDimensions : {x: 0, y: 0},
                        minimalEdgedBoardDimensions: minimalEdgedBoardDimensions ? minimalEdgedBoardDimensions : {
                            x: 0,
                            y: 0
                        },
                        minimalLayeredBoardDimensions: minimalLayeredBoardDimensions ? minimalLayeredBoardDimensions : {
                            x: 0,
                            y: 0
                        },
                        minimalFrameBoardDimensions: minimalFrameBoardDimensions ? minimalFrameBoardDimensions : {
                            x: 0,
                            y: 0
                        },
                        edgeWidthAppend: edgeWidthAppend ? Number(edgeWidthAppend) : 0,
                        edgeLengthAppend: edgeLengthAppend ? Number(edgeLengthAppend) : 0,
                        duplicatedBoardAppend: duplicatedBoardAppend ? Number(duplicatedBoardAppend) : 0
                    },
                    authState?.authToken?.accessToken
                );
                if (response.data) {
                    setValue(response.data);
                }
                errorState?.addError(response?.error);
            }
        } finally {
            setBusy(false);
        }
    }

    return (
        <div className="flex flex-col p-5 gap-5 w-full">
            <div className="flex flex-col items-center justify-center">
                {/*<WiwaFormInput*/}
                {/*    label={resourceState?.admin?.mailFormat.resetPassword.subjectLabel}*/}
                {/*    placeholder={resourceState?.admin?.mailFormat.resetPassword.subjectPlaceholder}*/}
                {/*    value={subject}*/}
                {/*    setValue={setSubject}*/}
                {/*    setValid={setSubjectValid}*/}
                {/*    validate={() => {*/}
                {/*        if (subject.trim().length === 0) {*/}
                {/*            return {*/}
                {/*                valid: false,*/}
                {/*                message: resourceState?.admin?.mailFormat.resetPassword.subjectRequired*/}
                {/*            };*/}
                {/*        }*/}
                {/*        return {valid: true};*/}
                {/*    }}*/}
                {/*/>*/}

                {/*<WiwaFormInput*/}
                {/*    label={resourceState?.admin?.mailFormat.resetPassword.titleLabel}*/}
                {/*    placeholder={resourceState?.admin?.mailFormat.resetPassword.titlePlaceholder}*/}
                {/*    value={title}*/}
                {/*    setValue={setTitle}*/}
                {/*    setValid={setTitleValid}*/}
                {/*    validate={() => {*/}
                {/*        if (title.trim().length === 0) {*/}
                {/*            return {*/}
                {/*                valid: false,*/}
                {/*                message: resourceState?.admin?.mailFormat.resetPassword.titleRequired*/}
                {/*            };*/}
                {/*        }*/}
                {/*        return {valid: true};*/}
                {/*    }}*/}
                {/*/>*/}

                {/*<WiwaFormInput*/}
                {/*    label={resourceState?.admin?.mailFormat.resetPassword.messageLabel}*/}
                {/*    placeholder={resourceState?.admin?.mailFormat.resetPassword.messagePlaceholder}*/}
                {/*    value={message}*/}
                {/*    setValue={setMessage}*/}
                {/*    setValid={setMessageValid}*/}
                {/*    validate={() => {*/}
                {/*        if (message.trim().length === 0) {*/}
                {/*            return {*/}
                {/*                valid: false,*/}
                {/*                message: resourceState?.admin?.mailFormat.resetPassword.messageRequired*/}
                {/*            };*/}
                {/*        }*/}
                {/*        return {valid: true};*/}
                {/*    }}*/}
                {/*/>*/}

                {/*<WiwaFormInput*/}
                {/*    label={resourceState?.admin?.mailFormat.resetPassword.passwordMessageLabel}*/}
                {/*    placeholder={resourceState?.admin?.mailFormat.resetPassword.passwordMessagePlaceholder}*/}
                {/*    value={passwordMessage}*/}
                {/*    setValue={setPasswordMessage}*/}
                {/*    setValid={setPasswordMessageValid}*/}
                {/*    validate={() => {*/}
                {/*        if (passwordMessage.trim().length === 0) {*/}
                {/*            return {*/}
                {/*                valid: false,*/}
                {/*                message: resourceState?.admin?.mailFormat.resetPassword.passwordMessageRequired*/}
                {/*            };*/}
                {/*        }*/}
                {/*        return {valid: true};*/}
                {/*    }}*/}
                {/*/>*/}

                {/*<WiwaFormInput*/}
                {/*    label={resourceState?.admin?.mailFormat.resetPassword.linkLabel}*/}
                {/*    placeholder={resourceState?.admin?.mailFormat.resetPassword.linkPlaceholder}*/}
                {/*    value={link}*/}
                {/*    setValue={setLink}*/}
                {/*    setValid={setLinkValid}*/}
                {/*    validate={() => {*/}
                {/*        if (link.trim().length === 0) {*/}
                {/*            return {*/}
                {/*                valid: false,*/}
                {/*                message: resourceState?.admin?.mailFormat.resetPassword.linkRequired*/}
                {/*            };*/}
                {/*        }*/}
                {/*        return {valid: true};*/}
                {/*    }}*/}
                {/*/>*/}

                <div className="join pt-5">
                    <WiwaButton
                        className="btn-primary join-item"
                        disabled={busy || !isFormValid()}
                        onClick={submit}
                    >{resourceState?.common?.action.submit}
                    </WiwaButton>
                </div>
            </div>
        </div>
    )
}

export default ManufacturePropertiesEditor;
