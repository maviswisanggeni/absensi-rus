import React, { useEffect, useRef, useState } from 'react'
import filter from '../assets/icons/filter.svg'
import { useDispatch } from 'react-redux';

function Filter({ setState, option1, option2 }) {
    const filterData = [option1, option2];
    const [open, setOpen] = useState(false);
    const [current, setCurrent] = useState(option1)
    const drop = useRef(null);
    const dispatch = useDispatch()

    function handleClick(e) {
        if (!e.target.closest(`.${drop.current.className}`) && open) {
            setOpen(false);
        }
    }

    useEffect(() => {
        document.addEventListener("click", handleClick);
        return () => {
            document.removeEventListener("click", handleClick);
        };
    });

    useEffect(() => {
        dispatch(setState({ name: 'urutan', value: current }))
    }, [current])

    function log(e) {
        setOpen(false)
        setCurrent(e.innerText)
    }

    return (
        <div className='filter' ref={drop} onClick={() => setOpen(open => !open)}>
            <img src={filter} alt="" />
            {open &&
                <ul>
                    {filterData.map((item, i) => (
                        <li key={i} className={item === current ? 'activeDropdownli' : ''} onClick={(item) => log(item.target)}>
                            {item}
                        </li>
                    ))}
                </ul>
            }
        </div>
    )
}

export default Filter