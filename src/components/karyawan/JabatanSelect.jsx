import React from 'react'

function JabatanSelect() {
    return (
        <div className='wrapper-container-jabatan'>
            {listKtgkaryawan.map((item, key) => (
                <div className='container-jabatan' key={key}>
                    <p>{item.kategori}</p>
                    <img src={close} alt="" onClick={() => dispatch(deleteListItemKtgkaryawan({ id: item.id }))} />
                </div>
            ))}
            <div className='container-jabatan btn-plus' onClick={() => setModalActive(true)}>
                <img src={plus} alt="" />
            </div>
            {modalActive && <ModalRole onClose={() => setModalActive(false)} />}
        </div>
    )
}

export default JabatanSelect