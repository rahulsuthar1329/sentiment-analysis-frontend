import React from "react";
import styles from "./LandingPage.module.css";
import bagLarge from "./images/vecteezy_illustration-isometric-concept-safety-of-online-shopping-in_5638074.jpg";
import bagSmall from "./images/bag.png";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="h-100">
      <Navbar />
      <div className="container-fluid container-lg h-100 pt-4 pt-md-0">
        <div
          className={`row justify-content-center align-items-center h-100 flex-wrap-reverse flex-lg-wrap  ${styles.custom_flex}`}
        >
          <div
            className={`col-md-6 d-flex justify-content-between gap-1 gap-lg-3 px-4 px-lg-1 flex-column `}
          >
            <div>
              <h1>Unleash The</h1>
              <h1 style={{ color: "rgb(82, 153, 128)" }}>
                Treasure of GenieCart!
              </h1>
            </div>
            <p className={styles.content}>
              Rub the lamp of GenieCart, and let your shopping wishes take
              flight! From trendy fashion finds to cutting-edge gadgets, We are
              here to grant you the ultimate shopping experience. So, go ahead
              and explore the magic of GenieCart - Your dreams, our command!
            </p>
            <div className="d-flex gap-3">
              <button
                className={`${styles.getStarted}`}
                type="submit"
                onClick={() => navigate("/login")}
              >
                Get Started !
              </button>
              <button className={`${styles.readMore}`} type="submit">
                Learn More
              </button>
            </div>
          </div>
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <img
              src={window.innerWidth < 768 ? bagSmall : bagLarge}
              className={`${styles.vector} img-fluid `}
              alt="shopping bag"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
