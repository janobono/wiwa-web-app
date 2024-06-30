import { useContext, useEffect, useState } from 'react';

import { setOrderProperties } from '../../api/controller/config';
import { getOrderProperties } from '../../api/controller/ui';
import { Entry } from '../../api/model';
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
import EntriesEditor from '../../component/app/admin/order-format/entries-editor.tsx';
import CsvReplacementsEditor from '../../component/app/admin/order-format/csv-replacements-editor';
import CsvSeparatorEditor from '../../component/app/admin/order-format/csv-separator-editor';
import WiwaBreadcrumb from '../../component/ui/wiwa-breadcrumb';
import WiwaSelect from '../../component/ui/wiwa-select';
import { AuthContext, ErrorContext, ResourceContext } from '../../context';

const ORDER_FORMAT_DIALOG_ID = 'order-format-dialog-';

const OrderFormatPage = () => {
    const authState = useContext(AuthContext);
    const errorState = useContext(ErrorContext);
    const resourceState = useContext(ResourceContext);

    const [index, setIndex] = useState(0);

    const [busy, setBusy] = useState(false);
    const [value, setValue] = useState<OrderProperties>();

    useEffect(() => {
        getOrderProperties().then(data => setValue(data.data));
    }, []);

    const saveValue = async (newData: OrderProperties) => {
        setBusy(true);
        try {
            if (value) {
                const response = await setOrderProperties(newData, authState?.authToken?.accessToken);

                setValue(response.data);

                if (response.error) {
                    errorState?.addError(response.error);
                }
            }
        } finally {
            setBusy(false);
        }
    }

    const toEntries = (keys: string[], entries?: Entry[]) => {
        if (entries) {
            return keys.map(key => {
                const index = entries.findIndex(item => item.key === key);
                if (index === -1) {
                    return {key, value: key};
                }
                return entries[index];
            });
        }
        return [];
    }

    return (
        <>
            <WiwaBreadcrumb breadcrumbs={[
                {key: 0, label: resourceState?.common?.navigation.adminNav.title || ''},
                {
                    key: 1,
                    label: resourceState?.common?.navigation.adminNav.orderFormat || '',
                    to: '/admin/order-format'
                }
            ]}/>
            <div className="flex flex-col gap-5 p-5 w-full">
                <WiwaSelect
                    defaultValue="0"
                    onChange={event => setIndex(Number(event.currentTarget.value))}
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
                </WiwaSelect>

                {index == 1 &&
                    <EntriesEditor
                        dialogId={ORDER_FORMAT_DIALOG_ID + index}
                        busy={busy}
                        entries={toEntries(Object.values(BoardDimension), value?.dimensions)}
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
                    <EntriesEditor
                        dialogId={ORDER_FORMAT_DIALOG_ID + index}
                        busy={busy}
                        entries={toEntries(Object.values(BoardPosition), value?.boards)}
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
                    <EntriesEditor
                        dialogId={ORDER_FORMAT_DIALOG_ID + index}
                        busy={busy}
                        entries={toEntries(Object.values(EdgePosition), value?.edges)}
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
                    <EntriesEditor
                        dialogId={ORDER_FORMAT_DIALOG_ID + index}
                        busy={busy}
                        entries={toEntries(Object.values(CornerPosition), value?.corners)}
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
                    <EntriesEditor
                        dialogId={ORDER_FORMAT_DIALOG_ID + index}
                        busy={busy}
                        entries={toEntries(Object.values(OrderPattern), value?.pattern)}
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
                    <EntriesEditor
                        dialogId={ORDER_FORMAT_DIALOG_ID + index}
                        busy={busy}
                        entries={toEntries(Object.values(OrderContent), value?.content)}
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
                    <EntriesEditor
                        dialogId={ORDER_FORMAT_DIALOG_ID + index}
                        busy={busy}
                        entries={toEntries(Object.values(OrderPackageType), value?.packageType)}
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
                    <EntriesEditor
                        dialogId={ORDER_FORMAT_DIALOG_ID + index}
                        busy={busy}
                        entries={toEntries(Object.values(CSVColumn), value?.csvColumns)}
                        submitHandler={async (entries) => {
                            if (value) {
                                const newData = {...value};
                                newData.csvColumns = entries;
                                await saveValue(newData);
                            }
                        }}
                    />
                }
            </div>
        </>
    )
}

export default OrderFormatPage;
