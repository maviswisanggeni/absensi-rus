import React from 'react'

function RowJam({ keteranganApi, keteranganState, waktu_masuk, waktu_pulang, isvld_wkt_masuk, isvld_wkt_pulang }) {
    if (keteranganState === 'Izin') {
        return null;
    }

    const isValidMasuk = isvld_wkt_masuk === '1';
    const isValidPulang = isvld_wkt_pulang === '1';
    const isValid = isValidPulang && isValidMasuk;

    return (
        <td>
            <p className={'row__jam ' + (isValid ? 'valid-masuk-text' : 'valid-pulang-text')
            }>
                {keteranganApi === 'masuk' && keteranganState === 'Masuk' ? waktu_masuk : null}
                {keteranganApi === 'pulang' && keteranganState === 'Keluar' ? waktu_pulang : null}
                {keteranganApi === 'masuk' && (keteranganState === 'Absen' || keteranganState === 'Sukses') ? `${waktu_masuk} - ${waktu_masuk}` : null}
                {keteranganApi === 'pulang' && (keteranganState === 'Absen' || keteranganState === 'Sukses') ? `${waktu_pulang} - ${waktu_pulang}` : null}
            </p>
        </td>
    )
}

export default RowJam