/**
 * @name Bus'nay
 * @author Mr. Josia Yvan
 * @description System API and Management System Software ~ Developed By Mr. Josia Yvan
 * @copyright ©2024 ― Mr. Josia Yvan.  All rights reserved.
 * @version v0.0.1
 *
 */

import Community from '../components/layout/community';
import FooterSection from '../components/layout/footer_section';
import HeaderSection from '../components/layout/header_section';
import PartnerScetion from '../components/layout/partner_section';
import PricingSection from '../components/layout/pricing_section';
import SolutionSection from '../components/layout/solution_section';

function Home() {
  window.document.title = 'Bus`nay — Home';

  return (
    <div className='container px-4 pt-10 mx-auto'>
      <HeaderSection />
      <SolutionSection />
      <PricingSection />
      <PartnerScetion />
      <Community />
      <FooterSection />
    </div>
  );
}

export default Home;
