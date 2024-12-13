/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable max-len */
import React, { useState } from 'react';

const tabs = [
  { id: 'tabs-home', label: 'Gain de Temps' },
  { id: 'tabs-profile', label: 'Qualité de service' },
  { id: 'tabs-messages', label: 'Securité' },
  { id: 'tabs-contact', label: 'Ergonomie', disabled: true }
];

function TabContent() {
  return (
    <div className='m-10 '>
      <div className='flex flex-wrap xl:items-center -mx-4'>
        <div className='w-full md:w-1/2 px-4 pt-5 mb-16 md:mb-0'>
          <h1 className='mb-6 text-3xl w-80 leading-tight font-bold tracking-tight'>Réduction de temps de voyages sur le trajet</h1>
          <p className='mb-8 text-lg md:text-xl text-coolGray-500 font-medium'>Itinéraire différents des transports actuels</p>
          <div className='flex flex-wrap'>
            <div className='w-full md:w-auto py-1 md:py-0 md:mr-4'>
              <a className='inline-block py-2 px-4 w-full text-base md:text-lg leading-4 text-orange-50 font-medium text-center bg-orange-500 hover:bg-orange-600 focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 border border-orange-500 rounded-xl shadow-sm' href='#'>En savoir plus</a>
            </div>
            {/* <div className='w-full md:w-auto py-1 md:py-0'><a className='inline-block py-5 px-7 w-full text-base md:text-lg leading-4 text-coolGray-800 font-medium text-center bg-white hover:bg-coolGray-100 focus:ring-2 focus:ring-coolGray-200 focus:ring-opacity-50 border border-coolGray-200 rounded-md shadow-sm' href='#'>Sign Up</a></div> */}
          </div>
        </div>
        <div className='w-full md:w-1/2 px-4'>
          <div className='relative mx-auto md:mr-0 max-w-max'>
            <div className='relative overflow-hidden rounded-7xl'>
              <img src='/images/brazuca_airport.png' alt='Bus' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SolutionSection() {
  const [activeTab, setActiveTab] = useState('tabs-home');

  const handleTabChange = (tabId) => {
    const tab = tabs.find((t) => t.id === tabId);
    if (tab && !tab.disabled) {
      setActiveTab(tabId);
    }
  };

  const getTabClassNames = (tabId) => {
    const isActive = activeTab === tabId;
    const tab = tabs.find((t) => t.id === tabId);
    return `my-2 block border-x-0 border-b-2 border-t-0 ${isActive ? 'border-primary text-orange-500 border-b-2 border-orange-500' : 'border-transparent text-neutral-500'} px-7 pb-3.5 pt-4 font-medium font-bold leading-tight hover:isolate hover:bg-orange-100 focus:isolate focus:border-transparent ${tab?.disabled ? 'pointer-events-none bg-transparent text-neutral-400' : 'dark:text-white/50 dark:hover:bg-orange-700/60 dark:data-[twe-nav-active]:text-primary'}`;
  };

  return (
    <div id='solution' className='bg-[#D8FAF5] p-5 mb-28 rounded-[2rem]'>
      <ul className='mb-5 flex list-none flex-row flex-wrap border-b-0 ps-0' role='tablist'>
        {tabs.map((tab) => (
          <li key={tab.id} role='presentation'>
            <a
              href={`#${tab.id}`}
              className={getTabClassNames(tab.id)}
              onClick={(e) => {
                e.preventDefault(); // Prevent default anchor behavior
                handleTabChange(tab.id);
              }}
              role='tab'
              aria-controls={tab.id}
              aria-selected={activeTab === tab.id}
              data-twe-toggle='pill'
              data-twe-target={`#${tab.id}`}
            >
              {tab.label}
            </a>
          </li>
        ))}
      </ul>
      <div className='mb-6'>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`transition-opacity duration-150 ease-linear ${activeTab === tab.id ? 'opacity-100 block' : 'opacity-0 hidden'}`}
            id={tab.id}
            role='tabpanel'
            aria-labelledby={`${tab.id}-tab`}
          >
            <TabContent />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SolutionSection;
