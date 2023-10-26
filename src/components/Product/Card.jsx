import React from "react";
import styles from "./Card.module.css";
import { AiFillStar, AiOutlineStar, AiOutlineHeart } from "react-icons/ai";

const Card = ({ id, title, description, price, image, rating }) => {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center rounded-4 border border-1"
      style={{ width: "280px", height: "350px" }}
    >
      <div
        className="w-100 rounded-top-4 d-flex justify-content-center align-items-center position-relative"
        style={{ backgroundColor: "#fff", height: "65%" }}
      >
        <div className={styles.like}>
          <AiOutlineHeart size={18} />
        </div>
        <img
          src={image}
          alt="product image"
          style={{
            height: "170px",
            width: "auto",
            aspectRatio: 1,
            objectFit: "contain",
          }}
        />
      </div>
      <div className="w-100 rounded-bottom-4 p-2" style={{ height: "35%" }}>
        <div className="d-flex justify-content-between align-items-center px-1">
          <h5 style={{ fontWeight: 600, fontSize: "15px" }}>
            {title.slice(0, 18)}...
          </h5>
          <h5 style={{ fontWeight: 600, fontSize: "15px" }}>$ {price}</h5>
        </div>
        <div style={{ fontSize: "10px", fontWeight: 500 }} className="px-1">
          A perfect balance of high-fidelity audio
        </div>
        <div className="d-flex align-items-center py-2 px-1">
          <AiFillStar size={12} color="#349b7e" />
          <AiFillStar size={12} color="#349b7e" />
          <AiFillStar size={12} color="#349b7e" />
          <AiFillStar size={12} color="#349b7e" />
          <AiOutlineStar size={12} color="#349b7e" />
          <span style={{ fontSize: "10px", fontWeight: 500 }}> (241)</span>
        </div>
        <button className={styles.addToCart}>Add to Cart</button>
      </div>
    </div>
  );
};

export default Card;
