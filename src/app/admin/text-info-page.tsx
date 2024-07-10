import { useContext, useState } from 'react';

import * as apiConfig from '../../api/controller/config';
import * as apiUi from '../../api/controller/ui';
import MdEditor from '../../component/app/admin/text-info/md-editor';
import WiwaBreadcrumb from '../../component/ui/wiwa-breadcrumb';
import WiwaSelect from '../../component/ui/wiwa-select';
import { AdminResourceContext, CommonResourceContext } from '../../context';

const TEXT_INFO_DIALOG_ID = 'admin-text-info-dialog-';

const TextInfoPage = () => {
    const adminResourceState = useContext(AdminResourceContext);
    const commonResourceState = useContext(CommonResourceContext);

    const [index, setIndex] = useState(0);

    return (
        <>
            <WiwaBreadcrumb breadcrumbs={[
                {key: 0, label: commonResourceState?.resource?.navigation.adminNav.title || ''},
                {
                    key: 1,
                    label: commonResourceState?.resource?.navigation.adminNav.textInfo || '',
                    to: '/admin/text-info'
                }
            ]}/>
            <div className="flex flex-col gap-5 p-5 w-full">
                <WiwaSelect
                    defaultValue="0"
                    onChange={event => setIndex(Number(event.currentTarget.value))}
                >
                    <option disabled value="0">{adminResourceState?.resource?.textInfo.option.select}</option>
                    <option value="1">{adminResourceState?.resource?.textInfo.option.businessConditions}</option>
                    <option value="2">{adminResourceState?.resource?.textInfo.option.cookiesInfo}</option>
                    <option value="3">{adminResourceState?.resource?.textInfo.option.gdprInfo}</option>
                    <option value="4">{adminResourceState?.resource?.textInfo.option.orderInfo}</option>
                    <option value="5">{adminResourceState?.resource?.textInfo.option.workingHours}</option>
                </WiwaSelect>

                {index == 1 &&
                    <MdEditor
                        dialogId={TEXT_INFO_DIALOG_ID + index}
                        title={adminResourceState?.resource?.textInfo.businessConditions.title || ''}
                        valueLabel={adminResourceState?.resource?.textInfo.businessConditions.valueLabel || ''}
                        valuePlaceholder={adminResourceState?.resource?.textInfo.businessConditions.valuePlaceholder || ''}
                        valueRequired={adminResourceState?.resource?.textInfo.businessConditions.valueRequired || ''}
                        loadValue={apiUi.getBusinessConditions}
                        saveValue={apiConfig.setBusinessConditions}
                    />
                }
                {index == 2 &&
                    <MdEditor
                        dialogId={TEXT_INFO_DIALOG_ID + index}
                        title={adminResourceState?.resource?.textInfo.cookiesInfo.title || ''}
                        valueLabel={adminResourceState?.resource?.textInfo.cookiesInfo.valueLabel || ''}
                        valuePlaceholder={adminResourceState?.resource?.textInfo.cookiesInfo.valuePlaceholder || ''}
                        valueRequired={adminResourceState?.resource?.textInfo.cookiesInfo.valueRequired || ''}
                        loadValue={apiUi.getCookiesInfo}
                        saveValue={apiConfig.setCookiesInfo}
                    />
                }
                {index == 3 &&
                    <MdEditor
                        dialogId={TEXT_INFO_DIALOG_ID + index}
                        title={adminResourceState?.resource?.textInfo.gdprInfo.title || ''}
                        valueLabel={adminResourceState?.resource?.textInfo.gdprInfo.valueLabel || ''}
                        valuePlaceholder={adminResourceState?.resource?.textInfo.gdprInfo.valuePlaceholder || ''}
                        valueRequired={adminResourceState?.resource?.textInfo.gdprInfo.valueRequired || ''}
                        loadValue={apiUi.getGdprInfo}
                        saveValue={apiConfig.setGdprInfo}
                    />
                }
                {index == 4 &&
                    <MdEditor
                        dialogId={TEXT_INFO_DIALOG_ID + index}
                        title={adminResourceState?.resource?.textInfo.orderInfo.title || ''}
                        valueLabel={adminResourceState?.resource?.textInfo.orderInfo.valueLabel || ''}
                        valuePlaceholder={adminResourceState?.resource?.textInfo.orderInfo.valuePlaceholder || ''}
                        valueRequired={adminResourceState?.resource?.textInfo.orderInfo.valueRequired || ''}
                        loadValue={apiUi.getOrderInfo}
                        saveValue={apiConfig.setOrderInfo}
                    />
                }
                {index == 5 &&
                    <MdEditor
                        dialogId={TEXT_INFO_DIALOG_ID + index}
                        title={adminResourceState?.resource?.textInfo.workingHours.title || ''}
                        valueLabel={adminResourceState?.resource?.textInfo.workingHours.valueLabel || ''}
                        valuePlaceholder={adminResourceState?.resource?.textInfo.workingHours.valuePlaceholder || ''}
                        valueRequired={adminResourceState?.resource?.textInfo.workingHours.valueRequired || ''}
                        loadValue={apiUi.getWorkingHours}
                        saveValue={apiConfig.setWorkingHours}
                    />
                }
            </div>
        </>
    )
}

export default TextInfoPage;
