import WiwaSelect from '../../ui/wiwa-select.tsx';

const RotateEditor = () => {
    return (
        <div className="form-control w-full">
            <label className="label">
                            <span className="label-text">
                                {resourceState?.common?.orderItemEditor.orientationLabel}
                            </span>
            </label>
            <WiwaSelect
                defaultValue={orientation ? '1' : '0'}
                onChange={event => setOrientation(Number(event.currentTarget.value) === 1)}
            >
                <option value="1">{resourceState?.common?.value.yes}</option>
                <option value="0">{resourceState?.common?.value.no}</option>
            </WiwaSelect>
        </div>
    )
}

export default RotateEditor;
