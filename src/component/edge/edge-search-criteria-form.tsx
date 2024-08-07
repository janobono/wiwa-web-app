import { ReactNode, useContext, useEffect, useState } from 'react';
import { ChevronDown, ChevronUp, Search } from 'react-feather';

import SelectCodeListItem from '../code-list/select-code-list-item';
import WiwaFormInputDecimal from '../ui/wiwa-form-input-decimal';
import WiwaFormInputInteger from '../ui/wiwa-form-input-integer';
import WiwaFormInputString from '../ui/wiwa-form-input-string';
import WiwaInput from '../ui/wiwa-input';
import WiwaButton from '../ui/wiwa-button';
import { getEdgeCategories } from '../../api/controller/ui';
import { Category } from '../../api/model';
import { EdgeSearchCriteria } from '../../api/model/edge';
import { CodeListItem } from '../../api/model/code-list';
import { CommonResourceContext } from '../../context';

const EdgeSearchCriteriaForm = ({searchHandler, children}: {
    searchHandler: (criteria: EdgeSearchCriteria) => void
    children?: ReactNode
}) => {
    const commonResourceState = useContext(CommonResourceContext);

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
        <>
            <div className="join join-vertical md:join-horizontal w-full">
                <WiwaInput
                    className="join-item w-full"
                    placeholder={commonResourceState?.resource?.edgeCriteria.searchPlaceholder}
                    value={searchField}
                    onChange={event => setSearchField(event.target.value)}
                    onKeyUp={(event) => {
                        if (event.key === 'Enter') {
                            searchHandler(createCriteria());
                        }
                    }}
                />
                <WiwaButton
                    title={commonResourceState?.resource?.action.search}
                    className="join-item"
                    onClick={() => searchHandler(createCriteria())}
                ><Search size={18}/></WiwaButton>
                <WiwaButton
                    title={commonResourceState?.resource?.action.extendedSearch}
                    className="join-item"
                    onClick={() => setExtended(!extended)}
                >{extended ?
                    <ChevronUp size={18}/>
                    :
                    <ChevronDown size={18}/>
                }</WiwaButton>
                {children}
            </div>


            {extended &&
                <>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-5 w-full">
                        <WiwaFormInputString
                            placeholder={commonResourceState?.resource?.edgeCriteria.codePlaceholder}
                            value={code}
                            setValue={setCode}
                        />
                        <WiwaFormInputString
                            placeholder={commonResourceState?.resource?.edgeCriteria.namePlaceholder}
                            value={name}
                            setValue={setName}
                        />
                        <WiwaFormInputDecimal
                            min="0"
                            placeholder={commonResourceState?.resource?.edgeCriteria.priceFromPlaceholder}
                            value={priceFrom}
                            setValue={setPriceFrom}
                        />
                        <WiwaFormInputDecimal
                            min="0"
                            placeholder={commonResourceState?.resource?.edgeCriteria.priceToPlaceholder}
                            value={priceTo}
                            setValue={setPriceTo}
                        />
                        <WiwaFormInputInteger
                            min="0"
                            placeholder={commonResourceState?.resource?.edgeCriteria.widthFromPlaceholder}
                            value={widthFrom}
                            setValue={setWidthFrom}
                        />
                        <WiwaFormInputInteger
                            min="0"
                            placeholder={commonResourceState?.resource?.edgeCriteria.widthToPlaceholder}
                            value={widthTo}
                            setValue={setWidthTo}
                        />
                        <WiwaFormInputDecimal
                            min="0"
                            placeholder={commonResourceState?.resource?.edgeCriteria.thicknessFromPlaceholder}
                            value={thicknessFrom}
                            setValue={setThicknessFrom}
                        />
                        <WiwaFormInputDecimal
                            min="0"
                            placeholder={commonResourceState?.resource?.edgeCriteria.thicknessToPlaceholder}
                            value={thicknessTo}
                            setValue={setThicknessTo}
                        />
                    </div>

                    {edgeCategories &&
                        <div className="flex flex-col gap-5 w-full">
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
        </>
    )
}

export default EdgeSearchCriteriaForm;
