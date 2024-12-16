/* eslint-disable react/button-has-type */
/**
 * @name Bus'nay
 * @author Mr. Josia Yvan
 * @description System API and Management System Software ~ Developed By Mr. Josia Yvan
 * @copyright ©2024 ― Mr. Josia Yvan.  All rights reserved.
 * @version v0.0.1
 *
 */

import AboutMe from '../components/layout/AboutMe';
import LinkedIn from '../components/layout/LinkedIn';
import Menu from '../components/layout/Menu';
import Navbar from '../components/layout/navigation';
import Profile from '../components/layout/profile';
import { ScrollIndicator } from '../components/layout/ScrollIndicator';

function Home() {
  window.document.title = 'Bus`nay — Home';

  return (
    <div className='px-72'>
      <Navbar />
      <Menu />
      <div className='container px-4 pt-10 mx-auto'>
        <div className='flex flex-col items-center justify-center'>
          <p className=''>Hello, je suis</p>
          {/* <p className='mt-2 font-bold text-gray-500 -mb-2 text-xs'>MASOANDRO</p> */}
          <h1 className='font-medium text-3xl'>Josia Yvan</h1>
          <p className='text-gray-400 mt-1 text-xs'>Ingenieur informatique</p>
          <div className='flex space-x-6 my-10'>
            <button className='rounded-lg border px-6 py-3'>Télécharger mon CV</button>
            <button className='rounded-lg px-6 py-3 bg-yellow-500'>A propos de moi</button>
          </div>
          <Profile />
          <LinkedIn />
          <ScrollIndicator />
          <AboutMe />
        </div>
      </div>
    </div>
  );
}

export default Home;
