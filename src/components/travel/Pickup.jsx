import React, { useEffect, useState } from 'react';
import {
  Input, Button, DatePicker, Select, Space, List
} from 'antd';
import { EnvironmentOutlined, CalendarOutlined } from '@ant-design/icons';
import { MapView } from './Map';
import { initLocation } from '../../utils/funtcion';

const { Option } = Select;

export function Pickup() {
  const [pickupLocation, setPickupLocation] = useState(initLocation);

  const [destinationLocation, setDestinationLocation] = useState(initLocation);

  const [pickupQuery, setPickupQuery] = useState('');
  const [destinationQuery, setDestinationQuery] = useState('');
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);

  useEffect(() => {
    setDestinationQuery(destinationLocation.placeName);
    setPickupQuery(pickupLocation.placeName);
  }, [pickupLocation, destinationLocation]);

  // Fonction pour rechercher des suggestions pour la prise en char ge
  const handlePickupPickuph = (query) => {
    setPickupQuery(query);

    if (!query) {
      setPickupSuggestions([]);
      return;
    }

    const service = new window.google.maps.places.AutocompleteService();
    service.getPlacePredictions({ input: query }, (predictions, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
        setPickupSuggestions(predictions);
      }
    });
  };

  // Fonction pour rechercher des suggestions pour la destination
  const handleDestinationPickuph = (query) => {
    setDestinationQuery(query);

    if (!query) {
      setDestinationSuggestions([]);
      return;
    }

    const service = new window.google.maps.places.AutocompleteService();
    service.getPlacePredictions({ input: query }, (predictions, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
        setDestinationSuggestions(predictions);
      }
    });
  };

  // Fonction pour sélectionner une suggestion de prise en charge
  const handleSelectPickupSuggestion = (suggestion) => {
    const service = new window.google.maps.places.PlacesService(
      document.createElement('div')
    );

    service.getDetails({ placeId: suggestion.place_id }, (place, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setPickupLocation({
          placeName: place.name,
          placeId: place.place_id,
          latLng: {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          }
        });
        setPickupQuery(place.name); // Mettez à jour le champ de recherche avec le nom sélectionné
      }
    });

    setPickupSuggestions([]);
  };

  // Fonction pour sélectionner une suggestion de destination
  const handleSelectDestinationSuggestion = (suggestion) => {
    const service = new window.google.maps.places.PlacesService(
      document.createElement('div')
    );

    service.getDetails({ placeId: suggestion.place_id }, (place, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setDestinationLocation({
          placeName: place.name,
          placeId: place.place_id,
          latLng: {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          }
        });
        setDestinationQuery(place.name); // Mettez à jour le champ de recherche avec le nom sélectionné
      }
    });

    setDestinationSuggestions([]);
  };

  return (
    <div className='container bg-gray-50 mx-auto py-6 sm:p-6 xl:p-10'>
      <h1 className='text-3xl md:text-4xl font-bold'>
        Besoin de
        {' '}
        <span className='text-3xl md:text-4xl text-[#4B9A90] font-bold'>déplacer ?</span>
      </h1>
      <div className='flex flex-col lg:flex-row items-center py-14 lg:justify-between'>
        {/* Section gauche (formulaire) */}
        <div className='bg-white p-4 xl:p-8 rounded-lg max-w-md w-full'>
          <p className='text-xl text-gray-500 ml-2 font-bold mb-8'>
            Allez où vous voulez avec Bus&#39;nay
          </p>
          <Space direction='vertical' size='large' className='w-full'>
            {/* Champ "Lieu de prise en charge" */}
            <Input
              className='bg-gray-100 border-transparent'
              size='large'
              allowClear
              placeholder='Lieu de prise en charge'
              prefix={<EnvironmentOutlined />}
              value={pickupQuery}
              onChange={(e) => handlePickupPickuph(e.target.value)}
            />

            {/* Liste des suggestions pour la prise en charge */}
            {pickupSuggestions.length > 0 && (
              <List
                size='small'
                bordered
                dataSource={pickupSuggestions}
                renderItem={(item) => (
                  <List.Item onClick={() => handleSelectPickupSuggestion(item)}>
                    {item.description}
                  </List.Item>
                )}
                style={{ maxHeight: '200px', overflowY: 'auto' }}
              />
            )}

            {/* Champ "Destination" */}
            <Input
              size='large'
              allowClear
              className='bg-gray-100 border-transparent'
              placeholder='Destination'
              prefix={<EnvironmentOutlined />}
              value={destinationQuery}
              onChange={(e) => handleDestinationPickuph(e.target.value)}
            />

            {/* Liste des suggestions pour la destination */}
            {destinationSuggestions.length > 0 && (
              <List
                size='small'
                bordered
                dataSource={destinationSuggestions}
                renderItem={(item) => (
                  <List.Item onClick={() => handleSelectDestinationSuggestion(item)}>
                    {item.description}
                  </List.Item>
                )}
                style={{ maxHeight: '200px', overflowY: 'auto' }}
              />
            )}

            {/* Section date et heure */}
            <div className='flex gap-2'>
              <DatePicker
                size='large'
                placeholder="Aujourd'hui"
                className='w-full bg-gray-100 border-transparent'
                prefix={<CalendarOutlined />}
              />
              <Select size='large' placeholder='Maintenant' className='w-full'>
                <Option value='now'>Maintenant</Option>
                <Option value='later'>Plus tard</Option>
              </Select>
            </div>

            {/* Bouton Voir les prix */}
            <Button
              type='primary'
              className='px-8 bg-orange-500'
              onClick={() => {
                /* Logique pour continuer */
              }}
            >
              Confirmer
            </Button>
          </Space>
        </div>

        {/* Section droite (carte) */}
        <div className='mt-10 ml-0 md:ml-4 lg:mt-0 xl:ml-10 flex-grow w-full h-[500px] rounded-lg shadow-lg'>
          <MapView setMarker={setPickupLocation} marker={pickupLocation} setSecondMarker={setDestinationLocation} secondMarker={destinationLocation} />
        </div>
      </div>
    </div>
  );
}
