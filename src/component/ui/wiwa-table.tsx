import React, { PropsWithChildren, ReactNode } from 'react'

interface WiwaTableDataRow {
    key: string,
    dataColumns: ReactNode[]
}

interface WiwaTabsProps extends PropsWithChildren {
    headerColumns: ReactNode[],
    dataRows: WiwaTableDataRow[]
}

const WiwaTable: React.FC<WiwaTabsProps> = (props) => {
    return (
        <table className="w-full text-left border border-collapse rounded sm:border-separate border-blue-200">
            <tbody>
            <tr>
                ${props.headerColumns.map((value, index) =>
                <HeaderColumn key={index}>
                    ${value}
                </HeaderColumn>)}
            </tr>
            ${props.dataRows.map(row =>
                <tr key={row.key}>
                    ${row.dataColumns.map((column, index) => <DataColumn key={index}>${column}</DataColumn>)}
                </tr>
            )}
            </tbody>
        </table>
    )
}

export default WiwaTable;

const HeaderColumn: React.FC<PropsWithChildren> = (props) => {
    return (
        <th
            className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-blue-700 text-blue-700 bg-blue-100"
        >${props.children}</th>
    )
}

const DataColumn: React.FC<PropsWithChildren> = (props) => {
    return (
        <td
            className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-blue-200 stroke-blue-500 text-blue-500"
        >${props.children}</td>
    )
}
