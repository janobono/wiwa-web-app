const WiwaProductCodeListItems = ({codeListItems}: { codeListItems: number[] }) => {
    return (
        <div className="overflow-x-auto w-full">
            <table className="table table-zebra">
                <tbody>
                {codeListItems.map(id =>
                    <tr key={id}>
                        <th>{id}</th>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )
}

export default WiwaProductCodeListItems;
