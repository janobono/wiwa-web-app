import PartFrameEditorProvider from './part-frame-editor-provider';
import PartFrameForm from './part-frame-form';
import PartFrameInfo from './part-frame-info';

const PartFrameEditor = () => {
    return (
        <PartFrameEditorProvider>
            <div className="flex flex-col gap-5 w-full overflow-auto">
                <div className="flex flex-row gap-5 min-w-[800px] w-full">
                    <div className="flex flex-col items-start justify-center w-full gap-5">
                        <PartFrameForm/>
                    </div>
                    <div className="flex flex-col border w-full">
                        <PartFrameInfo/>
                    </div>
                </div>
            </div>
        </PartFrameEditorProvider>
    )
}

export default PartFrameEditor;
