import React from 'react'
import refeshIcons from '../../assets/icons/refresh.svg'

const data = [
  {
      "name": "Leanne Graham",
      "src": "people-1.jpg",
      "niy": "1234567",
      "jabatan": "Guru Produktif PPLG",
      "masuk": '06.44 WIB'
  },
  {
      "name": "Leanne Graham",
      "src": "people-2.jpg",
      "niy": "1234567",
      "jabatan": "Guru Produktif PPLG",
      "masuk": '06.44 WIB'
  },
  {
      "name": "Leanne Graham",
      "src": "Rectangle 35.jpg",
      "niy": "1234567",
      "jabatan": "Guru Produktif PPLG",
      "masuk": '06.44 WIB'
  },
  {
      "name": "Leanne Graham",
      "src": "people-1.jpg",
      "niy": "1234567",
      "jabatan": "Guru Produktif PPLG",
      "masuk": '06.44 WIB'
  },
  {
      "name": "Leanne Graham",
      "src": "people-1.jpg",
      "niy": "1234567",
      "jabatan": "Guru Produktif PPLG",
      "masuk": '06.44 WIB'
  },
  {
      "name": "Leanne Graham",
      "src": "people-1.jpg",
      "niy": "1234567",
      "jabatan": "Guru Produktif PPLG",
      "masuk": '06.44 WIB'
  },
  {
      "name": "Leanne Graham",
      "src": "people-2.jpg",
      "niy": "1234567",
      "jabatan": "Guru Produktif PPLG",
      "masuk": '06.44 WIB'
  },
  {
      "name": "Leanne Graham",
      "src": "Rectangle 35.jpg",
      "niy": "1234567",
      "jabatan": "Guru Produktif PPLG",
      "masuk": '06.44 WIB'
  },
  {
      "name": "Leanne Graham",
      "src": "people-1.jpg",
      "niy": "1234567",
      "jabatan": "Guru Produktif PPLG",
      "masuk": '06.44 WIB'
  },
  {
      "name": "Leanne Graham",
      "src": "people-1.jpg",
      "niy": "1234567",
      "jabatan": "Guru Produktif PPLG",
      "masuk": '06.44 WIB'
  },
  {
      "name": "Leanne Graham",
      "src": "people-1.jpg",
      "niy": "1234567",
      "jabatan": "Guru Produktif PPLG",
      "masuk": '06.44 WIB'
  },
]

function KehadiranTerbaru() {
  return (
    <div className='kehadiran-terbaru'>
        <div className='header-refresh'>
            <h3>Kehadiran Terbaru</h3>
            <img src={refeshIcons} alt="" />
        </div>

        <ul>
          {data.map((item, index) => (
            <li key={index}>
              <img src={require(`../../assets/images/${item.src}`)} alt="" />
              <div>
                <p>{item.name}</p>
                <p>{item.masuk}</p>
              </div>
            </li>
          ))}
        </ul>
    </div>
  )
}

export default KehadiranTerbaru