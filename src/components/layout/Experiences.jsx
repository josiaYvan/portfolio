/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'; // Import Framer Motion
import { myStyle } from '../../utils/style';

function Experiences({ themeIsDark }) {
  const [activeTab, setActiveTab] = useState('Tous');

  // Définition des tabs
  const tabs = [
    { name: 'Tous' },
    { name: 'Pro' },
    { name: 'Formations' }
  ];

  // Liste des éléments avec les tags associés
  const items = [
    {
      title: 'Stage en développement web',
      location: 'Nicolas CAISSO, Distanciel',
      tag: 'Pro'
    },
    {
      title: "Création d'une micro-entreprise",
      location: 'Etabli 79, QUIMPER',
      tag: 'Pro'
    },
    {
      title: 'Employée polyvalente',
      location: 'Cornouaille Diffusion, ERGUE GABERIC',
      tag: 'Pro'
    },
    {
      title: 'Apprentie coiffeuse',
      location: 'Passage bleu, METZ',
      tag: 'Pro'
    },
    {
      title: 'Bac +2 Développeur Web',
      location: 'La Digital School, BREST',
      tag: 'Formations'
    },
    {
      title: 'CAP Coiffure',
      location: 'CFA de METZ',
      duration: '2018 - 2020',
      tag: 'Formations'
    }
  ];

  // Filtrage des items en fonction du tab actif
  const filteredItems = activeTab === 'Tous' ? items : items.filter((item) => item.tag === activeTab);

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
                  <Link
                    to='#'
                    className='text-yellow-500 flex items-center text-xs group'
                  >
                    <p>Voir plus</p>
                    <span className='ml-1 group-hover:ml-3 transition-all duration-300 ease-in-out'>
                      →
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default Experiences;
