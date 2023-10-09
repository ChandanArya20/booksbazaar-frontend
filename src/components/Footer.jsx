import React from "react";
import "../css/footer.css";
import { BsLinkedin as LinkedinIcon } from "react-icons/bs";
import { ImFacebook2 as FacebookIcon } from "react-icons/im";
import { BsInstagram as InstagramIcon } from "react-icons/bs";
import { BsGithub as GithubIcon } from "react-icons/bs";

// Define the Footer component
const Footer = () => {
    return (
        <footer className="footer" id="footer">
            <div className="footer-content">
                {/* About Us section */}
                <div className="footer-section">
                    <h3 className="footer-section-title">About Us</h3>
                    <p className="footer-section-text">
                        {/* Description of the bookstore */}
                        Welcome to our Bookstore, the ultimate destination for book lovers! We are dedicated to providing an exceptional online shopping experience, where you can explore an extensive collection of books across various genres. From bestsellers to hidden gems, we curate a diverse selection to satisfy every reading taste. At our Bookstore, Our mission is to fuel your love for reading and help you discover new literary adventures.
                    </p>
                </div>
                {/* Contact section */}
                <div className="footer-section">
                    <h3 className="footer-section-title">Contact</h3>
                    <p className="footer-section-text" id="contact-details">
                        Email :{" "}
                        <a href="mailto:chandank1848@gmail.com">
                            {" "}
                            chandank1848@gmail.com
                        </a>
                    </p>
                    <p className="footer-section-text" id="contact-details">
                        Phone : <a href="tel:9905669732"> +91 9905669732</a>
                    </p>
                    <p className="footer-section-text">
                        Address : 845438 Naurangabagh, Bettiah, India
                    </p>
                </div>
                {/* Follow Us section */}
                <div className="footer-section">
                    <h3 className="footer-section-title">Follow Us</h3>
                    <div className="footer-social-icons">
                        {/* Social media links */}
                        <div>
                            <a
                                href="https://www.linkedin.com/in/chandan-kumar-292aa9257"
                                target="_blank"
                                className="footer-social-icon"
                            >
                                <LinkedinIcon />
                            </a>
                        </div>
                        <div>
                            <a
                                href="https://www.facebook.com/profile.php?id=100024585732586&mibextid=ZbWKwL"
                                target="_blank"
                                className="footer-social-icon"
                            >
                                <FacebookIcon />
                            </a>
                        </div>
                        <div>
                            <a
                                href="https://www.instagram.com/ck_arya20"
                                target="_blank"
                                className="footer-social-icon"
                            >
                                <InstagramIcon />
                            </a>
                        </div>
                        <div>
                            <a
                                href="https://github.com/ChandanArya20"
                                target="_blank"
                                className="footer-social-icon"
                            >
                                <GithubIcon />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            {/* Bottom section with copyright */}
            <div className="footer-bottom">
                <p className="footer-bottom-text">
                    &copy; 2023 Bookstore App. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
