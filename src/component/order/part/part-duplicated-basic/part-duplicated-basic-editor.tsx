import PartDuplicatedBasicEditorProvider from './part-duplicated-basic-editor-provider';
import PartDuplicatedBasicForm from './part-duplicated-basic-form';
import PartDuplicatedBasicInfo from './part-duplicated-basic-info';

const PartDuplicatedBasicEditor = () => {
    return (
        <PartDuplicatedBasicEditorProvider>
            <div className="flex flex-col gap-5 w-full overflow-auto">
                <div className="flex flex-row gap-5 min-w-[800px] w-full">
                    <div className="flex flex-col items-start justify-center w-full gap-5">
                        <PartDuplicatedBasicForm/>
                    </div>
                    <div className="flex flex-col border w-full">
                        <PartDuplicatedBasicInfo/>
                    </div>
                </div>
            </div>
        </PartDuplicatedBasicEditorProvider>
    )
}

export default PartDuplicatedBasicEditor;
