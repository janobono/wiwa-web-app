import { useAuthState } from '../../state/auth';
import { useResourceState } from '../../state/resource';
import { useEffect, useState } from 'react';
import {
    BoardDimension,
    BoardPosition,
    CornerPosition,
    CSVColumn,
    EdgePosition,
    OrderContent,
    OrderPackageType,
    OrderPattern,
    OrderProperties
} from '../../api/model/application';
import { getOrderProperties } from '../../api/controller/ui';

const OrderFormatPage = () => {
    const authState = useAuthState();
    const resourceState = useResourceState();

    const [index, setIndex] = useState(0);

    const [busy, setBusy] = useState(false);
    const [value, setValue] = useState<OrderProperties>();

    useEffect(() => {
        getOrderProperties().then(data => setValue(data.data));
    }, []);

    return (
        <div className="flex flex-col p-5 w-full">
            <select
                defaultValue="0"
                className="select select-bordered w-full"
                onChange={event => setIndex(Number(event.target.value))}
            >
                <option disabled value="0">{resourceState?.admin?.orderFormat.option.select}</option>
                <option value="1">{resourceState?.admin?.orderFormat.option.dimensions}</option>
                <option value="2">{resourceState?.admin?.orderFormat.option.boards}</option>
                <option value="3">{resourceState?.admin?.orderFormat.option.edges}</option>
                <option value="4">{resourceState?.admin?.orderFormat.option.corners}</option>
                <option value="5">{resourceState?.admin?.orderFormat.option.pattern}</option>
                <option value="6">{resourceState?.admin?.orderFormat.option.content}</option>
                <option value="7">{resourceState?.admin?.orderFormat.option.packageType}</option>
                <option value="8">{resourceState?.admin?.orderFormat.option.csvSeparator}</option>
                <option value="9">{resourceState?.admin?.orderFormat.option.csvReplacements}</option>
                <option value="10">{resourceState?.admin?.orderFormat.option.csvColumns}</option>
            </select>

            {index == 1 &&
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        <tbody>
                        {Object.values(BoardDimension).map(key =>
                            <tr key={key || ''} className="hover">
                                <td>{key}</td>
                                <td>{value?.dimensions.find(item => item.key === key)?.value || key}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            }

            {index == 2 &&
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        <tbody>
                        {Object.values(BoardPosition).map(key =>
                            <tr key={key || ''} className="hover">
                                <td>{key}</td>
                                <td>{value?.boards.find(item => item.key === key)?.value || key}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            }

            {index == 3 &&
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        <tbody>
                        {Object.values(EdgePosition).map(key =>
                            <tr key={key || ''} className="hover">
                                <td>{key}</td>
                                <td>{value?.edges.find(item => item.key === key)?.value || key}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            }

            {index == 4 &&
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        <tbody>
                        {Object.values(CornerPosition).map(key =>
                            <tr key={key || ''} className="hover">
                                <td>{key}</td>
                                <td>{value?.corners.find(item => item.key === key)?.value || key}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            }

            {index == 5 &&
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        <tbody>
                        {Object.values(OrderPattern).map(key =>
                            <tr key={key || ''} className="hover">
                                <td>{key}</td>
                                <td>{value?.pattern.find(item => item.key === key)?.value || key}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            }

            {index == 6 &&
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        <tbody>
                        {Object.values(OrderContent).map(key =>
                            <tr key={key || ''} className="hover">
                                <td>{key}</td>
                                <td>{value?.content.find(item => item.key === key)?.value || key}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            }

            {index == 7 &&
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        <tbody>
                        {Object.values(OrderPackageType).map(key =>
                            <tr key={key || ''} className="hover">
                                <td>{key}</td>
                                <td>{value?.packageType.find(item => item.key === key)?.value || key}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            }

            {index == 8 && <div>csvSeparator</div>}
            {index == 9 && <div>csvReplacements</div>}

            {index == 10 &&
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
            }
        </div>
    )
}

export default OrderFormatPage;
