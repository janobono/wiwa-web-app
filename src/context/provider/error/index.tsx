import { ReactNode, useState } from 'react';

import { ErrorContext } from '../../';
import { WiwaError } from '../../../api/model';

const ErrorProvider = ({children}: { children: ReactNode }) => {
    const [data, setData] = useState<WiwaError[]>([]);

    const addError = (error?: WiwaError) => {
        if (error) {
            const newData = [...data];
            newData.push(error);
            setData(newData);
        }
    }

    const removeError = (index: number) => {
        const newData = [...data];
        newData.splice(index, 1);
        setData(newData);
    }

    return (
        <ErrorContext.Provider
            value={
                {
                    data,
                    addError,
                    removeError
                }
            }
        >{children}
        </ErrorContext.Provider>
    );
}

export default ErrorProvider;
