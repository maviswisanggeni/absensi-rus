import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

function Tabbar({ options, setKeterangan, searchParams, path, setKategoriId, setCurrentKategori, loading }) {
  const dispatch = useDispatch()
  let location = useLocation()
  const [current, setCurrent] = useState(null)
  const [index, setIndex] = useState(null)

  useEffect(() => {
    if (options.length > 0) {
      const initialOption = options.find(option =>
        option.kategori === decodeURIComponent(location.pathname.split('/').pop())
      );

      if (initialOption) {
        setCurrent(initialOption.kategori);
        dispatch(setCurrentKategori(initialOption.kategori))
        setIndex(initialOption.id);
      }
    }
  }, [location.pathname]);

  function handleClick(kategori, index) {
    setCurrent(kategori)
    setIndex(index)
  }

  useEffect(() => {
    dispatch(setKeterangan({ name: 'keterangan', value: current }))
    dispatch(setKategoriId(index))
  }, [current])

  const lineWidth = `${100 / options.length}%`;
  const lineTranslateX = `${options.findIndex(option => option.kategori === current) * 100}%`;

  return (
    <div className='tabbar'>
      <div className='tabbar-text'>
        {options.map((option, index) => {
          return (
            <Link to={`${path}/${option.kategori}?${searchParams}`} key={index}>
              <div onClick={() => handleClick(option.kategori, option.id)} className={current === option.kategori ? 'active' : ''}>{option.kategori}</div>
            </Link>
          )
        })}
      </div>
      {!loading &&
        <div
          className={`line`}
          style={{ width: lineWidth, transform: `translate(${current ? lineTranslateX : '0%'}, 0)` }}
        >
        </div>
      }
    </div>
  )
}

export default Tabbar