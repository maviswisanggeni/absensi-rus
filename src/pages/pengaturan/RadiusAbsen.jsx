import React, { useEffect } from 'react'
import { MapContainer, TileLayer, Circle, Marker, Popup, useMapEvents, useMap } from 'react-leaflet'
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getKoordinat, inputKordinat, updateKoordinat, updateStateKordinat } from '../../features/koordinatSlice';
import { useRef } from 'react';
import InfoBox from '../../components/InfoBox';

function RadiusAbsen() {
    const dispatch = useDispatch()
    const { latitude, longitude, radius, loading, longitudeWhiteEdit, latitudeWhileEdit, statusResApi, messageResApi, isDisplayMessage } = useSelector((state) => state.koordinat)
    const [isEditing, setIsEditing] = useState(false);
    const btnEdit = useRef()

    useEffect(() => {
        dispatch(getKoordinat())
    }, [])

    const iconMarker = new L.Icon({
        iconUrl: require('../../assets/icons/pin-map.png'),
        iconRetinaUrl: require('../../assets/icons/pin-map.png'),
        iconSize: new L.Point(26, 26),
    });

    const redOptions = { color: 'red', fillColor: '#f03', fillOpacity: 0 }

    function LocationMarker() {
        const [position, setPosition] = useState([])
        const map = useMapEvents({
            click: (e) => {
                if (isEditing) {
                    const { lat, lng } = e.latlng;
                    dispatch(updateStateKordinat({ name: 'latitude', value: lat }));
                    dispatch(updateStateKordinat({ name: 'longitude', value: lng }));
                    dispatch(updateStateKordinat({ name: 'latitudeWhileEdit', value: lat }));
                    dispatch(updateStateKordinat({ name: 'longitudeWhiteEdit', value: lng }));
                    setPosition([lat, lng]);

                }
            },
        })


        return position === null ? null : (
            <Marker position={[latitude, longitude]} icon={iconMarker}>
            </Marker>
        )
    }

    function ChangeView({ center, zoom }) {
        const map = useMap();
        map.setView(center, zoom);
        return null;
    }

    function handleEdit() {
        setIsEditing(!isEditing)
        if (isEditing) {
            console.log('ini ketika di klik simpan');
            dispatch(updateKoordinat({
                latitude,
                longitude,
                radius
            }))
                .then((res) => {
                    if (res.meta.requestStatus === "fulfilled") {
                        dispatch(getKoordinat())
                    }
                })
        }
    }

    useEffect(() => {
        if (isEditing) {
            btnEdit.current.innerText = 'Simpan'
        } else {
            btnEdit.current.innerText = 'Edit'
        }
    }, [isEditing])

    function handleChange(e) {
        const { name, value } = e.target
        dispatch(inputKordinat({
            name,
            value
        }))
    }

    function handleCancel() {
        setIsEditing(false)
        dispatch(getKoordinat())
    }

    return (
        <div className='radius-absen'>
            <h1>Titik Pusat Radius</h1>
            <div className='container-radius'>
                <div className='radius-info'>
                    <label htmlFor="latitude">Latitude</label>
                    <input type="number" id='latitude'
                        name='latitudeWhileEdit'
                        value={latitudeWhileEdit}
                        onChange={handleChange}
                        disabled={!isEditing}
                    />
                </div>
                <div className='radius-info'>
                    <label htmlFor="longitude">Longitude</label>
                    <input type="number" id='longitude'
                        name='longitudeWhiteEdit'
                        value={longitudeWhiteEdit}
                        onChange={handleChange}
                        disabled={!isEditing}
                    />
                </div>
                <div className='radius-info'>
                    <label htmlFor="Radius">Radius</label>
                    <input type="text" id='Radius' value={radius}
                        onChange={(e) => dispatch(updateStateKordinat({ name: 'radius', value: e.target.value }))}
                        disabled={!isEditing}
                    />
                </div>

                <div className='wrapper-btn'>
                    {isEditing && <button
                        onClick={handleCancel}
                        className='btn-cancel'
                    >
                        Cancel
                    </button>}

                    <button
                        onClick={handleEdit}
                        ref={btnEdit}
                        className={`btn-edit ${isEditing ? 'active' : ''}`}
                    >
                        Edit
                    </button>
                </div>
            </div>


            <div className='map'>
                {loading ? 'loading...'
                    : <MapContainer center={[latitude, longitude]} zoom={20} scrollWheelZoom={false}>
                        <ChangeView center={[latitude, longitude]} zoom={20} />

                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Circle center={[latitude, longitude]} pathOptions={redOptions} radius={radius} />
                        <Circle center={[latitude, longitude]} pathOptions={redOptions} radius={1} />
                        <LocationMarker />
                    </MapContainer>
                }
            </div>

            <InfoBox
                message={messageResApi}
                status={statusResApi}
                isDisplay={isDisplayMessage}
                setIsDisplay={updateStateKordinat}
                stateName='isDisplayMessage'
            />
        </div>
    )
}

export default RadiusAbsen