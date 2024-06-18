import { useState } from 'react';

import {
    getBoardMaterialCategory,
    setBoardCategories,
    setBoardMaterialCategory,
    setEdgeCategories
} from '../../api/controller/config';
import { getBoardCategories, getEdgeCategories } from '../../api/controller/ui';
import CategoriesEditor from '../../component/category/categories-editor';
import CategoryEditor from '../../component/category/category-editor';
import WiwaSelect from '../../component/ui/wiwa-select';
import { useResourceState } from '../../state/resource';

const CategoriesPage = () => {
    const resourceState = useResourceState();

    const [index, setIndex] = useState(0);

    return (
        <div className="flex flex-col p-5 gap-5 w-full">
            <WiwaSelect
                defaultValue="0"
                onChange={event => setIndex(Number(event.currentTarget.value))}
            >
                <option disabled value="0">{resourceState?.manager?.categories.option.select}</option>
                <option value="1">{resourceState?.manager?.categories.option.board}</option>
                <option value="2">{resourceState?.manager?.categories.option.edge}</option>
                <option value="3">{resourceState?.manager?.categories.option.material}</option>
            </WiwaSelect>

            <div>
                {index == 1 &&
                    <CategoriesEditor getCategories={getBoardCategories} setCategories={setBoardCategories}/>}
                {index == 2 &&
                    <CategoriesEditor getCategories={getEdgeCategories} setCategories={setEdgeCategories}/>}
                {index == 3 &&
                    <CategoryEditor getCategory={getBoardMaterialCategory} setCategory={setBoardMaterialCategory}/>}
            </div>
        </div>
    )
}

export default CategoriesPage;
