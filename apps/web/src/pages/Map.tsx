import '../index.css';
import './Map.css';
import { ImageOverlay, MapContainer, Marker, Polygon, TileLayer, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useMemo, useRef, useState } from 'react';

const Map = () => {
    const center = {
        lat: 46.25,
        lng: 20.117,
    };
    const DraggableMarker = () => {
        const [position, setPosition] = useState(center);
        const markerRef = useRef(null);
        const eventHandlers = useMemo(
            () => ({
                dragend() {
                    const marker = markerRef.current;
                    if (marker != null && marker != undefined) {
                        setPosition(marker.getLatLng());
                    }
                },
            }),
            [],
        );

        return (
            <Marker
                draggable={true}
                eventHandlers={eventHandlers}
                position={position}
                ref={markerRef}
            >
                <Tooltip permanent>
                    <span>{`lat: ${position.lat.toFixed(5)}, lon:${position.lng.toFixed(5)}`}</span>
                </Tooltip>
            </Marker>
        );
    };

    return (
        <main className="Map">
            <MapContainer center={center} zoom={17}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    zIndex={1}
                />
                <ImageOverlay
                    opacity={0.0}
                    url={'map.svg'}
                    bounds={[
                        [46.2456901 /* BOTTOM */, 20.1090001 /* LEFT */],
                        [46.2539001 /* TOP    */, 20.1262301 /* RIGHT */],
                    ]}
                />
                <DraggableMarker />
                <ImageOverlay
                    url={'icon.png'}
                    bounds={[
                        [46.25, 20.117],
                        [46.2505, 20.1176],
                    ]}
                />
                {/* Old Door */}
                <Marker position={[46.25347, 20.11551]}></Marker>
                {/* Main Door */}
                <Marker position={[46.25165, 20.11815]} />
                {/* Staff */}
                <Marker position={[46.24825, 20.1159]} />

                <Polygon
                    positions={[
                        [46.25187, 20.11511],
                        [46.25222, 20.11512],
                        [46.25221, 20.11454],
                        [46.25185, 20.11453],
                        [46.25181, 20.11459],
                    ]}
                >
                    <Tooltip permanent>001</Tooltip>
                </Polygon>
                <Polygon
                    positions={[
                        [46.25259, 20.11515],
                        [46.25232, 20.11513],
                        [46.25229, 20.11509],
                        [46.2523, 20.11467],
                        [46.25254, 20.11467],
                        [46.25255, 20.11485],
                        [46.25258, 20.11489],
                        [46.25258, 20.11497],
                        [46.25262, 20.11497],
                        [46.25262, 20.11507],
                    ]}
                >
                    <Tooltip permanent>002</Tooltip>
                </Polygon>
            </MapContainer>
        </main>
    );
};

export default Map;
