import React, { useContext, useEffect } from 'react'
import arrow from '../../assets/icons/arrow-kalendar.svg'
import GlobalCalendar from '../../contexts/app/GlobalCalendar'
import dayjs from 'dayjs'
import Button from '../Button'
import { useRef } from 'react'
import { useState } from 'react'
import addEventIcon from '../../assets/icons/add-event.png'
import { getKalender, importEvents, updateStateKalender } from '../../features/kalenderSlice'
import { useDispatch, useSelector } from 'react-redux'
import InfoBox from '../InfoBox'
import LoadingFullscreen from '../LoadingFullscreen'
import { ExcelRenderer } from 'react-excel-renderer';
import PreviewExcel from '../PreviewExcel'

export default function CalendarHeader() {
  const { monthIndex, setMonthIndex, year, setYear } = useContext(GlobalCalendar)
  const { messageResApi, statusResApi, isDisplayMessage } = useSelector(state => state.kalender)
  const dispatch = useDispatch()
  const inputFileRef = useRef(null)
  const [showModal, setShowModal] = useState(false)
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [cols, setCols] = useState([])
  const [rows, setRows] = useState([])

  function handlePrevMonth() {
    setMonthIndex(monthIndex - 1);
  }

  function handleNextMonth() {
    setMonthIndex(monthIndex + 1);
  }

  useEffect(() => {
    setYear(dayjs(new Date(dayjs().year(), monthIndex)).format('YYYY'))
  }, [monthIndex])

  function handleReset() {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );
  }

  function handleChange(e) {
    e.preventDefault();
    setShowModal(true)
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }

    let fileObj = e.target.files[0];
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      }
      else {
        setCols(resp.cols)
        setRows(resp.rows)
      }
    });
  }

  function handleImport() {
    setLoading(true)
    dispatch(importEvents(file))
      .then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          setShowModal(false)
          inputFileRef.current.value = '';
          dispatch(getKalender({
            bulan: monthIndex + 1,
            tahun: year
          }))
          setLoading(false)
        }
      })
  }

  return (
    <header className='header'>
      <div className='left-header'>
        <div className='wrapper-arrow'>
          <div onClick={handlePrevMonth}>
            <img className='arrow' src={arrow} />
          </div>
          <div onClick={handleNextMonth}>
            <img className='arrow arrow-down' src={arrow} />
          </div>
        </div>
        <h2 className='h2'>
          {dayjs(new Date(dayjs().year(), monthIndex)).format('MMMM YYYY')}
        </h2>
        <Button
          text={'Hari ini'}
          onClick={handleReset}
        />
      </div>


      <div className='right-header'>
        <Button
          text={'Import Event'}
          onClick={() => inputFileRef.current.click()}
        />
        <input
          ref={inputFileRef}
          type="file"
          onChange={handleChange}
          accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
        />
      </div>

      {showModal &&
        // <div className='bg-modal'>
        //   <div className='modal-konfirm'>
        //     <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg"
        //       onClick={() => {
        //         setShowModal(false);
        //         if (inputFileRef.current) {
        //           inputFileRef.current.value = '';
        //         }

        //       }}
        //     >
        //       <path fillRule="evenodd" clipRule="evenodd" d="M8.03194 6.50013L12.6826 1.84948C13.1062 1.42591 13.1062 0.741255 12.6826 0.317681C12.259 -0.105894 11.5744 -0.105894 11.1508 0.317681L6.50013 4.96833L1.84948 0.317681C1.42591 -0.105894 0.741255 -0.105894 0.317681 0.317681C-0.105894 0.741255 -0.105894 1.42591 0.317681 1.84948L4.96833 6.50013L0.317681 11.1508C-0.105894 11.5744 -0.105894 12.259 0.317681 12.6826C0.528926 12.8938 0.806254 13 1.08358 13C1.36091 13 1.63824 12.8938 1.84948 12.6826L6.50013 8.03194L11.1508 12.6826C11.362 12.8938 11.6394 13 11.9167 13C12.194 13 12.4713 12.8938 12.6826 12.6826C13.1062 12.259 13.1062 11.5744 12.6826 11.1508L8.03194 6.50013Z" fill="#5A6474" />
        //     </svg>
        //     <img src={addEventIcon} alt="" />
        //     <h3>Import File </h3>
        //     <p>{file?.name}</p>
        //     {/* <button onClick={handleImport}>Konfirmasi</button> */}
        //     <PreviewExcel
        //       cols={cols}
        //       rows={rows}
        //     />
        //   </div>
        // </div>

        <div className='bg-modal wrapper-preview'>
          <div className='modal'>
            <PreviewExcel
              cols={cols}
              rows={rows}
            />

            <div className='container-btn'>
              <div>
                <Button
                  text={'Batal'}
                  onClick={() => {
                    setShowModal(false);
                    if (inputFileRef.current) {
                      inputFileRef.current.value = '';
                    }
                  }}
                  className='button-cancel'
                />

                <Button
                  text={'Konfirmasi'}
                  onClick={handleImport}
                />
              </div>
            </div>
          </div>
        </div>
      }

      <InfoBox
        message={messageResApi}
        status={statusResApi}
        isDisplay={isDisplayMessage}
        setIsDisplay={updateStateKalender}
        stateName='isDisplayMessage'
      />

      <LoadingFullscreen loading={loading} />
    </header>
  )
}
