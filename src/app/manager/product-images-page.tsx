import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Plus, Trash } from 'react-feather';

import ImageDialog from '../../component/dialog/image-dialog';
import { DialogAnswer, DialogType, useDialogState } from '../../component/state/dialog-state-provider';
import { useProductState } from '../../component/state/product-state-provider';
import { useResourceState } from '../../component/state/resource-state-provider';
import WiwaButton from '../../component/ui/wiwa-button';
import { ApplicationImage } from '../../model/service';

const IMAGE_DIALOG_ID = 'image-dialog-001';

const ProductImagesPage = () => {
    const navigate = useNavigate();

    const {productId} = useParams();

    const productState = useProductState();
    const resourceState = useResourceState();

    const [title, setTitle] = useState<string>();
    const [data, setData] = useState<ApplicationImage[]>();
    const [error, setError] = useState<string>();

    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        setError(undefined);
        if (productId) {
            const fetchData = async () => {
                const response = await productState?.getProduct(Number(productId));
                if (response?.data) {
                    setTitle(response.data.code + '-' + response.data.name);
                    setData(response.data.images);
                } else if (response?.error) {
                    setError(resourceState?.manager?.products.product.fetchDataError);
                }
            }
            fetchData().then();
        } else {
            setTitle(undefined);
        }
    }, [productId]);

    const addHandler = async (file: File) => {
        setError(undefined);
        const response = await productState?.addProductImage(Number(productId), file);
        if (response?.data) {
            setShowDialog(false);
            setData(response.data.images);
        } else {
            setError(resourceState?.manager?.products.product.images.addImage.error);
        }
    }

    const deleteHandler = async (fileName: string) => {
        setError(undefined);
        const response = await productState?.deleteProductImage(Number(productId), fileName);
        if (response?.data) {
            setData(response.data.images);
        } else {
            setError(resourceState?.manager?.products.product.images.deleteImage.error);
        }
    }

    return (
        error ?
            <div className="flex flex-col justify-center items-center w-full">
                <div className="font-mono text-xl">{error}</div>
            </div>
            :
            <>
                <div className="flex flex-col p-5 w-full">
                    <div className="flex flex-row w-full items-center justify-center">
                        <div className="label-text text-center grow">
                            {resourceState?.manager?.products.product.images.title + ': ' + title}
                        </div>
                        <div className="join">
                            <WiwaButton
                                className="btn-primary join-item"
                                title={resourceState?.manager?.products.product.images.addImage.title}
                                disabled={productState?.busy}
                                onClick={() => setShowDialog(true)}
                            ><Plus size={18}/>
                            </WiwaButton>

                            <WiwaButton
                                className="btn-secondary join-item"
                                title={resourceState?.manager?.products.product.back}
                                onClick={() => navigate('/manager/products/' + productId)}
                            ><ArrowLeft size={18}/>
                            </WiwaButton>
                        </div>
                    </div>
                    <div className="w-full flex justify-center pt-5">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 items-start w-full">
                            {data?.map(productImage =>
                                <ProductImage
                                    key={productImage.fileName}
                                    applicationImage={productImage}
                                    deleteHandler={deleteHandler}
                                    disabled={productState?.busy}
                                />
                            )}
                        </div>
                    </div>
                </div>

                <ProductImageDialog
                    showDialog={showDialog}
                    okHandler={addHandler}
                    cancelHandler={() => {
                        setError(undefined);
                        setShowDialog(false);
                    }}
                    error={error}
                />
            </>
    )
}

export default ProductImagesPage;

const ProductImage = ({applicationImage, deleteHandler, disabled}: {
    applicationImage: ApplicationImage,
    deleteHandler: (filename: string) => void,
    disabled?: boolean
}) => {
    const dialogState = useDialogState();
    const resourceState = useResourceState();

    return (
        <div className="flex flex-col border border-solid p-5 w-full">
            <div className="flex flex-row justify-end w-full">
                <WiwaButton
                    className="btn-accent"
                    title={resourceState?.manager?.products.product.images.deleteImage.title}
                    disabled={disabled}
                    onClick={() => {
                        dialogState?.showDialog({
                            type: DialogType.YES_NO,
                            title: resourceState?.manager?.products.product.images.deleteImage.title,
                            message: resourceState?.manager?.products.product.images.deleteImage.message,
                            callback: (answer: DialogAnswer) => {
                                if (answer === DialogAnswer.YES) {
                                    deleteHandler(applicationImage.fileName);
                                }
                            }
                        });
                    }}
                ><Trash size={18}/>
                </WiwaButton>
            </div>

            <img
                className="flex-none w-full h-24 object-scale-down object-center"
                src={applicationImage.thumbnail}
                alt={applicationImage.fileName}
                title={applicationImage.fileName}
            />

            <p className="w-full text-center">
                {applicationImage.fileName.length > 25 ? applicationImage.fileName.substring(0, 22) + '...' : applicationImage.fileName}
            </p>
        </div>
    )
}

const ProductImageDialog = ({showDialog, okHandler, cancelHandler, error, disabled}: {
    showDialog: boolean,
    okHandler: (file: File) => void,
    cancelHandler: () => void,
    error?: string,
    disabled?: boolean
}) => {
    const dialogState = useDialogState();
    const resourceState = useResourceState();

    const [file, setFile] = useState<File>();

    useEffect(() => {
        if (!showDialog) {
            setFile(undefined);
        }
    }, [showDialog]);

    const submitHandler = () => {
        if (file) {
            okHandler(file);
        }
    }

    return (!dialogState?.modalRoot ? null : createPortal(
        <ImageDialog
            disabled={disabled}
            id={IMAGE_DIALOG_ID}
            showDialog={showDialog}
            title={resourceState?.manager?.products.product.images.addImage.title}
            label={resourceState?.manager?.products.product.images.addImage.fileLabel}
            required={true}
            placeholder={resourceState?.manager?.products.product.images.addImage.filePlaceholder}
            value={file}
            setValue={setFile}
            validate={() => {
                if (file === undefined) {
                    return {
                        valid: false,
                        message: resourceState?.manager?.products.product.images.addImage.fileRequired
                    }
                }
                if (!(file.type === 'image/jpeg' || file.type === 'image/png')) {
                    return {
                        valid: false,
                        message: resourceState?.manager?.products.product.images.addImage.fileFormat
                    }
                }
                return {valid: true};
            }}
            error={error}
            okHandler={submitHandler}
            cancelHandler={cancelHandler}
        />, dialogState.modalRoot))
}
