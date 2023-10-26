import React, { useEffect, useState } from "react";
import styles from "./GenieToast.module.css";
import { IoIosClose } from "react-icons/io";

const GenieToast = ({ message, setToast }) => {
  const [opacity, setOpacity] = useState(100);

  useEffect(() => {
    let interval;
    if (opacity > 0)
      interval = setInterval(() => {
        setOpacity((prev) => prev - 1);
      }, 30);
    // Increase or decrease the value 40 to slower or faster blurring
    else setToast(false);
    return () => clearInterval(interval);
  }, [opacity]);

  return (
    <div
      className={`position-absolute d-flex justify-content-between bg-black align-items-center text-white px-3 py-2 gap-3 rounded ${styles.container}`}
      style={{ opacity: opacity / 100, cursor: "pointer" }}
      onMouseOver={() => setOpacity(100)}
      onClick={() => setToast(false)}
    >
      <div></div>
      <div>{message}</div>
      <div>
        <IoIosClose size={25} />
      </div>
    </div>
  );
};

export default GenieToast;
