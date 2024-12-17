/* eslint-disable react/button-has-type */
/**
 * @name Bus'nay
 * @author Mr. Josia Yvan
 * @description System API and Management System Software ~ Developed By Mr. Josia Yvan
 * @copyright ©2024 ― Mr. Josia Yvan.  All rights reserved.
 * @version v0.0.1
 *
 */
import { useState, useEffect } from 'react';
import AboutMe from '../components/layout/AboutMe';
import LinkedIn from '../components/layout/LinkedIn';
import Menu from '../components/layout/Menu';
import Navbar from '../components/layout/navigation';
import { ScrollIndicator } from '../components/layout/ScrollIndicator';
import Skills from '../components/layout/Skills';
import { myStyle } from '../utils/style';
import Experiences from '../components/layout/Experiences';
import Projects from '../components/layout/Projects';
import Contact from '../components/layout/Contact';
import Footer from '../components/layout/Footer';
import Welcome from '../components/layout/Welcome';

function Home() {
  const [themeIsDark, setThemeIsDark] = useState(true);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const sections = document.querySelectorAll('section'); // Cible toutes les sections avec l'attribut ID
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3; // Ajustez la position pour une meilleure précision
      let currentSection = '';

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          currentSection = section.getAttribute('id');
        }
      });

      setActiveSection(currentSection); // Met à jour la section active
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      style={{
        backgroundColor: themeIsDark ? myStyle.bg : myStyle.light,
        color: themeIsDark ? myStyle.darkColor : myStyle.brown
      }}
      className='transition duration-500 ease-in-out'
    >
      <Navbar setThemeIsDark={setThemeIsDark} themeIsDark={themeIsDark} />
      <div className='px-80'>
        <Menu activeSection={activeSection} />
        <div className='container flex flex-col px-4 mx-auto'>
          <Welcome themeIsDark={themeIsDark} />
          <LinkedIn themeIsDark={themeIsDark} />
          <ScrollIndicator themeIsDark={themeIsDark} />
          <AboutMe themeIsDark={themeIsDark} />
          <Skills themeIsDark={themeIsDark} />
          <Experiences themeIsDark={themeIsDark} />
          <Projects themeIsDark={themeIsDark} />
          <Contact themeIsDark={themeIsDark} />
        </div>
      </div>
      <Footer themeIsDark={themeIsDark} />
    </div>
  );
}

export default Home;
