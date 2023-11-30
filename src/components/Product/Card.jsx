import React, { useState } from "react";
import styles from "./Card.module.css";
import {
  AiFillStar,
  AiOutlineStar,
  AiOutlineHeart,
  AiFillHeart,
} from "react-icons/ai";
import { path } from "./../../path";
import axios from "axios";

const Card = ({ id, title, description, price, image, rating }) => {
  const [liked, setLiked] = useState(false);
  const [scale, setScale] = useState(1);

  const toggleLike = async () => {
    try {
      const res = await axios.post(`${path}/product/toggle_like`, {
        product_id: id,
      });
      console.log("Like response : ", res.data);
      setLiked(!liked);
    } catch (error) {
      console.log("Product liked error : ", error);
    }
  };

  console.log(scale);

  return (
    <div
      className={`${styles.card} d-flex flex-column justify-content-center align-items-center`}
      style={{ width: "280px", height: "350px" }}
      onMouseOver={() => setScale(1.1)}
      onMouseOut={() => setScale(1)}
    >
      {/* Image part */}
      <div
        className="w-100 d-flex justify-content-center align-items-center position-relative border"
        style={{
          backgroundColor: "#fff",
          height: "65%",
        }}
      >
        <div className={styles.like} onClick={toggleLike}>
          {!liked ? (
            <AiOutlineHeart size={18} />
          ) : (
            <AiFillHeart size={18} color="#349b7e" />
          )}
        </div>
        <img
          src={image}
          alt="product image"
          style={{
            height: "170px",
            width: "auto",
            aspectRatio: 1,
            objectFit: "contain",
            transform: `scale(${scale})`,
          }}
        />
      </div>

      {/* Content Part */}
      <div className="p-2 d-flex flex-column w-100" style={{ height: "35%" }}>
        <div className={`d-flex justify-content-between align-items-center`}>
          <h5
            className={styles.title}
            style={{ fontWeight: 500, fontSize: "14px" }}
          >
            {title}
          </h5>
        </div>
        <div className="d-flex gap-2 align-items-center">
          <p
            style={{
              fontWeight: 600,
              fontSize: "15px",
              textDecoration: "line-through",
              color: "gray",
            }}
          >
            Rs. 2,999
          </p>
          <p style={{ fontWeight: 600, fontSize: "15px" }}>Rs. 1,399</p>
          <div
            className="px-2 py-1"
            style={{
              backgroundColor: "#349b7e",
              fontSize: "10px",
              color: "white",
            }}
          >
            53% OFF
          </div>
        </div>
        <div className="d-flex align-items-start py-1 gap-1">
          <div className="d-flex">
            <AiFillStar size={13} color="#FFC700" />
            <AiFillStar size={13} color="#FFC700" />
            <AiFillStar size={13} color="#FFC700" />
            <AiFillStar size={13} color="#FFC700" />
            <AiOutlineStar size={13} color="#FFC700" />
          </div>
          <span
            style={{
              fontSize: "10px",
              fontWeight: 500,
            }}
          >
            (2K+ Reviews)
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
