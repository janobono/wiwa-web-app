import { CSVColumn } from '../../../api/model/application';

const EntryListEditor = () => {
    return(
        <>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <tbody>
                    {Object.values(CSVColumn).map(key =>
                        <tr key={key || ''} className="hover">
                            <td>{key}</td>
                            <td>{value?.csvColumns.find(item => item.key === key)?.value || key}</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default EntryListEditor;
