import TagManager from 'react-gtm-module';
import { useEffect } from "react";

const useGoogleTagManager = () => {
  const tagManagerArgs = {
    gtmId: 'XXX-XXXXXXX', //format like GTM-W6DLXN3C
    dataLayerName: 'PageDataLayer'
  };

  useEffect(() => {
    TagManager.initialize(tagManagerArgs);
  }, []);
};

export default useGoogleTagManager;