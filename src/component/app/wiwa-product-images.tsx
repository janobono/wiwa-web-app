import { ApplicationImage } from '../../model/service';
import { twMerge } from 'tailwind-merge';
import { useEffect, useState } from 'react';
import { useDialogState } from '../state/dialog-state-provider.tsx';
import { createPortal } from 'react-dom';
import BaseDialog from '../dialog/base-dialog.tsx';
import { useUiState } from '../state/ui-state-provider.tsx';

const WiwaProductImages = ({imageDialogId, id, images, className}: {
    imageDialogId: string,
    id: number,
    images: ApplicationImage[],
    className?: string
}) => {

    const [fileName, setFileName] = useState<string>();
    const [showDialog, setShowDialog] = useState(false);

    return (
        <>
            <div className={twMerge(`carousel ${className ?? ''}`)}>
                {images.map(image =>
                    <div
                        key={image.fileName}
                        className="carousel-item hover:cursor-pointer"
                        onClick={() => {
                            setFileName(image.fileName);
                            setShowDialog(true);
                        }}
                    >
                        <img src={image.thumbnail} alt={image.fileName}/>
                    </div>
                )}
            </div>

            <ImageDialog
                imageDialogId={imageDialogId}
                showDialog={showDialog}
                setShowDialog={setShowDialog}
                id={id}
                fileName={fileName}
            />
        </>
    )
}

export default WiwaProductImages;

const ImageDialog = ({imageDialogId, showDialog, setShowDialog, id, fileName}: {
    imageDialogId: string,
    showDialog: boolean,
    setShowDialog: (showDialog: boolean) => void,
    id: number,
    fileName?: string
}) => {
    const dialogState = useDialogState();
    const uiState = useUiState();

    const [imageUrl, setImageUrl] = useState<string>();

    useEffect(() => {
        if (fileName) {
            setImageUrl(uiState?.getProductImageUrl(id, fileName));
        }
    }, [showDialog, fileName]);

    return (!dialogState?.modalRoot ? null : createPortal(
        <BaseDialog id={imageDialogId} showDialog={showDialog} closeHandler={() => setShowDialog(false)}>
            <div className="flex flex-row w-full items-center justify-center">
                <img
                    src={imageUrl}
                    alt={fileName}
                />
            </div>
        </BaseDialog>
        , dialogState.modalRoot))
}
