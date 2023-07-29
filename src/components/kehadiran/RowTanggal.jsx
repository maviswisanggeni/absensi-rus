import dayjs from 'dayjs';
import React from 'react'

function RowTanggal({ keterangan, tgl_mulai_izin, tgl_selesai_izin, tgl_masuk, tgl_pulang }) {
    if (keterangan === 'Absen' || keterangan === 'Sukses') {
        return null;
    }

    return (
        <td>
            <div>
                {keterangan === 'Izin' ? `${dayjs(tgl_mulai_izin).format('ddd, DD MMM YYYY')} - ${dayjs(tgl_selesai_izin).format('ddd, DD MMM YYYY')}` : null}
                {keterangan === 'Masuk' ? tgl_masuk : null}
                {keterangan === 'Keluar' ? tgl_pulang : null}
            </div>
        </td>
    )
}

export default RowTanggal