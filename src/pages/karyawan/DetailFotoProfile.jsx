import React, { useEffect, useRef, useState } from 'react'
import imgIcon from '../../assets/icons/img-icon.svg'
import { useDispatch, useSelector } from 'react-redux'
import { updateFieldValue } from '../../features/karyawanSlice'
import JabatanSelect from '../../components/karyawan/JabatanSelect'
import useImgError from '../../hooks/useImgError'
import ImageCropper from '../../components/karyawan/imageCropper'

function DetailFotoProfile({ callback }) {
    const dispatch = useDispatch()
    const [image, setImage] = useState(null)
    const [file, setFile] = useState(null)
    const [weekListJadwal, setWeekListJadwal] = useState([])

    const [currentPage, setCurrentPage] = useState("choose-img");
    const [imgAfterCrop, setImgAfterCrop] = useState("");
    const [croppedImgArray, setCroppedImgArray] = useState([]);
    const [imgArray, setImgArray] = useState([]);
    const { nama, niy, linkFoto, listKtgkaryawan, listJadwal } = useSelector(
        (state) => state.karyawan
    );

    const inputRef = useRef(null)

    const handleChange = function (e) {
        e.preventDefault();

        if (e.target.files && e.target.files[0]) {
            // setImage(URL.createObjectURL(e.target.files[0]));
            setFile(e.target.files[0])

            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = function () {
                onImageSelected(reader.result);

                setCroppedImgArray((prevArray) => [...prevArray, reader.result]);
                setImgArray((prevArray) => [...prevArray, e.target.files[0]]);
            };
        }
    };

    useEffect(() => {
        callback(file)
    }, [file])

    const handleTimeChange = (e, index, property) => {
        const { value } = e.target;
        const updatedListJadwal = [...weekListJadwal];

        const updatedItem = { ...updatedListJadwal[index] };

        if (value === '') {
            updatedItem[property] = value;
        } else {
            updatedItem[property] = value + ':00';
        }

        updatedListJadwal[index] = updatedItem;

        dispatch(updateFieldValue({ field: 'listJadwal', value: updatedListJadwal }));
        dispatch(updateFieldValue({ field: 'isFormEditted', value: true }))
    };

    useEffect(() => {
        let listJadwalWeek = [
            {
                hari: 'senin',
                jam_masuk: '',
                jam_pulang: ''
            },
            {
                hari: 'selasa',
                jam_masuk: '',
                jam_pulang: ''
            },
            {
                hari: 'rabu',
                jam_masuk: '',
                jam_pulang: ''
            },
            {
                hari: 'kamis',
                jam_masuk: '',
                jam_pulang: ''
            },
            {
                hari: 'jumat',
                jam_masuk: '',
                jam_pulang: ''
            },
            {
                hari: 'sabtu',
                jam_masuk: '',
                jam_pulang: ''
            },
            {
                hari: 'minggu',
                jam_masuk: '',
                jam_pulang: ''
            }
        ];
        var res = listJadwalWeek.map(obj => listJadwal.find(o => o.hari.toLowerCase() === obj.hari.toLowerCase()) || obj);
        setWeekListJadwal(res)
    }, [listJadwal])

    const onCropDone = (imgCroppedArea) => {
        const canvasEle = document.createElement("canvas");
        canvasEle.width = imgCroppedArea.width;
        canvasEle.height = imgCroppedArea.height;

        const context = canvasEle.getContext("2d");

        let imageObj1 = new Image();
        imageObj1.src = image;
        imageObj1.onload = function () {
            context.drawImage(
                imageObj1,
                imgCroppedArea.x,
                imgCroppedArea.y,
                imgCroppedArea.width,
                imgCroppedArea.height,
                0,
                0,
                imgCroppedArea.width,
                imgCroppedArea.height
            );

            const dataURL = canvasEle.toDataURL("image/jpeg");
            setImgAfterCrop(dataURL);
            setCurrentPage("img-cropped");

            setCroppedImgArray((prevArray) => {
                const updatedArray = [...prevArray];
                if (updatedArray.length === 2) {
                    return updatedArray.slice(1);
                } else {
                    return updatedArray;
                }
            })

            fetch(dataURL)
                .then((res) => res.blob())
                .then((blob) => {
                    const originalFileName = file.name;
                    const croppedFile = new File([blob], originalFileName, {
                        type: "image/jpeg",
                        lastModified: Date.now(),
                    });

                    setFile(croppedFile);

                    setImgArray((prevArray) => {
                        const updatedArray = [...prevArray];
                        updatedArray[updatedArray.length - 1] = croppedFile;
                        if (updatedArray.length === 2) {
                            return updatedArray.slice(1);
                        } else {
                            return updatedArray;
                        }
                    });
                });
        };
    };

    const onCropCancel = () => {
        setCurrentPage("choose-img");

        if (croppedImgArray.length > 1) {
            setCroppedImgArray((prevArray) => prevArray.slice(0, -1));
            setImgArray((prevArray) => prevArray.slice(0, -1));
            setImage(croppedImgArray[croppedImgArray.length - 2]);
            setFile(imgArray[imgArray.length - 2])
        }

        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    const onImageSelected = (selectedImg) => {
        setImage(selectedImg);
        setCurrentPage("crop-img");
    };

    return (
        <div className='detail-profile'>
            <div className='div-1'>
                <h1>Foto Profile</h1>
                <div className='wrapper-img'>
                    <img
                        src={
                            !imgAfterCrop ? linkFoto : imgAfterCrop
                        }
                        onError={useImgError}
                        className='img-profile'
                        alt=""
                    />
                    <div className='edit-img'>
                        <input type="file" ref={inputRef} onChange={handleChange} accept="image/png, image/gif, image/jpeg" />
                        <img src={imgIcon} onClick={() => inputRef.current.click()} />
                    </div>
                </div>

                {currentPage === 'crop-img' &&
                    <ImageCropper
                        image={image}
                        onCropDone={onCropDone}
                        onCropCancel={onCropCancel}
                    />
                }

                {(currentPage === "img-cropped" || imgAfterCrop) &&
                    <div className='wrapper__btn'>
                        <button className='edit__btn' onClick={() => setCurrentPage("crop-img")}>
                            Edit Crop
                        </button>
                        <button className='ganti__btn' onClick={() => inputRef.current.click()}>
                            Ganti gambar
                        </button>
                    </div>
                }

                <h3>{nama}</h3>
                <p>{niy}</p>
            </div>
            <div className='wrapper-jabatan'>
                <div className='select'>
                    <h1 className='select-heading'>Jabatan</h1>
                    {listKtgkaryawan.length < 1 ?
                        <h3>'Karyawan tidak punya kategori</h3>
                        : null
                    }
                    <JabatanSelect />
                </div>
                <div className='jadwal-absensi'>
                    <h1>Jadwal Absensi</h1>
                    {weekListJadwal.map((item, key) => {
                        return (
                            <div key={key} className='container-jadwal'>
                                <p>{item.hari}</p>
                                <div className='container-time'>
                                    <input
                                        type="time"
                                        name={item.jam_masuk}
                                        className='input'
                                        value={item?.jam_masuk}
                                        onChange={e => handleTimeChange(e, key, 'jam_masuk')}
                                    />
                                    <div className='line'></div>
                                    <input
                                        type="time"
                                        name={item.jam_masuk}
                                        className='input'
                                        value={item?.jam_pulang}
                                        onChange={e => handleTimeChange(e, key, 'jam_pulang')}
                                    />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default DetailFotoProfile