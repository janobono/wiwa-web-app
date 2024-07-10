import { useContext, useEffect, useState } from 'react';

import { getManufactureProperties, setManufactureProperties } from '../../../../api/controller/config';
import { Dimensions } from '../../../../api/model';
import { ManufactureProperties, UnitId } from '../../../../api/model/application';
import WiwaButton from '../../../ui/wiwa-button';
import WiwaFormDimensions from '../../../ui/wiwa-form-dimensions';
import WiwaFormInputInteger from '../../../ui/wiwa-form-input-integer';
import { AuthContext, CommonResourceContext, ErrorContext, ManagerResourceContext } from '../../../../context';

const ManufacturePropertiesEditor = () => {
    const authState = useContext(AuthContext);
    const errorState = useContext(ErrorContext);
    const commonResourceState = useContext(CommonResourceContext);
    const managerResourceState = useContext(ManagerResourceContext);

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

    const [lengthSign, setLengthSign] = useState<string>();

    useEffect(() => {
        setLengthSign(`[${commonResourceState?.getUnit(UnitId.MILLIMETER)}]`);
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
                <WiwaFormDimensions
                    label={`${managerResourceState?.resource?.orderInputs.manufactureProperties.minimalSystemDimensionsLabel} ${lengthSign}`}
                    required={true}
                    placeholderX={managerResourceState?.resource?.orderInputs.manufactureProperties.minimalSystemDimensionsPlaceholderX}
                    placeholderY={managerResourceState?.resource?.orderInputs.manufactureProperties.minimalSystemDimensionsPlaceholderY}
                    value={minimalSystemDimensions}
                    setValue={setMinimalSystemDimensions}
                    setValid={setMinimalSystemDimensionsValid}
                    validate={() => {
                        if (minimalSystemDimensions === undefined) {
                            return {
                                valid: false,
                                message: managerResourceState?.resource?.orderInputs.manufactureProperties.minimalSystemDimensionsRequired
                            };
                        }
                        return {valid: true};
                    }}
                />

                <WiwaFormDimensions
                    label={`${managerResourceState?.resource?.orderInputs.manufactureProperties.minimalEdgedBoardDimensionsLabel} ${lengthSign}`}
                    required={true}
                    placeholderX={managerResourceState?.resource?.orderInputs.manufactureProperties.minimalEdgedBoardDimensionsPlaceholderX}
                    placeholderY={managerResourceState?.resource?.orderInputs.manufactureProperties.minimalEdgedBoardDimensionsPlaceholderY}
                    value={minimalEdgedBoardDimensions}
                    setValue={setMinimalEdgedBoardDimensions}
                    setValid={setMinimalEdgedBoardDimensionsValid}
                    validate={() => {
                        if (minimalEdgedBoardDimensions === undefined) {
                            return {
                                valid: false,
                                message: managerResourceState?.resource?.orderInputs.manufactureProperties.minimalEdgedBoardDimensionsRequired
                            };
                        }
                        return {valid: true};
                    }}
                />

                <WiwaFormDimensions
                    label={`${managerResourceState?.resource?.orderInputs.manufactureProperties.minimalLayeredBoardDimensionsLabel} ${lengthSign}`}
                    required={true}
                    placeholderX={managerResourceState?.resource?.orderInputs.manufactureProperties.minimalLayeredBoardDimensionsPlaceholderX}
                    placeholderY={managerResourceState?.resource?.orderInputs.manufactureProperties.minimalLayeredBoardDimensionsPlaceholderY}
                    value={minimalLayeredBoardDimensions}
                    setValue={setMinimalLayeredBoardDimensions}
                    setValid={setMinimalLayeredBoardDimensionsValid}
                    validate={() => {
                        if (minimalLayeredBoardDimensions === undefined) {
                            return {
                                valid: false,
                                message: managerResourceState?.resource?.orderInputs.manufactureProperties.minimalLayeredBoardDimensionsRequired
                            };
                        }
                        return {valid: true};
                    }}
                />

                <WiwaFormDimensions
                    label={`${managerResourceState?.resource?.orderInputs.manufactureProperties.minimalFrameBoardDimensionsLabel} ${lengthSign}`}
                    required={true}
                    placeholderX={managerResourceState?.resource?.orderInputs.manufactureProperties.minimalFrameBoardDimensionsPlaceholderX}
                    placeholderY={managerResourceState?.resource?.orderInputs.manufactureProperties.minimalFrameBoardDimensionsPlaceholderY}
                    value={minimalFrameBoardDimensions}
                    setValue={setMinimalFrameBoardDimensions}
                    setValid={setMinimalFrameBoardDimensionsValid}
                    validate={() => {
                        if (minimalFrameBoardDimensions === undefined) {
                            return {
                                valid: false,
                                message: managerResourceState?.resource?.orderInputs.manufactureProperties.minimalFrameBoardDimensionsRequired
                            };
                        }
                        return {valid: true};
                    }}
                />

                <WiwaFormInputInteger
                    min="0"
                    label={`${managerResourceState?.resource?.orderInputs.manufactureProperties.edgeWidthAppendLabel} ${lengthSign}`}
                    required={true}
                    placeholder={managerResourceState?.resource?.orderInputs.manufactureProperties.edgeWidthAppendPlaceholder}
                    value={edgeWidthAppend}
                    setValue={setEdgeWidthAppend}
                    setValid={setEdgeWidthAppendValid}
                    validate={() => {
                        if (edgeWidthAppend === undefined) {
                            return {
                                valid: false,
                                message: managerResourceState?.resource?.orderInputs.manufactureProperties.edgeWidthAppendRequired
                            };
                        }
                        return {valid: true};
                    }}
                />

                <WiwaFormInputInteger
                    min="0"
                    label={`${managerResourceState?.resource?.orderInputs.manufactureProperties.edgeLengthAppendLabel} ${lengthSign}`}
                    required={true}
                    placeholder={managerResourceState?.resource?.orderInputs.manufactureProperties.edgeLengthAppendPlaceholder}
                    value={edgeLengthAppend}
                    setValue={setEdgeLengthAppend}
                    setValid={setEdgeLengthAppendValid}
                    validate={() => {
                        if (edgeLengthAppend === undefined) {
                            return {
                                valid: false,
                                message: managerResourceState?.resource?.orderInputs.manufactureProperties.edgeLengthAppendRequired
                            };
                        }
                        return {valid: true};
                    }}
                />

                <WiwaFormInputInteger
                    min="0"
                    label={`${managerResourceState?.resource?.orderInputs.manufactureProperties.duplicatedBoardAppendLabel} ${lengthSign}`}
                    required={true}
                    placeholder={managerResourceState?.resource?.orderInputs.manufactureProperties.duplicatedBoardAppendPlaceholder}
                    value={duplicatedBoardAppend}
                    setValue={setDuplicatedBoardAppend}
                    setValid={setDuplicatedBoardAppendValid}
                    validate={() => {
                        if (duplicatedBoardAppend === undefined) {
                            return {
                                valid: false,
                                message: managerResourceState?.resource?.orderInputs.manufactureProperties.duplicatedBoardAppendRequired
                            };
                        }
                        return {valid: true};
                    }}
                />

                <div className="join pt-5">
                    <WiwaButton
                        className="btn-primary join-item"
                        disabled={busy || !isFormValid()}
                        onClick={submit}
                    >{commonResourceState?.resource?.action.submit}
                    </WiwaButton>
                </div>
            </div>
        </div>
    )
}

export default ManufacturePropertiesEditor;
