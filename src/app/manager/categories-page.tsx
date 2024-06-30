import { useContext, useState } from 'react';

import {
    getBoardMaterialCategory,
    setBoardCategories,
    setBoardMaterialCategory,
    setEdgeCategories
} from '../../api/controller/config';
import { getBoardCategories, getEdgeCategories } from '../../api/controller/ui';
import CategoriesEditor from '../../component/app/manager/categories/categories-editor';
import CategoryEditor from '../../component/app/manager/categories/category-editor';
import WiwaBreadcrumb from '../../component/ui/wiwa-breadcrumb';
import WiwaSelect from '../../component/ui/wiwa-select';
import { ResourceContext } from '../../context';

const CategoriesPage = () => {
    const resourceState = useContext(ResourceContext);

    const [index, setIndex] = useState(0);

    return (
        <>
            <WiwaBreadcrumb breadcrumbs={[
                {key: 0, label: resourceState?.common?.navigation.managerNav.title || ''},
                {
                    key: 1,
                    label: resourceState?.common?.navigation.managerNav.categories || '',
                    to: '/manager/categories'
                }
            ]}/>
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

                {index == 1 &&
                    <CategoriesEditor getCategories={getBoardCategories} setCategories={setBoardCategories}/>}
                {index == 2 &&
                    <CategoriesEditor getCategories={getEdgeCategories} setCategories={setEdgeCategories}/>}
                {index == 3 &&
                    <CategoryEditor getCategory={getBoardMaterialCategory} setCategory={setBoardMaterialCategory}/>}
            </div>
        </>
    )
}

export default CategoriesPage;
