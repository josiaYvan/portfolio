# front BUSNAY
## Help

search: ?q=tailwind editor free
 
https://tailwindui.com/components

https://tw-elements.com/docs/standard/content-styles/animations/

```jsx
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react'; // Importez useState
import { Tooltip } from 'antd';
import { StarOutlined, ArrowUpOutlined } from '@ant-design/icons';

// Les données de sièges
const seatsData = [
  { row: 1, seats: ['A', 'B', 'C', 'D'], special: { A: 'steering wheel', B: 'panorama', C: '' } },
  { row: 2, seats: ['A', 'B', 'C', 'D'], special: {} },
  { row: 3, seats: ['A', 'B', 'C', 'D'], special: {} },
  { row: 4, seats: ['A', 'B', 'C', 'D'], special: { B: '', C: '' } },
  { row: 5, seats: ['A', 'B', 'C', 'D'], special: {} },
  { row: 6, seats: ['A', 'B', 'C', 'D'], special: { B: 'male', A: 'female' } },
  { row: 10, seats: ['A', 'B', 'C', 'D'], special: {} },
  { row: 11, seats: ['A', 'B', 'C', 'D'], special: { B: 'unavailable', C: 'unavailable' } },
  { row: 12, seats: ['A', 'B', 'C', 'D'], special: { A: 'unavailable' } },
  { row: 14, seats: ['A', 'B', 'C', 'D'], special: {} }
];

// Composant pour un siège
function Seat({
  special, onClick, isSelected
}) {
  const getSeatIcon = () => {
    if (isSelected) return <img alt='seat' src='/vectors/orange_seat.svg' />;
    if (special === 'steering wheel') return <img alt='seat' src='/vectors/volant_bus.svg' />;
    if (special === 'panorama') return <StarOutlined className='text-white' />;
    if (special === 'unavailable') return <img alt='seat' src='/vectors/unvalaible_seat.svg' />;
    if (special === 'male') return <img alt='seat' src='/vectors/male_seat.svg' />;
    if (special === 'female') return <img alt='seat' src='/vectors/female_seat.svg' />;
    return <img alt='seat' src='/vectors/free_seat.svg' />;
  };

  return (
    <Tooltip title={special ? special.charAt(0).toUpperCase() + special.slice(1) : 'Free seat'}>
      <span
        onClick={onClick}
        className={`w-14 h-14 my-2 mx-4 flex justify-center items-center cursor-pointer ${special === 'unavailable' ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={special === 'unavailable'} // Désactiver l'élément si le siège est indisponible
      >
        {getSeatIcon()}
      </span>
    </Tooltip>
  );
}

// Composant principal pour la disposition des sièges du bus
function BusSeatLayout({ layout }) {
  const [selectedSeat, setSelectedSeat] = useState(null); // État pour le siège sélectionné

  const handleSeatClick = (row, seat, special) => {
    if (special === undefined || special === '') { // Vérifiez si le siège est free avant de le sélectionner
      const seatKey = `${row}-${seat}`;
      setSelectedSeat(selectedSeat === seatKey ? null : seatKey); // Désélectionner si déjà sélectionné
      console.log(special, seat, selectedSeat, 'dela siège');
    }
  };

  return (
    <div className='w-full border rounded-xl bg-white shadow-lg max-w-md'>
      {/* En-tête avec prix */}
      <div className='w-[100%] text-center font-bold text-gray-400 h-12 bg-gray-100 rounded-lg'>
        Choisissez votre place
      </div>

      {/* Rangées de sièges */}
      {seatsData.map(({ row, seats, special }) => (
        <div key={row} className='flex justify-around my-2'>
          {seats.slice(0, 2).map((seat) => (
            <Seat
              key={seat}
              seat={seat}
              special={special[seat]}
              onClick={() => handleSeatClick(row, seat, special[seat])} // Passer la fonction de clic
              isSelected={selectedSeat === `${row}-${seat}`}
            />
          ))}

          {/* Chemin central */}
          <div className='w-12 flex justify-center items-center'>
            {row === 6 && (
              <Tooltip title='Exit'>
                <ArrowUpOutlined className='text-3xl text-green-500' />
              </Tooltip>
            )}
          </div>

          {seats.slice(2, 4).map((seat) => (
            <Seat
              key={seat}
              seat={seat}
              special={special[seat]}
              onClick={() => handleSeatClick(row, seat, special[seat])} // Passer la fonction de clic
              isSelected={selectedSeat === `${row}-${seat}`}
            />
          ))}
        </div>
      ))}

      {/* Porte de sortie à l'arrière */}
      <div className='flex justify-center mt-4'>
        <Tooltip title='Exit Door'>
          <span className='w-24 h-5 bg-gray-200 rounded-t-lg' />
        </Tooltip>
      </div>
    </div>
  );
}

export default BusSeatLayout;

```