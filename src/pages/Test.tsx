import './LandingPage.css'
import Seo from '../services/meta/Seo';
import TagManager from 'react-gtm-module'
// import Footer from '../components/footer/Footer';
import FooterTW from '../components/footer/Footer';
import Header from '../components/header/Header';
import TestContent from '../components/TestContent';

const tagManagerArgs = {
  dataLayer: {page: 'home'}, dataLayerName: 'PageDataLayer'
}

const Test: React.FC = () => {
    TagManager.dataLayer(tagManagerArgs)
    return( 
        <>
        <Seo title=""/>
        <Header/>
        <TestContent/>
        <FooterTW />
        </>
    );
}

export default Test