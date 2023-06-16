import React, { useEffect, useState } from 'react'
import SearchDropdown from './SearchDropdown'
import Checkbox from './Checkbox'
import ListPartisipasi from './ListPartisipasi'
import { useDispatch, useSelector } from 'react-redux'
import { deletePesertaByKategori, getKaryawanKalender, resetePeserta, updateListPeserta } from '../../features/kalenderSlice'
import { useParams } from 'react-router'

function PartisipasiEvent() {
  let id = useParams()
  const checkboxOption = [
    { option: 'Semua Karyawan' },
    { option: 'Guru PPLG' },
    { option: 'Guru Animasi' },
    { option: 'Guru DKV' },
    { option: 'Staff' },
  ]

  function checkIsAdd() {
    if (id.id === undefined) {
      return true
    } else {
      return false
    }
  }

  const dispatch = useDispatch()
  const { peserta } = useSelector((state) => state.kalender)
  const { listKategori, loadingKategori } = useSelector((state) => state.kategori)

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isAllKaryawanChecked, setIsAllKaryawanChecked] = useState(false);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prevSelectedCategories) => {
      if (prevSelectedCategories.includes(category)) {
        const pesertaToRemove = peserta.filter((item) =>
          item.ktgkaryawan.some((kategori) => kategori.kategori === category)
        );
        dispatch(deletePesertaByKategori(pesertaToRemove));
        return prevSelectedCategories.filter((c) => c !== category);
      } else {
        return [category, ...prevSelectedCategories];
      }
    });
  };

  const handleAllKaryawanChange = (isChecked) => {
    setIsAllKaryawanChecked(!isAllKaryawanChecked);
    setSelectedCategories([]);
  };

  useEffect(() => {
    // Make the API call based on the selected categories
    const selectedCategoryIds = selectedCategories.map((category) => {
      // Map the category name to the corresponding category ID
      const selectedCategory = listKategori.find(
        (item) => item.kategori === category
      );
      return selectedCategory?.id;
    });

    // console.log('Selected Category IDs:', selectedCategoryIds);
    if (selectedCategoryIds.length > 0) {
      dispatch(getKaryawanKalender({ kategori_id: selectedCategoryIds[0] }))
    }

  }, [selectedCategories]);

  useEffect(() => {
    if (isAllKaryawanChecked) {
      dispatch(getKaryawanKalender({}))
    } else {
      dispatch(resetePeserta())
    }
  }, [isAllKaryawanChecked])

  function handleReset() {
    dispatch(resetePeserta())
    setSelectedCategories([])
  }

  return (
    <div className='wrapper-partisipasi'>
      <h3>Orang yang Berpartisipasi</h3>
      <SearchDropdown />
      <div className='wrapper-checkbox'>
        <div className='wrapper-checkbox-label'>
          <input
            type='checkbox'
            className='custom-checkbox'
            id='Semua Karyawan'
            checked={isAllKaryawanChecked}
            onChange={handleAllKaryawanChange}
          />
          <label htmlFor='Semua Karyawan'>Semua Karyawan</label>
        </div>
        {loadingKategori ? <p>Loading...</p>
          : listKategori.map((item, index) => (
            <div key={index} className='wrapper-checkbox-label'>
              <input
                type='checkbox'
                className='custom-checkbox'
                id={item.kategori}
                checked={selectedCategories.includes(item.kategori)}
                onChange={() => handleCategoryChange(item.kategori)}
              />
              <label htmlFor={item.kategori}>{item.kategori}</label>
            </div>
          ))
        }
      </div>
      <div className='wrapper-top-list'>
        <div>
          <h4>Orang yang diundang</h4>
          <div className='count'>{peserta.filter(peserta => peserta.isChecked === true).length}</div>
        </div>
        <p onClick={handleReset}>Reset</p>
      </div>
      <ListPartisipasi />
    </div>
  )
}

export default PartisipasiEvent