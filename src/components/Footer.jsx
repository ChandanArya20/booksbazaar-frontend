import React from 'react';
import '../css/footer.css';
import { BsLinkedin } from "react-icons/bs";
import { ImFacebook2 } from "react-icons/im";
import { BsInstagram } from "react-icons/bs";
import { BsGithub } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="footer" id='footer'>
      <div className="footer__content">
        <div className="footer__section">
          <h3 className="footer__section-title">About Us</h3>
          <p className="footer__section-text">
            Welcome to our Bookstore, the ultimate destination for book lovers! 
            We are dedicated to providing an exceptional online shopping experience,
            where you can explore an extensive collection of books across various genres. 
            From bestsellers to hidden gems, we curate a diverse selection to satisfy every 
            reading taste.
            At our Bookstore,  
            Our mission is to fuel your love for reading and help you discover 
            new literary adventures.
          </p>
        </div>
        <div className="footer__section" >
          <h3 className="footer__section-title">Contact</h3>
          <p className="footer__section-text" id='contact_details'>Email : <a href='mailto:chandank1848@gmail.com' > chandank1848@gmail.com</a></p>
          <p className="footer__section-text" id='contact_details'>Phone : <a href='tel:9905669732'> +91 9905669732</a></p>
          <p className="footer__section-text">Address : 845438 Naurangabagh, Bettiah, India</p>
        </div>
        <div className="footer__section">
          <h3 className="footer__section-title">Follow Us</h3>
          <div className="footer__social-icons">
            <div>
               <a href="https://www.linkedin.com/in/chandan-kumar-292aa9257" target="_blank" className="footer__social-icon">
                    <BsLinkedin />
                     
                </a>
            </div>
            <div>
                <a href="https://www.facebook.com/profile.php?id=100024585732586&mibextid=ZbWKwL" target="_blank"  className="footer__social-icon">
                <ImFacebook2/>
                </a>
            </div>
            <div>
                <a href="https://www.instagram.com/ck_arya20" target="_blank"  className="footer__social-icon">
                <BsInstagram/>
                </a>
            </div>
            <div>
                <a href="https://github.com/ChandanArya20" target="_blank"  className="footer__social-icon">
                <BsGithub/>
                </a>
            </div>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <p className="footer__bottom-text">&copy; 2023 Bookstore App. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
