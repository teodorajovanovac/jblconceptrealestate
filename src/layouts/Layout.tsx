import { Outlet, useLocation  } from 'react-router-dom';
import TagManager from 'react-gtm-module';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import { useEffect } from 'react';

const Layout = () => {
  const location = useLocation();  // This will track the current location

  useEffect(() => {
    // Push the pageview event to the dataLayer whenever the location changes
   // console.log('Page view event pushed to GTM:', location.pathname);
    TagManager.dataLayer({
      dataLayer: {
        event: 'pageview',
        path: location.pathname,
        page: document.title, // or another dynamic value based on the page
      },
    });
  }, [location]);
  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col">
      <Header />
      <div className="flex-grow">
        <Outlet />
      </div>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Layout; 