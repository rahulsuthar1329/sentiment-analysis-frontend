import React from "react";
import styles from "./Footer.module.css";
import {
  FaHome,
  FaPhoneSquareAlt,
  FaFacebookF,
  FaTwitter,
  FaGoogle,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { MdMail } from "react-icons/md";
import { BiSolidPrinter } from "react-icons/bi";
const Footer = () => {
  return (
    <div
      className={`${styles.footer} container-fluid bg-black d-flex flex-column`}
    >
      <div className={`${styles.topBar} py-3`}>
        <div className="container p-0 d-flex justify-content-between size={20}">
          <p>Get connected with us on social networks:</p>
          <div className="d-flex gap-4 align-items-center">
            <div className={styles.social}>
              <FaFacebookF size={20} />
            </div>
            <div className={styles.social}>
              <FaTwitter size={20} />
            </div>
            <div className={styles.social}>
              <FaGoogle size={20} />
            </div>
            <div className={styles.social}>
              <FaInstagram size={20} />
            </div>
            <div className={styles.social}>
              <FaLinkedin size={20} />
            </div>
          </div>
        </div>
      </div>
      <div className="w-100 p-0 flex-fill d-flex justify-content-center align-items-center">
        <div className="container d-flex justify-content-between gap-2 p-0">
          <div className="w-25">
            <h6 className="border-bottom border-secondary pb-2">
              Company Name
            </h6>
            <p className="py-2">
              Here you can use rows and columns to organize yor footer content.
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>
          </div>

          <div className="">
            <h6 className="border-bottom border-secondary pb-2">Products</h6>
            <div className="d-flex flex-column gap-2 py-2">
              <p>MDBootstrap</p>
              <p>MDWordPress</p>
              <p>BrandFlow</p>
              <p>Bootstrap Angular</p>
            </div>
          </div>

          <div className="">
            <h6 className="border-bottom border-secondary pb-2">
              Useful Links
            </h6>
            <div className="d-flex flex-column gap-2 py-2">
              <p>Your Account</p>
              <p>Become an Affiliate</p>
              <p>Shipping Rates</p>
              <p>Help</p>
            </div>
          </div>
          <div className="">
            <h6 className="border-bottom border-secondary pb-2">Contact</h6>
            <div className="d-flex flex-column gap-2 py-2">
              <div className="d-flex align-items-center gap-2">
                <FaHome /> <p>New York, NY 10012, US</p>
              </div>
              <div className="d-flex align-items-center gap-2">
                <MdMail />
                <p>info@example.com</p>
              </div>
              <div className="d-flex align-items-center gap-2">
                <FaPhoneSquareAlt />
                <p>+01 234 567 89</p>
              </div>
              <div className="d-flex align-items-center gap-2">
                <BiSolidPrinter />
                <p>+01 234 567 89</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
