import { useState } from 'react';

import {
    setBusinessConditions,
    setCookiesInfo,
    setGdprInfo,
    setOrderInfo,
    setWorkingHours
} from '../../api/controller/config';
import {
    getBusinessConditions,
    getCookiesInfo,
    getGdprInfo,
    getOrderInfo,
    getWorkingHours
} from '../../api/controller/ui';
import MdEditor from '../../component/app/admin/md-editor';
import WiwaBreadcrumb from '../../component/ui/wiwa-breadcrumb';
import WiwaSelect from '../../component/ui/wiwa-select';
import { useResourceState } from '../../state/resource';

const TEXT_INFO_DIALOG_ID = 'admin-text-info-dialog-';

const TextInfoPage = () => {
    const resourceState = useResourceState();

    const [index, setIndex] = useState(0);

    return (
        <>
            <WiwaBreadcrumb breadcrumbs={[
                {key: 0, label: resourceState?.common?.navigation.adminNav.title || ''},
                {
                    key: 1,
                    label: resourceState?.common?.navigation.adminNav.textInfo || '',
                    to: '/admin/text-info'
                }
            ]}/>
            <div className="flex flex-col p-5 gap-5 w-full">
                <WiwaSelect
                    defaultValue="0"
                    onChange={event => setIndex(Number(event.currentTarget.value))}
                >
                    <option disabled value="0">{resourceState?.admin?.textInfo.option.select}</option>
                    <option value="1">{resourceState?.admin?.textInfo.option.businessConditions}</option>
                    <option value="2">{resourceState?.admin?.textInfo.option.cookiesInfo}</option>
                    <option value="3">{resourceState?.admin?.textInfo.option.gdprInfo}</option>
                    <option value="4">{resourceState?.admin?.textInfo.option.orderInfo}</option>
                    <option value="5">{resourceState?.admin?.textInfo.option.workingHours}</option>
                </WiwaSelect>

                <div>
                    {index == 1 &&
                        <MdEditor
                            dialogId={TEXT_INFO_DIALOG_ID + index}
                            title={resourceState?.admin?.textInfo.businessConditions.title || ''}
                            valueLabel={resourceState?.admin?.textInfo.businessConditions.valueLabel || ''}
                            valuePlaceholder={resourceState?.admin?.textInfo.businessConditions.valuePlaceholder || ''}
                            valueRequired={resourceState?.admin?.textInfo.businessConditions.valueRequired || ''}
                            errorMessage={resourceState?.admin?.textInfo.businessConditions.error || ''}
                            loadValue={getBusinessConditions}
                            saveValue={setBusinessConditions}
                        />
                    }
                    {index == 2 &&
                        <MdEditor
                            dialogId={TEXT_INFO_DIALOG_ID + index}
                            title={resourceState?.admin?.textInfo.cookiesInfo.title || ''}
                            valueLabel={resourceState?.admin?.textInfo.cookiesInfo.valueLabel || ''}
                            valuePlaceholder={resourceState?.admin?.textInfo.cookiesInfo.valuePlaceholder || ''}
                            valueRequired={resourceState?.admin?.textInfo.cookiesInfo.valueRequired || ''}
                            errorMessage={resourceState?.admin?.textInfo.cookiesInfo.error || ''}
                            loadValue={getCookiesInfo}
                            saveValue={setCookiesInfo}
                        />
                    }
                    {index == 3 &&
                        <MdEditor
                            dialogId={TEXT_INFO_DIALOG_ID + index}
                            title={resourceState?.admin?.textInfo.gdprInfo.title || ''}
                            valueLabel={resourceState?.admin?.textInfo.gdprInfo.valueLabel || ''}
                            valuePlaceholder={resourceState?.admin?.textInfo.gdprInfo.valuePlaceholder || ''}
                            valueRequired={resourceState?.admin?.textInfo.gdprInfo.valueRequired || ''}
                            errorMessage={resourceState?.admin?.textInfo.gdprInfo.error || ''}
                            loadValue={getGdprInfo}
                            saveValue={setGdprInfo}
                        />
                    }
                    {index == 4 &&
                        <MdEditor
                            dialogId={TEXT_INFO_DIALOG_ID + index}
                            title={resourceState?.admin?.textInfo.orderInfo.title || ''}
                            valueLabel={resourceState?.admin?.textInfo.orderInfo.valueLabel || ''}
                            valuePlaceholder={resourceState?.admin?.textInfo.orderInfo.valuePlaceholder || ''}
                            valueRequired={resourceState?.admin?.textInfo.orderInfo.valueRequired || ''}
                            errorMessage={resourceState?.admin?.textInfo.orderInfo.error || ''}
                            loadValue={getOrderInfo}
                            saveValue={setOrderInfo}
                        />
                    }
                    {index == 5 &&
                        <MdEditor
                            dialogId={TEXT_INFO_DIALOG_ID + index}
                            title={resourceState?.admin?.textInfo.workingHours.title || ''}
                            valueLabel={resourceState?.admin?.textInfo.workingHours.valueLabel || ''}
                            valuePlaceholder={resourceState?.admin?.textInfo.workingHours.valuePlaceholder || ''}
                            valueRequired={resourceState?.admin?.textInfo.workingHours.valueRequired || ''}
                            errorMessage={resourceState?.admin?.textInfo.workingHours.error || ''}
                            loadValue={getWorkingHours}
                            saveValue={setWorkingHours}
                        />
                    }
                </div>
            </div>
        </>
    )
}

export default TextInfoPage;
