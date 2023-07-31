import React, { useEffect, useState } from 'react'
import arrowLeft from '../../assets/icons/arrow-left.svg'
import trashWhite from '../../assets/icons/trashWhite.svg'
import { useNavigate, useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { deleteKalender, storeKalender, updateKalender, updateStateKalender } from '../../features/kalenderSlice'
import dayjs from 'dayjs'
import { showFormError } from '../../features/kalenderSlice'

function NavKalender() {
  let navigate = useNavigate()
  let id = useParams()
  const { isAddPage, judul, kategoriEvent, lokasi, deskripsi, errors, isFormEditted,
    peserta, loading, waktuMulaiLibur, waktuSelesaiLibur, jamMulai, jamSelesai, tanggalMulai, tanggalSelesai, isFormValid
  } = useSelector((state) => state.kalender)
  const dispatch = useDispatch()
  const [showAlertBack, setShowAlertBack] = useState(false)
  const [showAlertUpdate, setShowAlertUpdate] = useState(false)
  const [isFormFilled, setIsFormFilled] = useState(false)

  function handleSubmit() {
    dispatch(showFormError())

    if (isFormValid) {
      setShowAlertUpdate(true)
    }
  }

  function handleApiCreateOrUpdate() {
    const filteredPeserta = peserta.filter(item => item.isChecked === true)

    if (isAddPage) {
      dispatch(storeKalender({
        judul,
        lokasi,
        kategori_event: kategoriEvent,
        waktu_mulai: kategoriEvent === 'libur' ? dayjs(waktuMulaiLibur).format('YYYY-MM-DD') : `${tanggalMulai} ${jamMulai}`,
        waktu_selesai: kategoriEvent === 'libur' ? dayjs(waktuSelesaiLibur).format('YYYY-MM-DD') : `${tanggalSelesai} ${jamSelesai}`,
        deskripsi,
        peserta: filteredPeserta,
      }))
        .then((res) => {
          if (res.meta.requestStatus === "fulfilled") {
            navigate('/kalender')
          }
        })
        .catch((err) => {
          console.log(err);
        })

    } else {
      dispatch(updateKalender({
        id: id.id,
        judul,
        lokasi,
        kategori_event: kategoriEvent,
        waktu_mulai: kategoriEvent === 'libur' ? dayjs(waktuMulaiLibur).format('YYYY-MM-DD') : `${tanggalMulai} ${jamMulai}`,
        waktu_selesai: kategoriEvent === 'libur' ? dayjs(waktuSelesaiLibur).format('YYYY-MM-DD') : `${tanggalSelesai} ${jamSelesai}`,
        deskripsi,
        peserta: filteredPeserta,
      }))
        .then((res) => {
          if (res.meta.requestStatus === "fulfilled") {
            navigate('/kalender')
          }
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }

  function handleDelete() {
    dispatch(deleteKalender(id.id))
      .then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          navigate('/kalender')
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function validateBtnEvent() {
    return (
      judul.trim() !== '' &&
        lokasi?.trim() !== '' &&
        lokasi !== null &&
        jamMulai.trim() !== '' &&
        jamSelesai.trim() !== '' &&
        deskripsi.trim() !== '' &&
        peserta.length !== 0
        ? false : true
    )
  }

  function validateBtnLibur() {
    return judul?.trim() !== '' &&
      kategoriEvent.trim() !== '' &&
      deskripsi.trim() !== '' &&
      peserta.length !== 0
      ? false : true
  }

  useEffect(() => {
    dispatch(updateStateKalender({
      name: 'isFormValid',
      value: kategoriEvent === 'event' ? !validateBtnEvent() : !validateBtnLibur()
    }))
  }, [errors, validateBtnEvent(), validateBtnLibur(), kategoriEvent])

  useEffect(() => {
    if (
      judul.trim() !== ''
      || lokasi.trim() !== ''
      || jamMulai.trim() !== ''
      || jamSelesai.trim() !== ''
      || deskripsi.trim() !== ''
      || peserta.length >= 1
    ) {
      setIsFormFilled(true)
    } else {
      setIsFormFilled(kategoriEvent === 'event' ? !validateBtnEvent() : validateBtnLibur())
    }
  }, [judul, lokasi, jamMulai, jamSelesai, deskripsi, peserta, kategoriEvent])

  function handleBack() {
    if (isFormEditted) {
      setShowAlertBack(true)
    } else {
      navigate(-1)
    }
  }

  return (
    <div className='nav-kalender'>
      <div className='wrapper-back-btn'>
        <img src={arrowLeft} onClick={handleBack} alt="" />
        <h1>Tambah Event</h1>
      </div>
      <div className='wrapper-action-btn'>
        {
          isAddPage ? null :
            <button onClick={handleDelete}>
              <img src={trashWhite} alt="" />
            </button>
        }
        <input
          type="submit"
          value='Konfirmasi'
          className='btn-submit'
          onClick={handleSubmit}
        // disabled={
        //   kategoriEvent === 'event'
        //     ? validateBtnEvent()
        //     : validateBtnLibur()
        // }
        />
      </div>
      {/* {loading ? <div className='loading-fullscreen'><div className='loading'></div></div> : null} */}

      {showAlertBack &&
        <div className='bg-modal'>
          <div className='alert-modal'>
            <h1>{isAddPage ? 'Tambah Event' : 'Edit Event'}</h1>
            <p>Ada perubahan yang belum Anda simpan, Anda yakin ingin membatalkan?</p>
            <div>
              <button onClick={() => setShowAlertBack(false)}>Tidak</button>
              <button onClick={() => navigate(-1)}>Iya</button>
            </div>
          </div>
        </div>
      }

      {showAlertUpdate &&
        <div className='bg-modal'>
          <div className='alert-modal'>
            <h1>{isAddPage ? 'Tambah Event' : 'Edit Event'}</h1>
            <p>Kamu yakin {isAddPage ? 'Tambah Event' : 'Edit Event'}?</p>
            <div>
              <button onClick={() => setShowAlertUpdate(false)}>Tidak</button>
              <button onClick={handleApiCreateOrUpdate}>Iya</button>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default NavKalender