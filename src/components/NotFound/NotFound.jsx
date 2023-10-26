import React from "react";
import { useNavigate } from "react-router-dom";
import vector from "./img/Vector.svg";
import styles from "./NotFound.module.css";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="h-100 w-100 d-flex justify-content-center align-items-center flex-column">
      <div className="col-10 col-lg-6 col-md-8 col-sm-10 text-center d-flex justify-content-center itc pb-4">
        <img src={vector} alt="404 vector" className="w-100 " />
      </div>
      <button onClick={() => navigate(-1)} className={`${styles.goBack}`}>
        Go Back
      </button>
    </div>
  );
};

export default NotFound;
