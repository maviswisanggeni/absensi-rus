import React from 'react'

function Table({ data, columns, loading, onRowClick, onRowDoubleClick, onRowRightClick, onRowMouseEnter, onRowMouseLeave, onRow, onHeaderClick, sortColumn, sortDirection, onScroll, page, pageSize, tableHeight, tableWidth, style, className, tableClassName, headerClassName, rowClassName, cellClassName, headerStyle, rowStyle, cellStyle, noDataComponent, paginationComponent, ...rest }) {
    return (
        <div className={className} style={{ ...style, width: tableWidth, height: tableHeight }}>
            <table className={tableClassName}>
                <thead>
                    <tr>
                        {
                            columns.map((column, key) => {
                                console.log(column)
                                return (
                                    <th key={key} className={headerClassName} style={headerStyle} onClick={() => onHeaderClick(column)}>{column.Header}</th>
                                )
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        !loading ? <tr className='loading loading-table'><td>Loading...</td></tr>
                            : data?.length === 0 ? <tr className='loading-table'><td>Data tidak ditemukan </td></tr>
                                :
                                data?.map((item, key) => {
                                    return (
                                        <tr key={key} className={rowClassName} style={rowStyle} onClick={() => onRowClick(item)}>
                                            {
                                                columns.map((column, key) => {
                                                    return (
                                                        <td key={key} className={column.accessor === 'Nama' ? 'row-img' : column.accessor === 'NIY' ? 'niy-col' : ''} style={cellStyle}>
                                                            {column.accessor === 'Nama' ? <img src={item['Foto']} alt="" /> : ''}
                                                            {item[column.accessor]}
                                                        </td>
                                                    )
                                                })
                                            }
                                        </tr>
                                    )
                                }
                                )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Table