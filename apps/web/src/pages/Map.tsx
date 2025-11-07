import { ImageOverlay, MapContainer, Marker, Polygon, TileLayer, Tooltip } from 'react-leaflet';
import type { LatLngBoundsExpression, Marker as LeafletMarker } from 'leaflet';
import { useMemo, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import '../index.css';
import './Map.css';

const Map = () => {
    const center = {
        lat: 46.25,
        lng: 20.117,
    };

    const bounds: LatLngBoundsExpression = [
        [46.24569 /* BOTTOM */, 20.109 /* LEFT */],
        [46.2539 /* TOP    */, 20.12623 /* RIGHT */],
    ];

    const DraggableMarker = () => {
        const [position, setPosition] = useState(center);
        const markerRef = useRef<LeafletMarker | null>(null);
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
            <MapContainer center={center} zoom={20}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    zIndex={1}
                />
                <ImageOverlay opacity={1} url={'map.svg'} bounds={bounds} />
                <ImageOverlay opacity={1} url={'paths.svg'} bounds={bounds} />
                <ImageOverlay opacity={0.6} url={'cages.svg'} bounds={bounds} />
                {/*
                <DraggableMarker />
                <ImageOverlay
                    url={'icon.png'}
                    bounds={[
                        [46.25, 20.117],
                        [46.2505, 20.1176],
                    ]}
                />
                <Marker position={[46.25347, 20.11551]}></Marker>
                <Marker position={[46.25165, 20.11815]} />
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
                </Polygon>{' '}
                */}
            </MapContainer>
        </main>
    );
};

export default Map;
