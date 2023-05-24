import React from 'react'
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const iconMarker = new L.Icon({
    iconUrl: require('../../assets/icons/marker-location.png'),
    iconRetinaUrl: require('../../assets/icons/marker-location.png'),
    iconSize: new L.Point(26, 36),
});

const redOptions = { color: 'red' }

function Map({ latitude, longitude, loading }) {
    return (
        <div className='map'>
            <MapContainer center={[-6.753622, 110.843356]} zoom={20} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Circle center={[-6.7535586, 110.843736]} pathOptions={redOptions} radius={100} />
                <Marker position={loading ? [latitude, longitude] : [-6.7535586, 110.843736]} icon={iconMarker}>
                </Marker>
            </MapContainer>
        </div>
    )
}

export default Map