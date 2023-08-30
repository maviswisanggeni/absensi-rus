import React from 'react'
import { OutTable } from 'react-excel-renderer';

function PreviewExcel({ cols, rows }) {
    return (
        <OutTable
            data={rows}
            columns={cols}
            tableClassName="ExcelTable2007"
            tableHeaderRowClass="heading"
        />
    )
}

export default PreviewExcel