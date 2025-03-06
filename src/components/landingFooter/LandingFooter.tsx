import { useState } from 'react';
import './LandingFooter.css'
const LandingFooter: React.FC = () => {
    
    //Ajsa Soft * own concept of hiding email from crawlers
    const myMailMask = "#"
    const myMailDomain = "jblconcepts.rs"
    const [link, setLink] = useState<string>(myMailMask);
    const handleMouseOverMailLink = () => {
        setLink('mailto:office@'+myMailDomain); // Replace with the desired link
      };

    //  const handleMouseOutMailLink = () => {
    //    setLink(myMailMask); // Revert back to the original link
    //  };

    return (
        <div className="footer-bottom">
            <div>
                <span className="copyright">© 2024 | JBL Concept Real Estate</span>
            </div>
            <a className="contact hover-underline-animation"
            href={link}
            onMouseOver={handleMouseOverMailLink}
            onFocus={handleMouseOverMailLink}
            >Kontakt</a>
        </div>
    )
}

export default LandingFooter