import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { Entry } from '../../../api/model';
import {
    BoardDimension,
    BoardPosition,
    CornerPosition,
    EdgePosition,
    ManufactureProperties,
    OrderProperties
} from '../../../api/model/application';
import { Part, PartType } from '../../../api/model/order/part';
import { getManufactureProperties } from '../../../api/controller/config';
import { getOrderProperties } from '../../../api/controller/ui';
import { AuthContext, ErrorContext } from '../../../context';

export interface PartEditorState {
    partType: PartType,
    setPartType: (partType: PartType) => void,
    part?: Part,
    setPart: (part: Part) => void,
    valid: boolean,
    setValid: (valid: boolean) => void,
    setOrderProperties: (orderProperties?: OrderProperties) => void,
    setManufactureProperties: (manufactureProperties?: ManufactureProperties) => void,
    getDimensionName: (boardDimension: BoardDimension) => string,
    getBoardName: (boardPosition: BoardPosition) => string,
    getEdgeName: (edgePosition: EdgePosition) => string,
    getCornerName: (cornerPosition: CornerPosition) => string
}

export const PartEditorContext = createContext<PartEditorState | undefined>(undefined);

const PartEditorProvider = (
    {
        partType,
        setPartType,
        part,
        setPart,
        valid,
        setValid,
        children
    }: {
        partType: PartType,
        setPartType: (partType: PartType) => void,
        part?: Part,
        setPart: (part: Part) => void,
        valid: boolean,
        setValid: (valid: boolean) => void,
        children: ReactNode
    }
) => {
    const authState = useContext(AuthContext);
    const errorState = useContext(ErrorContext);

    const [orderProperties, setOrderProperties] = useState<OrderProperties>();
    const [manufactureProperties, setManufactureProperties] = useState<ManufactureProperties>();

    useEffect(() => {
        getOrderProperties().then(response => {
            if (response.data) {
                setOrderProperties(response.data);
            }
            errorState?.addError(response.error);
        });
        getManufactureProperties(authState?.authToken?.accessToken).then(response => {
            if (response.data) {
                setManufactureProperties(response.data);
            }
            errorState?.addError(response.error);
        });
    }, []);

    useEffect(() => {
        if (part?.type) {
            setPartType(part.type);
        }
    }, [part]);

    const getEntryValue = (key: string, entries?: Entry[]) => {
        return entries?.find(entry => entry.key === key)?.value || '';
    }

    const getDimensionName = (boardDimension: BoardDimension) => {
        return getEntryValue(boardDimension, orderProperties?.dimensions);
    }

    const getBoardName = (boardPosition: BoardPosition) => {
        return getEntryValue(boardPosition, orderProperties?.boards);
    }

    const getEdgeName = (edgePosition: EdgePosition) => {
        return getEntryValue(edgePosition, orderProperties?.edges);
    }

    const getCornerName = (cornerPosition: CornerPosition) => {
        return getEntryValue(cornerPosition, orderProperties?.corners);
    }

    return (
        <PartEditorContext.Provider
            value={
                {
                    partType,
                    setPartType,
                    part,
                    setPart,
                    valid,
                    setValid,
                    setOrderProperties,
                    setManufactureProperties,
                    getDimensionName,
                    getBoardName,
                    getEdgeName,
                    getCornerName
                }
            }
        >{children}
        </PartEditorContext.Provider>
    )
}

export default PartEditorProvider;
