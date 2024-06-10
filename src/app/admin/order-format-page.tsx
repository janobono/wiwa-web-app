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
import EntryListEditor from '../../component/app/admin/entry-list-editor.tsx';
import { setOrderProperties } from '../../api/controller/config';
import CsvReplacementsEditor from '../../component/app/admin/csv-replacements-editor.tsx';
import CsvSeparatorEditor from '../../component/app/admin/csv-separator-editor.tsx';

const ORDER_FORMAT_DIALOG_ID = 'order-format-dialog-';

const OrderFormatPage = () => {
    const authState = useAuthState();
    const resourceState = useResourceState();

    const [index, setIndex] = useState(0);

    const [busy, setBusy] = useState(false);
    const [value, setValue] = useState<OrderProperties>();
    const [error, setError] = useState<string>();

    useEffect(() => {
        getOrderProperties().then(data => setValue(data.data));
    }, []);

    const saveValue = async (newData: OrderProperties) => {
        setError(undefined);
        setBusy(true);
        try {
            if (value) {
                const response = await setOrderProperties(newData, authState?.authToken?.accessToken);
                if (response.error) {
                    setError(resourceState?.admin?.orderFormat.error);
                } else {
                    setValue(response.data);
                }
            }
        } finally {
            setBusy(false);
        }
    }

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
                <EntryListEditor
                    dialogId={ORDER_FORMAT_DIALOG_ID + index}
                    busy={busy}
                    keys={Object.values(BoardDimension)}
                    entries={value?.dimensions || []}
                    submitHandler={async (entries) => {
                        if (value) {
                            const newData = {...value};
                            newData.dimensions = entries;
                            await saveValue(newData);
                        }
                    }}
                />
            }

            {index == 2 &&
                <EntryListEditor
                    dialogId={ORDER_FORMAT_DIALOG_ID + index}
                    busy={busy}
                    keys={Object.values(BoardPosition)}
                    entries={value?.boards || []}
                    submitHandler={async (entries) => {
                        if (value) {
                            const newData = {...value};
                            newData.boards = entries;
                            await saveValue(newData);
                        }
                    }}
                />
            }

            {index == 3 &&
                <EntryListEditor
                    dialogId={ORDER_FORMAT_DIALOG_ID + index}
                    busy={busy}
                    keys={Object.values(EdgePosition)}
                    entries={value?.edges || []}
                    submitHandler={async (entries) => {
                        if (value) {
                            const newData = {...value};
                            newData.edges = entries;
                            await saveValue(newData);
                        }
                    }}
                />
            }

            {index == 4 &&
                <EntryListEditor
                    dialogId={ORDER_FORMAT_DIALOG_ID + index}
                    busy={busy}
                    keys={Object.values(CornerPosition)}
                    entries={value?.corners || []}
                    submitHandler={async (entries) => {
                        if (value) {
                            const newData = {...value};
                            newData.corners = entries;
                            await saveValue(newData);
                        }
                    }}
                />
            }

            {index == 5 &&
                <EntryListEditor
                    dialogId={ORDER_FORMAT_DIALOG_ID + index}
                    busy={busy}
                    keys={Object.values(OrderPattern)}
                    entries={value?.pattern || []}
                    submitHandler={async (entries) => {
                        if (value) {
                            const newData = {...value};
                            newData.pattern = entries;
                            await saveValue(newData);
                        }
                    }}
                />
            }

            {index == 6 &&
                <EntryListEditor
                    dialogId={ORDER_FORMAT_DIALOG_ID + index}
                    busy={busy}
                    keys={Object.values(OrderContent)}
                    entries={value?.content || []}
                    submitHandler={async (entries) => {
                        if (value) {
                            const newData = {...value};
                            newData.content = entries;
                            await saveValue(newData);
                        }
                    }}
                />
            }

            {index == 7 &&
                <EntryListEditor
                    dialogId={ORDER_FORMAT_DIALOG_ID + index}
                    busy={busy}
                    keys={Object.values(OrderPackageType)}
                    entries={value?.packageType || []}
                    submitHandler={async (entries) => {
                        if (value) {
                            const newData = {...value};
                            newData.packageType = entries;
                            await saveValue(newData);
                        }
                    }}
                />
            }

            {index == 8 &&
                <CsvSeparatorEditor
                    busy={busy}
                    separator={value?.csvSeparator || ''}
                    submitHandler={async (separator) => {
                        if (value) {
                            const newData = {...value};
                            newData.csvSeparator = separator;
                            await saveValue(newData);
                        }
                    }}
                />
            }

            {index == 9 &&
                <CsvReplacementsEditor
                    dialogId={ORDER_FORMAT_DIALOG_ID + index}
                    busy={busy}
                    entries={value?.csvReplacements || []}
                    submitHandler={async (entries) => {
                        if (value) {
                            const newData = {...value};
                            newData.csvReplacements = entries;
                            await saveValue(newData);
                        }
                    }}
                />
            }

            {index == 10 &&
                <EntryListEditor
                    dialogId={ORDER_FORMAT_DIALOG_ID + index}
                    busy={busy}
                    keys={Object.values(CSVColumn)}
                    entries={value?.csvColumns || []}
                    submitHandler={async (entries) => {
                        if (value) {
                            const newData = {...value};
                            newData.csvColumns = entries;
                            await saveValue(newData);
                        }
                    }}
                />
            }

            {error &&
                <label className="label">
                    <span className="label-text-alt text-error">{error}</span>
                </label>
            }
        </div>
    )
}

export default OrderFormatPage;
