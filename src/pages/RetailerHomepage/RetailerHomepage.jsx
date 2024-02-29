import React, { useEffect, useState } from "react";
import styles from "./RetailerHomepage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../store/Slices/AuthSlice";
import logo from "./img/GenieCart_Teal.png";
import Sample from "./img/Sample.jpg";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineSearch, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { BsCart2, BsHeart } from "react-icons/bs";
import VideoSource from "./img/retailer.mp4";
import Card from "../../components/Product/Card";
import FakeApi from "../../Api/FakeApi";
import Footer from "../../components/Footer/Footer";

const RetailerHomepage = () => {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await FakeApi(100);
      setData(response);
    };
    getData();
  }, []);

  return (
    <div className="position-relative d-flex flex-column justify-content-between gap-2">
      <div className="position-relative d-flex flex-column align-items-center container  gap-3">
        {/* Navbar */}
        <div
          className={`${styles.navbar} w-100 px-2 pt-3 d-flex justify-content-between`}
        >
          <div className={styles.logo}>
            <img src={logo} height="30px" alt="GenieCart Logo" />
          </div>
          <div
            className={`${styles.links} d-flex justify-content-around align-items-center gap-4`}
          >
            <Link className={styles.Link} to={"/"}>
              Home
            </Link>
            <Link className={styles.Link} to={"/trending"}>
              Trending
            </Link>
            <Link className={styles.Link} to={"/recommended"}>
              Recommended
            </Link>
            <Link className={styles.Link} to={"/affordable"}>
              Affordable
            </Link>
          </div>
          <div
            className={`${styles.buttons} d-flex justify-content-around align-items-center gap-3`}
          >
            <div className="d-flex justify-content-center align-items-center">
              <AiOutlineSearch size={25} color="teal" />
            </div>
            <div className="d-flex">
              <BsCart2 size={25} color="teal" />
            </div>
            <div
              className="d-flex justify-content-center align-self-end"
              style={{ paddingBottom: "2px" }}
            >
              <BsHeart size={22} color="teal" />
            </div>
            <div
              className="d-flex justify-content-center align-items-center"
              onClick={() => {
                dispatch(setLogout());
                navigate("/landing");
              }}
            >
              <img src={Sample} alt="Sample" className={styles.profile} />
            </div>
          </div>
        </div>

        {/* Slider */}
        <div className={styles.carousal}>
          <div className={styles.singleSlide}>
            <video src={VideoSource} muted autoPlay loop />
            <div className={styles.sliderContent}>
              <h2>Welcome to Retailer's page of  Genie Cart</h2>
              <p>
                At GenieCart, we believe in making your online shopping
                experience magical. Whether you're a fashion enthusiast or a
                tech-savvy individual, we have curated an extensive collection
                of the latest trends in fashion and cutting-edge electronics
                gadgets just for you.
              </p>
              <button className="mt-2">Explore Now</button>
            </div>
          </div>
          <div className={styles.navigation}>
            <div className={styles.arrows}>
              <AiOutlineLeft size={20} color="white" />
            </div>
            <div className={styles.arrows}>
              <AiOutlineRight size={20} color="white" />
            </div>
          </div>
          <div className={styles.dots}>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
          </div>
        </div>

        {/* Products */}
        <div className={styles.products}>
          <h3 className="text-center">Best selling products</h3>
          <div className="d-flex justify-content-center align-items-center gap-4">
            <Link className={styles.category}>Smartphone</Link>
            <Link className={styles.category}>Watches</Link>
            <Link className={styles.category}>Shoes</Link>
            <Link className={styles.category}>T-Shirts</Link>
          </div>
          <div className={`${styles.productGrid} px-lg-5 `}>
            {data.length
              ? data.map(({ id, title, description, price, image, rating }) => (
                  <Card
                    key={id}
                    title={title}
                    description={description}
                    price={price}
                    image={image}
                    rating={rating}
                  />
                ))
              : null}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default RetailerHomepage;
