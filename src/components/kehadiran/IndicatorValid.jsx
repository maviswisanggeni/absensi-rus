import React from 'react';

function IndicatorValid({ keterangan, is_valid_masuk, is_valid_pulang, isvld_wkt_masuk, isvld_wkt_pulang }) {

    const isValidMasuk = is_valid_masuk === '1' && isvld_wkt_masuk === '1';
    const isValidPulang = is_valid_pulang === '1' && isvld_wkt_pulang === '1';
    const isValid =
        keterangan === 'Sukses'
        || ((keterangan === 'Absen') && isValidMasuk && isValidPulang)
        || ((keterangan === 'Masuk') && isValidMasuk)
        || ((keterangan === 'Keluar') && isValidPulang)

    return (
        <div
            className={`valid-masuk-pulang 
                ${keterangan === 'Izin' ? 'izin' : isValid ? 'valid' : 'gak-valid'}
            `}
        >
        </div>
    );
}

export default IndicatorValid;

