import React from 'react'
import orang from '../../assets/images/orang.png'

function ListPartisipasi() {
    return (
        <div className='wrapper-column'>
            <div className='wrapper-list'>
                <div className='list-content-left'>
                    <img src={orang} alt="" />
                    <div>
                        <p>Toni Kroos</p>
                        <span>Guru PPLG</span>
                    </div>
                </div>
                <input type="checkbox" />
            </div>
        </div>
    )
}

export default ListPartisipasi