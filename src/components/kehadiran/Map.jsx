import React from 'react'
import { MapContainer, TileLayer, Marker, Circle } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useDispatch, useSelector } from 'react-redux';
import Skeleton from 'react-loading-skeleton';

const iconMarker = new L.Icon({
    iconUrl: require('../../assets/icons/marker-location.png'),
    iconRetinaUrl: require('../../assets/icons/marker-location.png'),
    iconSize: new L.Point(26, 36),
});

const redOptions = { color: 'red' }

function Map({ latitude, longitude, loading }) {
    const dispatch = useDispatch()
    const { latitude: latitudeSekolah, longitude: longitudeSekolah, radius, loading: loadingGetKoordinat } = useSelector(state => state.koordinat)

    return (
        <div className='map'>
            {loadingGetKoordinat ? (
                <Skeleton height={500} width={500} />
            ) : (
                <MapContainer center={[latitude, longitude]} zoom={20} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Circle center={[latitudeSekolah, longitudeSekolah]} pathOptions={redOptions} radius={radius} />
                    <Marker position={!loading ? [latitude, longitude] : [latitudeSekolah, longitudeSekolah]} icon={iconMarker}>
                    </Marker>
                </MapContainer>
            )
            }
        </div>
    )
}

export default Map