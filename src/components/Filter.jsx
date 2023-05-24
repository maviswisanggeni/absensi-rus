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
    }, []);

    useEffect(() => {
        dispatch(setState({ name: 'urutan', value: current }))
        // props.setState(current)
        // if (current === 'Tercepat') {
        //     props.setlist1(props.list1.reverse())
        //     props.setlist2(props.list2.reverse())
        // } else if(current === 'Terlambat') {
        //     props.setlist1(props.list1?.reverse())
        //     props.setlist2(props.list2?.reverse())
        // }
        // else if(current === 'Sesuai abjad') {
        //     props.setlist1(props.list1?.sort((a, b) => a.nama?.localeCompare(b.nama)))
        //     props.setlist2(props.list2?.sort((a, b) => a.nama?.localeCompare(b.nama)))
        // }
        // else{
        //     props.setlist1(props.list1?.sort((a, b) => a.niy.localeCompare(b.niy)))
        //     props.setlist2(props.list2?.sort((a, b) => a.niy.localeCompare(b.niy)))
        // }
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