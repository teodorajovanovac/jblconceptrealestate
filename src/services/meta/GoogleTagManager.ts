import TagManager from 'react-gtm-module';
import { useEffect } from "react";

const useGoogleTagManager = () => {
  const tagManagerArgs = {
    gtmId: 'GTM-K6SP5HZJ', 
    //dataLayerName: 'PageDataLayer'
  };

  useEffect(() => {
    TagManager.initialize(tagManagerArgs);
  }, []);
};

export default useGoogleTagManager;