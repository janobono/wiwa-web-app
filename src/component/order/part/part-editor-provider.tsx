import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Part } from '../../../api/model/order/part';
import { Entry } from '../../../api/model';
import {
    BoardDimension,
    BoardPosition,
    CornerPosition,
    EdgePosition,
    ManufactureProperties,
    OrderProperties,
    UnitId
} from '../../../api/model/application';
import { getOrderProperties } from '../../../api/controller/ui';
import { getManufactureProperties } from '../../../api/controller/config';
import { AuthContext, ErrorContext, ResourceContext } from '../../../context';

export interface PartEditorState {
    part?: Part,
    setPart: (part: Part) => void,
    valid: boolean,
    setValid: (valid: boolean) => void,
    setOrderProperties: (orderProperties?: OrderProperties) => void,
    setManufactureProperties: (manufactureProperties?: ManufactureProperties) => void,
    lengthSign?: string,
    getDimensionName: (boardDimension: BoardDimension) => string,
    getBoardName: (boardPosition: BoardPosition) => string,
    getEdgeName: (edgePosition: EdgePosition) => string,
    getCornerName: (cornerPosition: CornerPosition) => string
}

export const PartEditorContext = createContext<PartEditorState | undefined>(undefined);

const PartEditorProvider = (
    {
        part,
        setPart,
        valid,
        setValid,
        children
    }: {
        part?: Part,
        setPart: (part: Part) => void,
        valid: boolean,
        setValid: (valid: boolean) => void,
        children: ReactNode
    }
) => {
    const authState = useContext(AuthContext);
    const errorState = useContext(ErrorContext);
    const resourceState = useContext(ResourceContext);

    const [orderProperties, setOrderProperties] = useState<OrderProperties>();
    const [manufactureProperties, setManufactureProperties] = useState<ManufactureProperties>();
    const [lengthSign, setLengthSign] = useState<string>();

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
        setLengthSign(`[${resourceState?.getUnit(UnitId.MILLIMETER)}]`);
    }, []);

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
                    part,
                    setPart,
                    valid,
                    setValid,
                    setOrderProperties,
                    setManufactureProperties,
                    lengthSign,
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
