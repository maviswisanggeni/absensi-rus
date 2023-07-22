import React from 'react'

function RowTanggal({ keterangan, tgl_mulai_izin, tgl_selesai_izin, tgl_masuk, tgl_pulang }) {
    if (keterangan === 'Absen' || keterangan === 'Sukses') {
        return null;
    }

    return (
        <td>
            <div>
                {keterangan === 'Izin' ? `${tgl_mulai_izin} - ${tgl_selesai_izin}` : null}
                {keterangan === 'Masuk' ? tgl_masuk : null}
                {keterangan === 'Keluar' ? tgl_pulang : null}
            </div>
        </td>
    )
}

export default RowTanggal