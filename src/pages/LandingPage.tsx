import './LandingPage.css'
import ReactLogo from '../assets/jblgold.svg';
//import Footer from '../components/footer/Footer';
import Seo from '../services/meta/Seo';
import TagManager from 'react-gtm-module'
import LandingFooter from '../components/landingFooter/LandingFooter';

const tagManagerArgs = {
  dataLayer: {page: 'home'}, dataLayerName: 'PageDataLayer'
}

const LandingPage: React.FC = () => {
    TagManager.dataLayer(tagManagerArgs)
    return( 
        <>
        <Seo title=""/>
        <div className='main'>
          <div><ReactLogo className="jbllogo"/> </div> 
        </div>
        <LandingFooter/>
        </>
    );
}

export default LandingPage