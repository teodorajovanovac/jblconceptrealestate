import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import TagManager from 'react-gtm-module';

const PageTracker: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    TagManager.dataLayer({
      dataLayer: {
        event: 'pageview',
        path: location.pathname,
        page: document.title,
      },
    });
  }, [location]);

  return null;
};

export default PageTracker;
