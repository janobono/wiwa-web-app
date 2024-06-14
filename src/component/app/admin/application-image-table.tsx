import WiwaFormCheckBox from '../../ui/wiwa-form-check-box';
import { ApplicationImageInfo, ApplicationImageInfoField } from '../../../api/model/application';
import { useResourceState } from '../../../state/resource';

const ApplicationImageInfoTable = ({fields, applicationImageInfos, selected, setSelected}: {
    fields: ApplicationImageInfoField[],
    applicationImageInfos?: ApplicationImageInfo[],
    selected?: ApplicationImageInfo,
    setSelected: (applicationImageInfo?: ApplicationImageInfo) => void
}) => {
    return (
        <table className="table table-zebra">
            <TableHead fields={fields}/>
            <tbody>
            {applicationImageInfos?.map(applicationImageInfo =>
                <TableRow
                    key={applicationImageInfo.fileName}
                    fields={fields}
                    applicationImageInfo={applicationImageInfo}
                    selected={selected}
                    setSelected={setSelected}
                />)
            }
            </tbody>
        </table>
    )
}

export default ApplicationImageInfoTable;

const TableHead = ({fields}: { fields: ApplicationImageInfoField[] }) => {
    const resourceState = useResourceState();

    return (
        <thead>
        <tr>
            {fields?.find(item => item === ApplicationImageInfoField.fileName) &&
                <th>{resourceState?.common?.applicationImageInfoTable.fileName}</th>
            }
            {fields?.find(item => item === ApplicationImageInfoField.thumbnail) &&
                <th>{resourceState?.common?.applicationImageInfoTable.thumbnail}</th>
            }
            <th></th>
        </tr>
        </thead>
    )
}

const TableRow = ({fields, applicationImageInfo, selected, setSelected}: {
    fields: ApplicationImageInfoField[],
    applicationImageInfo: ApplicationImageInfo,
    selected?: ApplicationImageInfo,
    setSelected: (applicationImageInfo?: ApplicationImageInfo) => void
}) => {
    return (
        <tr
            className="hover"
            onClick={() => setSelected(applicationImageInfo)}
        >
            {fields?.find(item => item === ApplicationImageInfoField.fileName) &&
                <td>{applicationImageInfo.fileName}</td>
            }
            {fields?.find(item => item === ApplicationImageInfoField.thumbnail) &&
                <td>
                    <img
                        className="flex-none w-48 h-48 object-scale-down object-center"
                        src={applicationImageInfo.thumbnail}
                        alt={applicationImageInfo.fileName}
                    />
                </td>
            }
            <td>
                <WiwaFormCheckBox value={applicationImageInfo.fileName === selected?.fileName} setValue={(value) => {
                    if (value) {
                        setSelected(applicationImageInfo);
                    }
                }}/>
            </td>
        </tr>
    )
}
