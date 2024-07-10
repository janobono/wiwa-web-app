import { useContext, useEffect, useState } from 'react';
import { Copy, Plus, Trash } from 'react-feather';

import { ApplicationImageInfoField } from '../../api/model/application';
import ApplicationImageDialog from '../../component/app/admin/application-images/application-image-dialog';
import ApplicationImageProvider, {
    ApplicationImageContext
} from '../../component/app/admin/application-images/application-image-provider';
import ApplicationImageInfoTable from '../../component/app/admin/application-images/application-image-table';
import WiwaBreadcrumb from '../../component/ui/wiwa-breadcrumb';
import WiwaButton from '../../component/ui/wiwa-button';
import WiwaPageable from '../../component/ui/wiwa-pageable';
import { AdminResourceContext, CommonResourceContext, DialogContext } from '../../context';
import { DialogAnswer, DialogType } from '../../context/model/dialog';

const APPLICATION_IMAGE_DIALOG_ID = 'admin-application-image-dialog-001';

const ApplicationImagesPage = () => {
    const commonResourceState = useContext(CommonResourceContext);

    return (
        <>
            <WiwaBreadcrumb breadcrumbs={[
                {key: 0, label: commonResourceState?.resource?.navigation.adminNav.title || ''},
                {
                    key: 1,
                    label: commonResourceState?.resource?.navigation.adminNav.applicationImages || '',
                    to: '/admin/application-images'
                }
            ]}/>
            <ApplicationImageProvider>
                <ApplicationImagesPageContent/>
            </ApplicationImageProvider>
        </>
    )
}

export default ApplicationImagesPage;

const ApplicationImagesPageContent = () => {
    const applicationImageState = useContext(ApplicationImageContext);
    const dialogState = useContext(DialogContext);
    const adminResourceState = useContext(AdminResourceContext);
    const commonResourceState = useContext(CommonResourceContext);

    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        applicationImageState?.getApplicationInfoImages().then();
    }, []);

    return (
        <>
            <div className="flex flex-col gap-5 p-5 w-full">
                <div className="join">
                    <WiwaButton
                        className="btn-primary join-item"
                        title={commonResourceState?.resource?.action.add}
                        disabled={applicationImageState?.busy}
                        onClick={() => setShowDialog(true)}
                    ><Plus size={18}/>
                    </WiwaButton>

                    <WiwaButton
                        className="btn-ghost join-item"
                        title={commonResourceState?.resource?.action.copy}
                        disabled={applicationImageState?.busy || !applicationImageState?.editEnabled}
                        onClick={() => navigator.clipboard.writeText(
                            window.location.href
                                .replace('admin', 'api/ui')
                            + '/' + applicationImageState?.selected?.fileName)
                        }
                    ><Copy size={18}/>
                    </WiwaButton>

                    <WiwaButton
                        className="btn-accent join-item"
                        title={commonResourceState?.resource?.action.delete}
                        disabled={applicationImageState?.busy || !applicationImageState?.editEnabled}
                        onClick={() => {
                            dialogState?.showDialog({
                                type: DialogType.YES_NO,
                                title: adminResourceState?.resource?.applicationImages.deleteImageQuestionTitle,
                                message: adminResourceState?.resource?.applicationImages.deleteImageQuestionMessage,
                                callback: (answer: DialogAnswer) => {
                                    if (answer === DialogAnswer.YES) {
                                        applicationImageState?.deleteApplicationImage().then();
                                    }
                                }
                            });
                        }}
                    ><Trash size={18}/>
                    </WiwaButton>
                </div>

                <div className="overflow-x-auto">
                    <ApplicationImageInfoTable
                        fields={Object.values(ApplicationImageInfoField)}
                        rows={applicationImageState?.data}
                        selected={applicationImageState?.selected}
                        setSelected={(selected) => applicationImageState?.setSelected(selected)}
                    />
                </div>

                <div className="w-full flex justify-center">
                    <WiwaPageable
                        isPrevious={applicationImageState?.previous || false}
                        previousHandler={() => applicationImageState?.setPage(applicationImageState.page - 1)}
                        page={(applicationImageState?.page || 0) + 1}
                        pageHandler={() => applicationImageState?.getApplicationInfoImages()}
                        isNext={applicationImageState?.next || false}
                        nextHandler={() => applicationImageState?.setPage(applicationImageState.page + 1)}
                        disabled={applicationImageState?.busy}
                    />
                </div>
            </div>

            <ApplicationImageDialog
                dialogId={APPLICATION_IMAGE_DIALOG_ID}
                showDialog={showDialog}
                okHandler={(file) => {
                    applicationImageState?.setApplicationImage(file);
                    setShowDialog(false);
                }}
                cancelHandler={() => setShowDialog(false)}
            />
        </>
    )
}
