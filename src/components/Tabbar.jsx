import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

function Tabbar({ funcPage, funcKeterangan, searchParams, path, options, setKategoriId, setCurrentKategori }) {
  const dispatch = useDispatch()
  let location = useLocation()
  const [current, setCurrent] = useState(null)
  const [index, setIndex] = useState(null)

  useEffect(() => {
    if (options.length > 0) {
      const initialOption = options.find(option => option.kategori === location.pathname.split('/').pop());
      if (initialOption) {
        setCurrent(initialOption.kategori);
        dispatch(setCurrentKategori(initialOption.kategori))
        setIndex(initialOption.id);
      }
    }
  }, [options, location.pathname]);

  function handleClick(kategori, index) {
    setCurrent(kategori)
    setIndex(index)
    funcPage(1)
  }

  useEffect(() => {
    dispatch(funcKeterangan({ name: 'keterangan', value: current }))
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
      <div
        className={`line`}
        style={{ width: lineWidth, transform: `translate(${lineTranslateX}, 0)` }}
      >
      </div>
    </div >
  )
}

// option 3 is optional
Tabbar.defaultProps = {
  option3: ''
}

export default Tabbar