import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
function Contact() {
   return (
      <div className="col footer-contacts">
         <ul>
            <li className='footer-contacts-item'>
               <FontAwesomeIcon size="xl" icon={faPhone} />
               <p>4667-3223</p>
            </li>
            <li className='footer-contacts-item'>
               <FontAwesomeIcon size="xl" icon={faWhatsapp} />
               <p>114667-3223</p>
            </li>
            <li className='footer-contacts-item'>
               <FontAwesomeIcon size="xl" icon={faInstagram} />
               <p><Link to={"https://www.instagram.com/autoserviciomiguelangel/"}>autoserviciomiguelangel</Link></p>
            </li>
         </ul>
      </div>
   );
}

export default Contact;