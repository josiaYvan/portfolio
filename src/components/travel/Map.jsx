import React, { useState, useEffect } from 'react';
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  useJsApiLoader,
  TrafficLayer
} from '@react-google-maps/api';
import { AimOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { fetchPlaceName, initLocation } from '../../utils/funtcion';

const containerStyle = { width: '100%', height: '100%' };

const mapStyle = [
  {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }]
  },
  {
    featureType: 'poi.business',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }]
  },
  {
    featureType: 'poi.government',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }]
  },
  {
    featureType: 'road',
    elementType: 'labels',
    stylers: [{ visibility: 'simplified' }]
  }
];

const center = { lat: -18.908480, lng: 47.537510 }; // Antananarivo
const libraries = ['places', 'maps', 'marker', 'geocoding', 'core'];

export function MapView({
  setMarker, marker, secondMarker, setSecondMarker
}) {
  const [directions, setDirections] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [markerPosition, setMarkerPosition] = useState(null);
  const [secondMarkerPosition, setSecondMarkerPosition] = useState(null);
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));

  const { isLoaded } = useJsApiLoader({
    libraries,
    googleMapsApiKey: process.env.REACT_APP_ENABLED_API_KEY
  });

  useEffect(() => {
    if (marker && marker.latLng && marker.latLng.lat !== '' && marker.latLng.lng !== '') {
      setMarkerPosition(marker.latLng);
      map.panTo(marker.latLng);
      map.setZoom(15);
    }

    if (secondMarker && secondMarker.latLng && secondMarker.latLng.lat !== '' && secondMarker.latLng.lng !== '') {
      setSecondMarkerPosition(secondMarker.latLng);
      map.panTo(secondMarker.latLng);
      map.setZoom(15);
    }

    // Vérification si les deux marqueurs sont définis
    if (markerPosition && secondMarkerPosition) {
      getDirections(markerPosition, secondMarkerPosition);
    }
  }, [marker, secondMarker, markerPosition, secondMarkerPosition]);

  const getDirections = (origin, destination) => {
    const directionsService = new window.google.maps.DirectionsService();
    const request = {
      origin,
      destination,
      travelMode: window.google.maps.TravelMode.DRIVING
    };

    directionsService.route(request, (result, status) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        setDirections(result);
      } else {
        console.error(`Erreur lors de la récupération des directions : ${status}`);
      }
    });
  };

  const handleMapClick = async (event) => {
    if (markerPosition && secondMarkerPosition) return; // Limiter à 2 marqueurs

    const lat = event.latLng.lat();
    const lng = event.latLng.lng();

    try {
      const { placeName, placeId } = await fetchPlaceName(lat, lng);

      if (!markerPosition) {
        setMarkerPosition({ lat, lng });
        setMarker({ latLng: { lat, lng }, placeName, placeId });
      } else if (!secondMarkerPosition) {
        setSecondMarkerPosition({ lat, lng });
        setSecondMarker({ latLng: { lat, lng }, placeName, placeId });
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleLocateUser = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newCenter = { lat: latitude, lng: longitude };
          setMarkerPosition(newCenter);
          map.panTo(newCenter);
          map.setZoom(15);
        },
        (error) => {
          console.error('Erreur de géolocalisation:', error.message);
        }
      );
    } else {
      console.error('La géolocalisation n’est pas prise en charge par ce navigateur.');
    }
  };

  const handleMarkerDragEnd = async (event, isSecondMarker = false) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();

    try {
      const { placeName, placeId } = await fetchPlaceName(lat, lng);

      if (isSecondMarker) {
        setSecondMarkerPosition({ lat, lng });
        setSecondMarker({ latLng: { lat, lng }, placeName, placeId });
      } else {
        setMarkerPosition({ lat, lng });
        setMarker({ latLng: { lat, lng }, placeName, placeId });
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const clearMap = () => {
    setMarker(initLocation);
    setMarkerPosition(null);
    setSecondMarker(initLocation);
    setSecondMarkerPosition(null);
    setDirections(null);
    setDistance('');
    setDuration('');
  };

  return (
    <div className='relative my-4 max-w-4xl mx-auto h-[500px] bg-white rounded-md shadow'>
      <Button
        onClick={clearMap}
        className='absolute -top-14 left-4 p-3 px-4 rounded-full bg-red-500 text-white shadow-md hover:bg-red-600 transition'
        title='Réinitialiser la carte'
      >
        Réinitialiser
      </Button>

      {isLoaded ? (
        <>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={13}
            options={{ styles: mapStyle }}
            onClick={handleMapClick}
            onLoad={(imap) => setMap(imap)}
          >
            <TrafficLayer />
            {directions && (
              <DirectionsRenderer
                directions={directions}
                options={{
                  suppressMarkers: true,
                  polylineOptions: {
                    strokeColor: '#F97316',
                    strokeOpacity: 0.8,
                    strokeWeight: 6
                  }
                }}
              />
            )}
            {markerPosition && (
              <Marker
                position={markerPosition}
                draggable
                onDragEnd={(e) => handleMarkerDragEnd(e)}
              />
            )}
            {secondMarkerPosition && (
              <Marker
                position={secondMarkerPosition}
                draggable
                onDragEnd={(e) => handleMarkerDragEnd(e, true)}
              />
            )}
          </GoogleMap>

          <Button
            onClick={handleLocateUser}
            className='absolute bottom-4 right-4 p-3 px-2 rounded-full bg-blue-500 text-white shadow-md hover:bg-blue-600 transition'
            title='Ma localisation'
          >
            <AimOutlined size={20} />
          </Button>
        </>
      ) : (
        <p>Chargement de la carte...</p>
      )}
      <p className='hidden'>{`Distance: ${distance} - Durée: ${duration}`}</p>
    </div>
  );
}
