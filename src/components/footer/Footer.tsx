import { FaFacebookSquare, FaGoogle, FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
//import { SlLocationPin } from "react-icons/sl";
import { BsEnvelopeFill, BsFillGeoAltFill, BsTelephoneFill } from 'react-icons/bs'
import ReactLogo from '../../assets/jblgold.svg';
import './Footer.css'

function Footer() {
    return (
        <div className='footer'>
            <div className='footer-main'>
                <div className="footer-col col-logo">
                    <div className="footer-logo">
                        <div><ReactLogo/></div>
                    </div>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt, corrupti odit vero, quae delectus repellendus doloremque non explicabo eveniet consectetur magnam dolores asperiores labore? Enim odit aperiam eos provident odio?</p>
                </div>
                <div className="footer-col">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi error aut reiciendis tempore eum ducimus earum, sunt ex dolorem. Voluptatum aspernatur itaque ut cum odit omnis deserunt quam rerum veniam?</p>
                </div>
                <div className="footer-col">
                    <h3>Links</h3>
                    <a className="footer-links" href="link">Link1</a>
                    <a className="footer-links" href="link">Link2</a>
                    <a className="footer-links" href="link">Link3</a>
                    <a className="footer-links" href="link">Link4</a>
                </div>
                <div className="footer-col">
                    <div className="footer-contact">
                        <h3>Kontakt</h3>
                        <a className="itemsection" href='https://maps.app.goo.gl/1U59uo5KpuqW3RMk7'>
                            <div className='footer-icon'> <BsFillGeoAltFill /></div>
                            <h4>Beo-pek d.o.o.</h4>
                            <p>Save Kovačevića 39b, Kaluđerica<br/>11 000 Beograd</p>
                        </a>
                        <a className="itemsection" href="mailto:office@beopek.rs">
                            <div className='footer-icon'> <BsEnvelopeFill /></div>
                            <h4>Email:</h4>
                            <p>office@beopek.rs</p>
                        </a>

                    </div>
                </div>
            </div>
            <div className='footer-bottom'>
                <div className='copyright'>© 2025 JBL Concept</div>
                <div className='social-media'>
                    <ul>
                        <li className='Instagram'><a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a></li>
                        <li className='Facebook'><a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookSquare /></a></li>
                        <li className='Google'><a href="https://google.com" target="_blank" rel="noopener noreferrer"><FaGoogle /></a></li>
                        <li className='Linkedin'><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a></li>
                    </ul>
                </div>
                <div>
                    <span>web design & coding by 
                    <a className='thisisajsa' href='http://ajsasoft.rs' target='_blank'> AjsaSoft</a></span>
                </div>
            </div>
        </div>
    );
}

export default Footer
