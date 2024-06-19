import { ReactNode, useEffect, useState } from 'react';
import { ChevronDown, ChevronUp, Search } from 'react-feather';

import SelectCodeListItem from '../code-list/select-code-list-item';
import WiwaFormInputDecimal from '../ui/wiwa-form-input-decimal';
import WiwaFormInputString from '../ui/wiwa-form-input-string';
import WiwaInput from '../ui/wiwa-input';
import WiwaButton from '../ui/wiwa-button';
import { getEdgeCategories } from '../../api/controller/ui';
import { Category } from '../../api/model';
import { EdgeSearchCriteria } from '../../api/model/edge';
import { CodeListItem } from '../../api/model/code-list';
import { useResourceState } from '../../state/resource';

const EdgeSearchCriteriaForm = ({searchHandler, children}: {
    searchHandler: (criteria: EdgeSearchCriteria) => void
    children?: ReactNode
}) => {
    const resourceState = useResourceState();

    const [edgeCategories, setEdgeCategories] = useState<Category[]>();

    const [searchField, setSearchField] = useState<string>();
    const [code, setCode] = useState<string>();
    const [name, setName] = useState<string>();
    const [widthFrom, setWidthFrom] = useState<number>();
    const [widthTo, setWidthTo] = useState<number>();
    const [thicknessFrom, setThicknessFrom] = useState<number>();
    const [thicknessTo, setThicknessTo] = useState<number>();
    const [priceFrom, setPriceFrom] = useState<number>();
    const [priceTo, setPriceTo] = useState<number>();
    const [codeListItems, setCodeListItems] = useState<{ codeListId: number, item: CodeListItem }[]>([]);

    const [extended, setExtended] = useState(false);

    useEffect(() => {
        getEdgeCategories().then(data => setEdgeCategories(data?.data));
    }, []);

    useEffect(() => {
        if (!extended) {
            setCode(undefined);
            setName(undefined);
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
                        placeholder={resourceState?.common?.edgeCriteria.searchPlaceholder}
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
                            placeholder={resourceState?.common?.edgeCriteria.codePlaceholder}
                            value={code}
                            setValue={setCode}
                        />
                        <WiwaFormInputString
                            placeholder={resourceState?.common?.edgeCriteria.namePlaceholder}
                            value={name}
                            setValue={setName}
                        />
                        <WiwaFormInputDecimal
                            min="0"
                            placeholder={resourceState?.common?.edgeCriteria.priceFromPlaceholder}
                            value={priceFrom}
                            setValue={setPriceFrom}
                        />
                        <WiwaFormInputDecimal
                            min="0"
                            placeholder={resourceState?.common?.edgeCriteria.priceToPlaceholder}
                            value={priceTo}
                            setValue={setPriceTo}
                        />
                    </div>

                    <div className="flex flex-row gap-5 w-2/3">
                        <WiwaFormInputDecimal
                            min="0"
                            placeholder={resourceState?.common?.edgeCriteria.widthFromPlaceholder}
                            value={widthFrom}
                            setValue={setWidthFrom}
                        />
                        <WiwaFormInputDecimal
                            min="0"
                            placeholder={resourceState?.common?.edgeCriteria.widthToPlaceholder}
                            value={widthTo}
                            setValue={setWidthTo}
                        />
                        <WiwaFormInputDecimal
                            min="0"
                            placeholder={resourceState?.common?.edgeCriteria.thicknessFromPlaceholder}
                            value={thicknessFrom}
                            setValue={setThicknessFrom}
                        />
                        <WiwaFormInputDecimal
                            min="0"
                            placeholder={resourceState?.common?.edgeCriteria.thicknessToPlaceholder}
                            value={thicknessTo}
                            setValue={setThicknessTo}
                        />
                    </div>

                    {edgeCategories &&
                        <div className="flex flex-col gap-5 w-2/3">
                            {edgeCategories.map(category =>
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

export default EdgeSearchCriteriaForm;
