import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";

const useGoogleAnalytics  = () => {
    ReactGA.initialize('G-XXXXXXXXX'); //replace GA code G-633B6E1MFX
    const location = useLocation();
    useEffect(() => {
        ReactGA.event(location.pathname + location.search);
        }, [location]);
}

export default useGoogleAnalytics 