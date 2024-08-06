import PartBasicEditorProvider from './part-basic-editor-provider';
import PartBasicForm from './part-basic-form';
import PartBasicInfo from './part-basic-info';

const PartBasicEditor = () => {
    return (
        <PartBasicEditorProvider>
            <div className="flex flex-col gap-5 w-full overflow-auto">
                <div className="flex flex-row gap-5 min-w-[800px] w-full">
                    <div className="flex flex-col items-start justify-center w-full gap-5">
                        <PartBasicForm/>
                    </div>
                    <div className="flex flex-col border w-full">
                        <PartBasicInfo/>
                    </div>
                </div>
            </div>
        </PartBasicEditorProvider>
    )
}

export default PartBasicEditor;
