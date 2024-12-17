/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/button-has-type */
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Import Framer Motion
import { CloseOutlined } from '@ant-design/icons';
import { myStyle } from '../../utils/style';

function Experiences({ themeIsDark }) {
  const [activeTab, setActiveTab] = useState('Tous');
  const [showPopup, setShowPopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); // État pour stocker l'élément sélectionné
  const popupRef = useRef(null);

  // Définition des tabs
  const tabs = [
    { name: 'Pro' },
    { name: 'Tous' },
    { name: 'Formations' }
  ];

  // Liste des éléments avec les tags et les tâches associées
  const items = [
    {
      title: 'Stage en développement web',
      location: 'Nicolas CAISSO, Distanciel',
      tag: 'Pro',
      tasks: ['Développer une fonctionnalité X', 'Corriger un bug dans Y', 'Écrire la documentation']
    },
    {
      title: "Création d'une micro-entreprise",
      location: 'Etabli 79, QUIMPER',
      tag: 'Pro',
      tasks: ['Rédiger un business plan', 'Chercher des financements', 'Mettre en place un site web']
    },
    {
      title: 'Employée polyvalente',
      location: 'Cornouaille Diffusion, ERGUE GABERIC',
      tag: 'Pro',
      tasks: ['Accueillir les clients', 'Gérer les stocks', 'Mettre à jour les inventaires']
    },
    {
      title: 'Apprentie coiffeuse',
      location: 'Passage bleu, METZ',
      tag: 'Pro',
      tasks: ['Apprendre les coupes', 'Assister le coiffeur senior', 'Prendre les rendez-vous']
    },
    {
      title: 'Bac +2 Développeur Web',
      location: 'La Digital School, BREST',
      tag: 'Formations',
      tasks: ['Apprendre les bases du développement', 'Réaliser des projets pratiques', 'Participer à des hackathons']
    },
    {
      title: 'CAP Coiffure',
      location: 'CFA de METZ',
      duration: '2018 - 2020',
      tag: 'Formations',
      tasks: ['Suivre les cours de coiffure', 'Pratiquer sur des modèles', 'Passer les examens']
    }
  ];

  // Filtrage des items en fonction du tab actif
  const filteredItems = activeTab === 'Tous' ? items : items.filter((item) => item.tag === activeTab);

  // Ouvrir le popup et définir l'élément sélectionné
  const openPopup = (item) => {
    setSelectedItem(item); // Mettre l'élément sélectionné
    setShowPopup(true); // Ouvrir le popup
  };

  return (
    <div id='about' className='mt-36'>
      <div className='flex flex-col items-center'>
        <p className='text-gray-400 text-xs'>Mon expérience</p>
        <h1 className='font-medium text-2xl text-yellow-500'>Mon parcours</h1>
      </div>
      <div className='mt-10 rounded-lg'>
        <div className='min-h-screen px-4 p-8'>
          {/* Tabs */}
          <div className='flex justify-center space-x-8 mb-10'>
            {tabs.map((tab) => (
              <button
                key={tab.name}
                className={`px-8 py-2 text-lg border rounded-xl ${
                  activeTab === tab.name ?
                    'bg-yellow-600 border-transparent' :
                    'border-yellow-500 !text-yellow-500'
                } transition duration-300`}
                style={{ color: themeIsDark ? myStyle.bg : myStyle.white }}
                onClick={() => setActiveTab(tab.name)}
              >
                {tab.name}
              </button>
            ))}
          </div>

          {/* Cards */}
          <AnimatePresence mode='popLayout'>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-20'>
              {filteredItems.map((item, index) => (
                <motion.div
                  key={index} // Utilisez une clé unique basée sur le titre
                  initial={{ opacity: 0, scale: 0.5 }} // Animation d'apparition
                  animate={{ opacity: 1, scale: 1 }} // État final (taille normale)
                  exit={{ opacity: 0.5, scale: 0.5 }} // Animation de disparition (réduite)
                  transition={{ duration: 0.3 }} // Durée de l'animation
                  className='p-10 m-3 rounded-2xl shadow-[0_0px_10px_rgba(0,0,0,0.25)]'
                  style={{
                    backgroundColor: themeIsDark ? myStyle.yellowDark : myStyle.white
                  }}
                >
                  <h3 className='mb-2 font-medium'>{item.title}</h3>
                  <p className='text-gray-500 text-xs mb-4'>{item.location}</p>
                  {item.duration && (
                    <p className='text-gray-500 text-xs -mt-2 mb-4'>{item.duration}</p>
                  )}
                  <button
                    onClick={() => openPopup(item)} // Ouvrir le popup avec l'élément sélectionné
                    className='text-yellow-500 flex items-center text-xs group'
                  >
                    <p>Voir plus</p>
                    <span className='ml-1 group-hover:ml-3 transition-all duration-300 ease-in-out'>
                      →
                    </span>
                  </button>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </div>
      </div>

      {/* Popup Modal */}
      <AnimatePresence>
        {showPopup && selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed z-20 inset-0 bg-black bg-opacity-60 flex justify-center items-center'
          >
            <div
              ref={popupRef}
              className='p-16 rounded-3xl shadow-lg max-w-lg w-full relative'
              style={{ backgroundColor: themeIsDark ? myStyle.bg : myStyle.white }}
            >
              <button
                onClick={() => setShowPopup(false)}
                className='absolute top-6 right-7 text-yellow-500'
              >
                <CloseOutlined />
              </button>
              <h3 className='text-xl text-yellow-500 text-center font-medium mb-4'>{selectedItem.title}</h3>
              <p className='text-gray-500 text-sm text-center'>{selectedItem.location}</p>
              {selectedItem.duration && (
                <p className='text-gray-500 text-xs text-center'>{selectedItem.duration}</p>
              )}

              {/* Affichage des tâches */}
              <div className='mt-4'>
                <h4 className='font-medium'>Tâches</h4>
                <ul className='pl-5 mt-4'>
                  {selectedItem.tasks.map((task, index) => (
                    <li key={index} className='text-gray-500 text-sm mt-2'>
                      <span className='text-yellow-500 mr-4'>✔</span>
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Experiences;
