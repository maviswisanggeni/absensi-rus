import React, { useEffect } from 'react'
import { MapContainer, TileLayer, Circle, Marker, Popup, useMapEvents } from 'react-leaflet'
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getKoordinat, updateStateKordinat } from '../../features/koordinatSlice';
import { useRef } from 'react';

function RadiusAbsen() {
    const dispatch = useDispatch()
    const { latitude, longitude, radius, loading, longitudeWhiteEdit, latitudeWhileEdit } = useSelector((state) => state.koordinat)
    const [editActive, setEditActive] = useState(false)
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
                const { lat, lng } = e.latlng
                dispatch(updateStateKordinat({ name: 'latitude', value: lat }))
                dispatch(updateStateKordinat({ name: 'longitude', value: lng }))
                setPosition(lat, lng)
            }
        })

        return position === null ? null : (
            <Marker position={[latitude, longitude]} icon={iconMarker}>
            </Marker>
        )
    }

    function handleEdit() {
        setEditActive(!editActive)
    }

    useEffect(() => {
        if (editActive) {
            btnEdit.current.innerText = 'Simpan'
        } else {
            btnEdit.current.innerText = 'Edit'
        }
    }, [editActive])

    return (
        <div className='radius-absen'>
            <h1>Titik Pusat Radius</h1>
            <div className='container-radius'>
                <div className='radius-info'>
                    <label htmlFor="latitude">Latitude</label>
                    <input type="text" id='latitude' value={latitudeWhileEdit}
                        onChange={(e) => dispatch(updateStateKordinat({ name: 'latitudeWhileEdit', value: e.target.value }))}
                        disabled={!editActive}
                    />
                </div>
                <div className='radius-info'>
                    <label htmlFor="longitude">Longitude</label>
                    <input type="text" id='longitude' value={longitudeWhiteEdit}
                        onChange={(e) => dispatch(updateStateKordinat({ name: 'longitudeWhiteEdit', value: e.target.value }))}
                        disabled={!editActive}
                    />
                </div>
                <div className='radius-info'>
                    <label htmlFor="Radius">Radius</label>
                    <input type="number" id='Radius' value={radius}
                        onChange={(e) => dispatch(updateStateKordinat({ name: 'radius', value: e.target.value }))}
                        disabled={!editActive}
                    />
                </div>

                <button
                    onClick={handleEdit}
                    ref={btnEdit}
                    className={`btn-edit ${editActive ? 'active' : ''}`}
                >
                    Edit
                </button>
            </div>


            <div className='map'>
                {loading ? 'loading...'
                    : <MapContainer center={[latitude, longitude]} zoom={20} scrollWheelZoom={false} onc>
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
        </div>
    )
}

export default RadiusAbsen