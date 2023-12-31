import { ApplicationImage } from '../../model/service';

const WiwaProductImages = ({images}: { images: ApplicationImage[] }) => {
    return (
        <div className="overflow-x-auto w-full">
            <table className="table table-zebra">
                <tbody>
                {images.map(image =>
                    <tr key={image.fileName}>
                        <th>{image.fileName}</th>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )
}

export default WiwaProductImages;
