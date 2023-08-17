import React from 'react'

function RowJam({ keteranganApi, keteranganState, waktu_masuk, waktu_pulang, isvld_wkt_masuk, isvld_wkt_pulang }) {
    if (keteranganState === 'Izin') {
        return null;
    }

    const isValidMasuk = isvld_wkt_masuk === '1';
    const isValidPulang = isvld_wkt_pulang === '1';

    return (
        <td className='wrapper__row__jam'>
            <p className={'row__jam ' + (isValidMasuk ? 'valid-text' : 'gak-valid-text')
            }>
                {(keteranganApi === 'masuk' || keteranganApi === 'pulang') && keteranganState === 'Masuk' ? waktu_masuk + ' WIB' : null}
                {keteranganApi === 'pulang' && keteranganState === 'Keluar' ? waktu_pulang + ' WIB' : null}
                {keteranganState === 'Absen' || keteranganState === 'Sukses' ? waktu_masuk : null}&nbsp;
            </p>
            <p className={'row__jam ' + (isValidPulang ? 'valid-text' : 'gak-valid-text')}>
                {keteranganApi === 'pulang' && (keteranganState === 'Absen' || keteranganState === 'Sukses') ? ` - ${waktu_pulang}` : null}
            </p>
        </td>
    )
}

export default RowJam