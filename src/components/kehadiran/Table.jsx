import React from 'react'
// import people from '../../assets/images/people-1 .jpg'

function Table() {
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
    ]
  return (
    <table className='table'>
        <thead>
            <tr>
                <th>Nama</th>
                <th>NIY</th>
                <th>Jabatan</th>
                <th>Masuk</th>
                <th>Action</th>
            </tr>
        </thead>

        <tbody>
            {data.map((e, i) => (
                <tr key={i}>
                    <td className='row-img'>
                        <img src={require(`../../assets/images/${e.src}`)} alt="" />
                        {e.name}
                    </td>
                    <td>{e.niy}</td>
                    <td>{e.jabatan}</td>
                    <td>{e.masuk}</td>
                    <td><button className='btn-detail'>Detail</button></td>
                </tr>
            ))}
        </tbody>
    </table>
  )
}

export default Table