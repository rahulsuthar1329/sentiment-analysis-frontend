import React, { useEffect, useState, useContext, useRef } from "react";
import styles from "./VerifyOTP.module.css";
import vector from "./img/vector.png";
import logo from "./img/GenieCart_Teal.png";
import { useNavigate } from "react-router-dom";
import toastOptions from "../../utils/toastOptions";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

let currentIndex = 0;
const VerifyOTP = ({ setVerifyOTPModel, formData }) => {
  const [grow, setGrow] = useState(true);
  const [seconds, setSeconds] = useState(60);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [activeOTPIndex, setActiveOTPIndex] = useState(0);

  const inputRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      clearInterval(interval);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  const handleOnChange = (e) => {
    const { value } = e.target;
    const newOTP = [...otp];
    newOTP[currentIndex] = value.substring(value.length - 1);
    setOtp(newOTP);
    if (!value) {
      setActiveOTPIndex(currentIndex - 1);
      setGrow(false);
    } else {
      setActiveOTPIndex(currentIndex + 1);
      setGrow(true);
    }
  };

  const handleOnKeyDown = ({ key }, index) => {
    currentIndex = index;
    if (key === "Backspace" || (!otp[index] && !grow))
      setActiveOTPIndex(currentIndex - 1);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOTPIndex]);

  const handleOnClick = async (event) => {
    event.preventDefault();
    const combinedOTP = otp.join("");
    try {
      const firstName = formData.get("firstName");
      const lastName = formData.get("lastName");
      const username = formData.get("username");
      const email = formData.get("email");
      const password = formData.get("password");
      const dateOfBirth = formData.get("dateOfBirth");
      const gender = formData.get("gender");
      const mobile = formData.get("mobile");

      const response = await axios.post("http://localhost:5001/auth/register", {
        firstName,
        lastName,
        username,
        email,
        password,
        dateOfBirth,
        gender,
        mobile,
        combinedOTP,
      });
      if (response.data) {
        toast.success(
          "Congratulations! You are now a part of GenieCart Family.",
          toastOptions
        );
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error!");
    }
  };

  return (
    <div className={styles.verify}>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <img
            src={vector}
            alt=""
            width="100%"
            height="100%"
            className={styles.vector}
          />
        </div>
        <div className={styles.rightSide}>
          <img src={logo} alt="" height="35px" className={styles.logo} />
          <div className={styles.content}>
            <h3 className={styles.heading}>Verify your email</h3>
            <p>Please Enter the One Time Password (OTP) sent to your email</p>
            <div className={styles.code}>
              {otp.map((_, index) => {
                return (
                  <input
                    key={index}
                    ref={index === activeOTPIndex ? inputRef : null}
                    type="number"
                    name="input"
                    value={otp[index]}
                    className={styles.input}
                    onChange={handleOnChange}
                    onFocus={(event) => event.target.select()}
                    onKeyDown={(e) => handleOnKeyDown(e, index)}
                    maxLength={1}
                  />
                );
              })}
            </div>
            <p>
              {seconds ? (
                `Resend OTP in 00: ${seconds < 10 ? "0" + seconds : seconds} `
              ) : (
                <span>Resend OTP</span>
              )}
            </p>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <button className={styles.submit} onClick={handleOnClick}>
                Submit
              </button>
            </div>
            <p
              className={styles.goback}
              onClick={() => setVerifyOTPModel(false)}
            >
              Change your Credentials
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default VerifyOTP;
