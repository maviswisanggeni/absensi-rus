import React from 'react'
import { MapContainer, TileLayer, Circle, Marker, Popup, useMapEvents } from 'react-leaflet'
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';

function RadiusAbsen() {
    const iconMarker = new L.Icon({
        iconUrl: require('../../assets/icons/pin-map.png'),
        iconRetinaUrl: require('../../assets/icons/pin-map.png'),
        iconSize: new L.Point(26, 26),
    });

    const redOptions = { color: 'red', fillColor: '#f03', fillOpacity: 0 }

    const [latitude, setLatitude] = useState('-6.753622')
    const [longitude, setLongitude] = useState('110.843356')
    const [radius, setRadius] = useState(100)

    function LocationMarker() {
        const [position, setPosition] = useState([])
        const map = useMapEvents({
            click: (e) => {
                const { lat, lng } = e.latlng
                setLatitude(lat)
                setLongitude(lng)
                setPosition(lat, lng)
            }
        })

        return position === null ? null : (
            <Marker position={[latitude, longitude]} icon={iconMarker}>
            </Marker>
        )
    }

    return (
        <div className='radius-absen'>
            <h1>Titik Pusat Radius</h1>
            <div className='container-radius'>
                <div className='radius-info'>
                    <label htmlFor="latitude">Latitude</label>
                    <input type="text" id='latitude' value={latitude} onChange={(e) => setLatitude(e.target.value)} />
                </div>
                <div className='radius-info'>
                    <label htmlFor="longitude">Longitude</label>
                    <input type="text" id='longitude' value={longitude} onChange={(e) => setLongitude(e.target.value)} />
                </div>
                <div className='radius-info'>
                    <label htmlFor="Radius">Radius</label>
                    <input type="number" id='Radius' value={radius} onChange={(e) => setRadius(e.target.value)} />
                </div>
            </div>


            <div className='map'>
                <MapContainer center={[latitude, longitude]} zoom={20} scrollWheelZoom={false} onc>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Circle center={[latitude, longitude]} pathOptions={redOptions} radius={radius} />
                    <Circle center={[latitude, longitude]} pathOptions={redOptions} radius={1} />
                    <LocationMarker />
                </MapContainer>
            </div>
        </div>
    )
}

export default RadiusAbsen