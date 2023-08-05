import React, { useRef, useState } from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

function Tabbar({ options, setKeterangan, searchParams, path, setKategoriId, setCurrentKategori, loading }) {
  const dispatch = useDispatch()
  let location = useLocation()
  const [current, setCurrent] = useState(null)
  const [index, setIndex] = useState(null)
  const refs = useRef(options.map(React.createRef))
  const [lineWidth, setLineWidth] = useState(0);
  const [lineTranslateX, setLineTranslateX] = useState(0);

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

  useEffect(() => {
    dispatch(setKeterangan({ name: 'keterangan', value: current }));
    dispatch(setKategoriId(index));

    const activeElement = refs.current.find(ref => ref.current.className === 'active');

    if (activeElement) {
      const width = activeElement.current.offsetWidth;
      const left = activeElement.current.offsetLeft;
      setLineWidth(width);
      setLineTranslateX(left + 'px');

      const container = document.querySelector('.tabbar');
      container.scrollLeft = left + width / 2 - container.offsetWidth / 2;
    }
  }, [current]);

  return (
    <div className='tabbar'>
      <div className='tabbar-text'>
        {options.map((option, index) => {
          return (
            <Link to={`${path}/${option.kategori}?${searchParams}`} key={index} ref={refs.current[index]}
              className={current === option.kategori ? 'active' : ''}
            >
              <div
                onClick={() => handleClick(option.kategori, option.id)}
                className={current === option.kategori ? 'active' : ''}
              >
                {option.kategori}
              </div>
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