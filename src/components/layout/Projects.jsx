/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { AnimatePresence, motion } from 'framer-motion';
import { myStyle } from '../../utils/style';

const projects = [
  {
    title: 'Maquette Bed & Desk',
    description: 'Découvrez notre sélection',
    imageSrc: '/images/apk.png',
    altText: 'Bed & Desk',
    link: '#',
    tasks: [
      'Vérifier que l\'image "/images/apk.png" existe et s\'affiche correctement.',
      'Ajouter un popup "Voir plus" pour afficher les détails du projet.',
      'Vérifier que le projet est associé aux tags "Design" et "Web".',
      'Rédiger une description détaillée sur la sélection à découvrir.',
      'Configurer le lien de redirection dans la propriété "link".'
    ],
    tags: ['Design', 'Web']
  },
  {
    title: 'Gameboy en 3D avec Blender',
    description: 'Un projet intéressant avec Blender',
    imageSrc: '/images/webradio.png',
    altText: 'Gameboy 3D',
    link: '#',
    tasks: [
      'Vérifier que l\'image "/images/webradio.png" existe et s\'affiche correctement.',
      'Ajouter un popup "Voir plus" pour afficher les détails du projet.',
      'Vérifier que le projet est associé aux tags "Prototype Figma" et "Design".',
      'Inclure une description sur le processus de création avec Blender.',
      'Configurer le lien de redirection dans la propriété "link".'
    ],
    tags: ['Prototype Figma', 'Design']
  },
  {
    title: 'Busnay',
    description: 'Un projet intéressant de gestion de transport scolaire',
    imageSrc: '/images/busnay.png',
    altText: 'Busnay',
    link: '#',
    tasks: [
      'Vérifier que l\'image "/images/busnay.png" existe et s\'affiche correctement.',
      'Ajouter un popup "Voir plus" pour afficher les détails du projet.',
      'Vérifier que le projet est associé au tag "Web".',
      'Rédiger une description complète sur la gestion de transport scolaire.',
      'Configurer le lien de redirection dans la propriété "link".'
    ],
    tags: ['Web']
  },
  {
    title: 'Radio EMIA',
    description: 'Un projet intéressant de gestion de transport scolaire',
    imageSrc: '/images/radioemia.png',
    altText: 'Busnay',
    link: '#',
    tasks: [
      'Vérifier que l\'image "/images/radioemia.png" existe et s\'affiche correctement.',
      'Ajouter un popup "Voir plus" pour afficher les détails du projet.',
      'Vérifier que le projet est associé aux tags "Web" et "Design".',
      'Rédiger une description complète sur le projet.',
      'Configurer le lien de redirection dans la propriété "link".'
    ],
    tags: ['Web', 'Design']
  }
];

function Projects({ themeIsDark }) {
  const [selectedTag, setSelectedTag] = useState('Tous');
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  // Fonction pour filtrer les projets en fonction du tag sélectionné
  const filterProjects = () => {
    if (selectedTag === 'Tous') {
      return projects;
    }
    return projects.filter((project) => project.tags.includes(selectedTag));
  };

  const openPopup = (project) => {
    setSelectedProject(project);
    setShowPopup(true);
  };

  return (
    <div id='about' className='mt-36'>
      <div className='flex flex-col items-center'>
        <p className='text-gray-400 text-xs'>Mes projets</p>
        <h1 className='font-medium text-2xl text-yellow-500'>Mon Portfolio</h1>
      </div>

      <div className='mt-10 rounded-lg'>
        <div className='p-8'>
          {/* Filtre de projet */}
          <div
            className='flex justify-center space-x-6 mb-8'
            style={{ color: !themeIsDark ? myStyle.bg : myStyle.white }}
          >
            {['Tous', 'Web', 'Prototype Figma', 'Design'].map((tag) => (
              <button
                key={tag}
                className={`${
                  selectedTag === tag && 'bg-yellow-500'
                } px-4 py-2 rounded-lg`}
                style={{
                  color:
                    selectedTag === tag && (!themeIsDark ? myStyle.white : myStyle.bg)
                }}
                onClick={() => setSelectedTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Cartes de projet avec animation */}
          <div className='grid grid-cols-2 gap-6'>
            {filterProjects().map((project, index) => (
              <motion.div
                key={index}
                className='p-4 m-4 rounded-2xl shadow-lg h-[28.5rem] overflow-hidden flex flex-col'
                style={{
                  backgroundColor: themeIsDark ? myStyle.yellowDark : myStyle.white
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={project.imageSrc}
                  alt={project.altText}
                  className='rounded-xl h-[350px] object-cover'
                />
                <div className='flex-grow'>
                  <h3 className='text-lg font-bold mt-5 mb-2'>{project.title}</h3>
                  <button
                    onClick={() => openPopup(project)}
                    className='text-yellow-500 flex items-center text-xs group'
                  >
                    <p>Voir plus</p>
                    <span className='ml-1 group-hover:ml-3 transition-all duration-300 ease-in-out'>
                      →
                    </span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Popup */}
      <AnimatePresence>
        {showPopup && selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed z-20 inset-0 bg-black bg-opacity-60 flex justify-center items-center'
        >
          <div
            className='p-16 rounded-3xl shadow-lg max-w-lg w-full relative'
            style={{ backgroundColor: themeIsDark ? myStyle.bg : myStyle.white }}
          >
            <button
              onClick={() => setShowPopup(false)}
              className='absolute top-6 right-7 text-yellow-500'
            >
              <CloseOutlined />
            </button>
            <h2 className='text-xl text-yellow-500 text-center font-medium mb-4'>{selectedProject.title}</h2>
            <p className='text-gray-600 text-center text-sm mb-4'>{selectedProject.description}</p>
            {/* Affichage des tâches */}
            <div className='mt-4'>
              <h4 className='font-medium'>Tâches</h4>
              <ul className='pl-5 mt-4'>
                {selectedProject.tasks.map((task, index) => (
                  <li key={index} className='text-gray-500 flex space-x-2 text-sm mt-3'>
                    <span className='text-yellow-500 mr-4'>✔</span>
                    <p>{task}</p>
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

export default Projects;
