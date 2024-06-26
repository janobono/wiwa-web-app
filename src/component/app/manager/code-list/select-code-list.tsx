import { FormEvent } from 'react';

import WiwaSelect from '../../../ui/wiwa-select';
import { CodeList } from '../../../../api/model/code-list';

const SelectCodeList = (
    {
        placeholder,
        value,
        setValue,
        codeLists,
    }: {
        placeholder?: string
        value?: CodeList,
        setValue: (codeList: CodeList) => void,
        codeLists: CodeList[]
    }) => {

    const codeListChangeHandler = (event: FormEvent<HTMLSelectElement>) => {
        const id = Number(event.currentTarget.value);
        const index = codeLists.findIndex(item => item.id === id);
        if (index !== -1) {
            setValue(codeLists[index]);
        }
    }

    return (
        <WiwaSelect
            onChange={event => codeListChangeHandler(event)}
        >
            {placeholder && <option disabled selected={value === undefined}>{placeholder}</option>}
            {codeLists?.map(codeList =>
                <option
                    key={codeList.id}
                    value={codeList.id}>{codeList.code}:{codeList.name}</option>
            )}
        </WiwaSelect>
    )
}

export default SelectCodeList;
