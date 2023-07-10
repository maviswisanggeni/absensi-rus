import React from 'react'

function DisplayKategoriList({ list }) {
    return (
        <>
            {list?.length === 0 && 'Tidak ada kategori'}
            {list?.map((itemKategori, index) => (
                <React.Fragment key={itemKategori?.id}>
                    {itemKategori?.kategori}
                    {index !== list?.length - 1 && ','}{' '}
                </React.Fragment>
            ))}
        </>
    )
}

export default DisplayKategoriList