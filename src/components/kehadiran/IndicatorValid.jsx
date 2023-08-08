import React from 'react';

function IndicatorValid({ keteranganState, keteranganApi, is_valid_radius_masuk, is_valid_radius_pulang }) {

    const isValidRadiusMasuk = is_valid_radius_masuk === '1';
    const isValidRadiusPulang = is_valid_radius_pulang === '1';

    const isValid =
        keteranganState === 'Sukses' ||
        ((keteranganState === 'Absen' && keteranganApi === 'masuk') && isValidRadiusMasuk) ||
        ((keteranganState === 'Absen' && keteranganApi === 'pulang') && isValidRadiusMasuk && isValidRadiusPulang) ||
        ((keteranganState === 'Masuk') && isValidRadiusMasuk) ||
        ((keteranganState === 'Keluar') && isValidRadiusPulang)

    return (
        <div
            className={`valid-masuk-pulang 
                ${keteranganState === 'Izin' ? 'izin' : isValid ? 'valid' : 'gak-valid'}
            `}
        >
        </div>
    );
}

export default IndicatorValid;

