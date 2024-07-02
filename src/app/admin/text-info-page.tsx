import { useContext, useState } from 'react';

import * as apiConfig from '../../api/controller/config';
import * as apiUi from '../../api/controller/ui';
import MdEditor from '../../component/app/admin/text-info/md-editor';
import WiwaBreadcrumb from '../../component/ui/wiwa-breadcrumb';
import WiwaSelect from '../../component/ui/wiwa-select';
import { ResourceContext } from '../../context';

const TEXT_INFO_DIALOG_ID = 'admin-text-info-dialog-';

const TextInfoPage = () => {
    const resourceState = useContext(ResourceContext);

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
            <div className="flex flex-col gap-5 p-5 w-full">
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

                {index == 1 &&
                    <MdEditor
                        dialogId={TEXT_INFO_DIALOG_ID + index}
                        title={resourceState?.admin?.textInfo.businessConditions.title || ''}
                        valueLabel={resourceState?.admin?.textInfo.businessConditions.valueLabel || ''}
                        valuePlaceholder={resourceState?.admin?.textInfo.businessConditions.valuePlaceholder || ''}
                        valueRequired={resourceState?.admin?.textInfo.businessConditions.valueRequired || ''}
                        loadValue={apiUi.getBusinessConditions}
                        saveValue={apiConfig.setBusinessConditions}
                    />
                }
                {index == 2 &&
                    <MdEditor
                        dialogId={TEXT_INFO_DIALOG_ID + index}
                        title={resourceState?.admin?.textInfo.cookiesInfo.title || ''}
                        valueLabel={resourceState?.admin?.textInfo.cookiesInfo.valueLabel || ''}
                        valuePlaceholder={resourceState?.admin?.textInfo.cookiesInfo.valuePlaceholder || ''}
                        valueRequired={resourceState?.admin?.textInfo.cookiesInfo.valueRequired || ''}
                        loadValue={apiUi.getCookiesInfo}
                        saveValue={apiConfig.setCookiesInfo}
                    />
                }
                {index == 3 &&
                    <MdEditor
                        dialogId={TEXT_INFO_DIALOG_ID + index}
                        title={resourceState?.admin?.textInfo.gdprInfo.title || ''}
                        valueLabel={resourceState?.admin?.textInfo.gdprInfo.valueLabel || ''}
                        valuePlaceholder={resourceState?.admin?.textInfo.gdprInfo.valuePlaceholder || ''}
                        valueRequired={resourceState?.admin?.textInfo.gdprInfo.valueRequired || ''}
                        loadValue={apiUi.getGdprInfo}
                        saveValue={apiConfig.setGdprInfo}
                    />
                }
                {index == 4 &&
                    <MdEditor
                        dialogId={TEXT_INFO_DIALOG_ID + index}
                        title={resourceState?.admin?.textInfo.orderInfo.title || ''}
                        valueLabel={resourceState?.admin?.textInfo.orderInfo.valueLabel || ''}
                        valuePlaceholder={resourceState?.admin?.textInfo.orderInfo.valuePlaceholder || ''}
                        valueRequired={resourceState?.admin?.textInfo.orderInfo.valueRequired || ''}
                        loadValue={apiUi.getOrderInfo}
                        saveValue={apiConfig.setOrderInfo}
                    />
                }
                {index == 5 &&
                    <MdEditor
                        dialogId={TEXT_INFO_DIALOG_ID + index}
                        title={resourceState?.admin?.textInfo.workingHours.title || ''}
                        valueLabel={resourceState?.admin?.textInfo.workingHours.valueLabel || ''}
                        valuePlaceholder={resourceState?.admin?.textInfo.workingHours.valuePlaceholder || ''}
                        valueRequired={resourceState?.admin?.textInfo.workingHours.valueRequired || ''}
                        loadValue={apiUi.getWorkingHours}
                        saveValue={apiConfig.setWorkingHours}
                    />
                }
            </div>
        </>
    )
}

export default TextInfoPage;
