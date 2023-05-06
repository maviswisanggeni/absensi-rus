import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import arrowLeft from '../../assets/icons/arrow-left.svg'
import '../../styles/css/Karyawan.css'
import EditForm from './EditForm'
import DetailFotoProfile from './DetailFotoProfile'
import axios from 'axios'
import { useApiKaryawanUpdate } from '../../contexts/api/karyawan/ContextApiKaryawanEdit'
import { useWrapperEditKaryawan } from '../../contexts/app/WrapperEditKaryawan'
import { useDispatch } from 'react-redux'
import { detailKaryawan } from '../../features/karyawanSlice'

function DetailKaryawan() {
    let userId = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(detailKaryawan(userId.id))
    }, [userId])
    // const { listPengajar, listStaff } = useSelector(state => state.karyawan)

    const [detail, setDetail] = useState([]);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token");  
    const context = useApiKaryawanUpdate()
    const contextValidator = useWrapperEditKaryawan()
    let navigate = useNavigate()

        useEffect(() => {
        async function getData() {
            const url = "https://absensiguru.smkrus.com/api/karyawan/edit/" + userId.id
            setLoading(false);
            axios.get(
                url,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    setDetail(response.data.user);
                    context.setNama(response.data.user.nama)
                    context.setEmail(response.data.user.email)
                    context.setAlamat(response.data.user.alamat)
                    context.setnoHp(response.data.user.no_hp)
                    context.setjenisUser(response.data.user.jenis_user)
                    setLoading(true);
                }).catch((error) => {
                    console.log(error);
                })
        }
        getData();
    }, [userId]);

    function updateUser(e) {
        e.preventDefault();
        context.updateUser().then(() => {
            navigate('/karyawan')
        })
    }

    return (
        <form className='detail-karyawan' onSubmit={updateUser}>
            <div className='navigation'>
                <div>
                    <Link to={'/karyawan'}>
                        <img src={arrowLeft} alt="" />
                    </Link>
                    <h1>Detail Karyawan</h1>
                </div>

                <input disabled={
                    context.nama && context.email 
                    && context.noHp && context.alamat &&
                    contextValidator.validatorNama && contextValidator.validatorEmail
                    && contextValidator.validatorNoHP && contextValidator.validatorAlamat
                    ? false : true
                } 
                type="submit" value='Konfirmasi' className='btn-submit'/>
            </div>
            <div className='detail-form'>
                <EditForm detailData={detail}/>
                <DetailFotoProfile detailData={detail}/>
            </div>
            {!loading ? <div className='loading-fullscreen'><div className='loading'></div></div> : null}
        </form>
    )
}

export default DetailKaryawan