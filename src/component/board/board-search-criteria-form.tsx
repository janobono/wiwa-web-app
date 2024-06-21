import { ReactNode, useEffect, useState } from 'react';
import { ChevronDown, ChevronUp, Search } from 'react-feather';

import SelectCodeListItem from '../code-list/select-code-list-item';
import WiwaFormInputDecimal from '../ui/wiwa-form-input-decimal';
import WiwaFormInputInteger from '../ui/wiwa-form-input-integer';
import WiwaFormInputString from '../ui/wiwa-form-input-string';
import WiwaInput from '../ui/wiwa-input';
import WiwaButton from '../ui/wiwa-button';
import WiwaSelect from '../ui/wiwa-select';
import { getBoardCategories } from '../../api/controller/ui';
import { Category } from '../../api/model';
import { BoardSearchCriteria } from '../../api/model/board';
import { CodeListItem } from '../../api/model/code-list';
import { useResourceState } from '../../state/resource';

const BoardSearchCriteriaForm = ({searchHandler, children}: {
    searchHandler: (criteria: BoardSearchCriteria) => void
    children?: ReactNode
}) => {
    const resourceState = useResourceState();

    const [boardCategories, setBoardCategories] = useState<Category[]>();

    const [searchField, setSearchField] = useState<string>();
    const [code, setCode] = useState<string>();
    const [name, setName] = useState<string>();
    const [boardCode, setBoardCode] = useState<string>();
    const [structureCode, setStructureCode] = useState<string>();
    const [orientation, setOrientation] = useState<boolean>();
    const [lengthFrom, setLengthFrom] = useState<number>();
    const [lengthTo, setLengthTo] = useState<number>();
    const [widthFrom, setWidthFrom] = useState<number>();
    const [widthTo, setWidthTo] = useState<number>();
    const [thicknessFrom, setThicknessFrom] = useState<number>();
    const [thicknessTo, setThicknessTo] = useState<number>();
    const [priceFrom, setPriceFrom] = useState<number>();
    const [priceTo, setPriceTo] = useState<number>();
    const [codeListItems, setCodeListItems] = useState<{ codeListId: number, item: CodeListItem }[]>([]);

    const [extended, setExtended] = useState(false);

    useEffect(() => {
        getBoardCategories().then(data => setBoardCategories(data?.data));
    }, []);

    useEffect(() => {
        if (!extended) {
            setCode(undefined);
            setName(undefined);
            setBoardCode(undefined);
            setStructureCode(undefined);
            setOrientation(undefined);
            setLengthFrom(undefined);
            setLengthTo(undefined);
            setWidthFrom(undefined);
            setWidthTo(undefined);
            setThicknessFrom(undefined);
            setThicknessTo(undefined);
            setPriceFrom(undefined);
            setPriceTo(undefined);
            setCodeListItems([]);
        }
    }, [extended]);

    const createCriteria = () => {
        return {
            searchField,
            code,
            name,
            boardCode,
            structureCode,
            orientation,
            lengthFrom,
            lengthTo,
            widthFrom,
            widthTo,
            thicknessFrom,
            thicknessTo,
            priceFrom,
            priceTo,
            codeListItems: codeListItems.map(item => item.item.code)
        };
    }

    return (
        <div className="flex flex-col w-full items-center justify-center pb-5 gap-5">
            <div className="flex w-2/3">
                <div className="join w-full">
                    <WiwaInput
                        className="join-item w-full"
                        placeholder={resourceState?.common?.boardCriteria.searchPlaceholder}
                        value={searchField}
                        onChange={event => setSearchField(event.target.value)}
                        onKeyUp={(event) => {
                            if (event.key === 'Enter') {
                                searchHandler(createCriteria());
                            }
                        }}
                    />
                    <WiwaButton
                        title={resourceState?.common?.action.search}
                        className="join-item"
                        onClick={() => searchHandler(createCriteria())}
                    ><Search size={18}/></WiwaButton>
                    <WiwaButton
                        title={resourceState?.common?.action.extendedSearch}
                        className="join-item"
                        onClick={() => setExtended(!extended)}
                    >{extended ?
                        <ChevronUp size={18}/>
                        :
                        <ChevronDown size={18}/>
                    }</WiwaButton>
                </div>
                {children}
            </div>

            {extended &&
                <>
                    <div className="flex flex-row gap-5 w-2/3">
                        <WiwaFormInputString
                            placeholder={resourceState?.common?.boardCriteria.codePlaceholder}
                            value={code}
                            setValue={setCode}
                        />
                        <WiwaFormInputString
                            placeholder={resourceState?.common?.boardCriteria.namePlaceholder}
                            value={name}
                            setValue={setName}
                        />
                        <WiwaFormInputString
                            placeholder={resourceState?.common?.boardCriteria.boardCodePlaceholder}
                            value={boardCode}
                            setValue={setBoardCode}
                        />
                        <WiwaFormInputString
                            placeholder={resourceState?.common?.boardCriteria.structureCodePlaceholder}
                            value={structureCode}
                            setValue={setStructureCode}
                        />
                        <WiwaSelect
                            defaultValue="0"
                            onChange={event => {
                                const value = Number(event.currentTarget.value);
                                setOrientation(value === 0 ? undefined : value === 1);
                            }}
                        >
                            <option value="0">{resourceState?.common?.boardCriteria.orientationPlaceholder}</option>
                            <option value="1">{resourceState?.common?.value.yes}</option>
                            <option value="2">{resourceState?.common?.value.no}</option>
                        </WiwaSelect>
                    </div>

                    <div className="flex flex-row gap-5 w-2/3">
                        <WiwaFormInputInteger
                            min="0"
                            placeholder={resourceState?.common?.boardCriteria.lengthFromPlaceholder}
                            value={lengthFrom}
                            setValue={setLengthFrom}
                        />
                        <WiwaFormInputInteger
                            min="0"
                            placeholder={resourceState?.common?.boardCriteria.lengthToPlaceholder}
                            value={lengthTo}
                            setValue={setLengthTo}
                        />
                        <WiwaFormInputInteger
                            min="0"
                            placeholder={resourceState?.common?.boardCriteria.widthFromPlaceholder}
                            value={widthFrom}
                            setValue={setWidthFrom}
                        />
                        <WiwaFormInputInteger
                            min="0"
                            placeholder={resourceState?.common?.boardCriteria.widthToPlaceholder}
                            value={widthTo}
                            setValue={setWidthTo}
                        />
                    </div>

                    <div className="flex flex-row gap-5 w-2/3">
                        <WiwaFormInputInteger
                            min="0"
                            placeholder={resourceState?.common?.boardCriteria.thicknessFromPlaceholder}
                            value={thicknessFrom}
                            setValue={setThicknessFrom}
                        />
                        <WiwaFormInputInteger
                            min="0"
                            placeholder={resourceState?.common?.boardCriteria.thicknessToPlaceholder}
                            value={thicknessTo}
                            setValue={setThicknessTo}
                        />
                        <WiwaFormInputDecimal
                            min="0"
                            placeholder={resourceState?.common?.boardCriteria.priceFromPlaceholder}
                            value={priceFrom}
                            setValue={setPriceFrom}
                        />
                        <WiwaFormInputDecimal
                            min="0"
                            placeholder={resourceState?.common?.boardCriteria.priceToPlaceholder}
                            value={priceTo}
                            setValue={setPriceTo}
                        />
                    </div>
                    {boardCategories &&
                        <div className="flex flex-col gap-5 w-2/3">
                            {boardCategories.map(category =>
                                <SelectCodeListItem
                                    key={category.id}
                                    codeListId={category.id}
                                    itemSelectedHandler={(codeListItem) => {
                                        const newCodeListItems = [...codeListItems];
                                        const index = newCodeListItems.findIndex(item => item.codeListId === category.id);
                                        if (index !== -1) {
                                            newCodeListItems.splice(index, 1);
                                        }
                                        if (codeListItem) {
                                            newCodeListItems.push({codeListId: category.id, item: codeListItem});
                                        }
                                        setCodeListItems(newCodeListItems);
                                    }}
                                />
                            )}
                        </div>
                    }
                </>
            }
        </div>
    )
}

export default BoardSearchCriteriaForm;
