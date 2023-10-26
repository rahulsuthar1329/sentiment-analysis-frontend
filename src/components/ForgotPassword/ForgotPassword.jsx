import React, { useState } from "react";
import styles from "./ForgotPassword.module.css";
import vector from "./img/Background_Image.png";
import logo from "./img/GenieCart_Teal.png";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import toastOptions from "../../utils/toastOptions";
import { isEmailValid, isPasswordValid } from "./../../utils/validation";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [otpReceived, setOtpReceived] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [cnfpassword, setCnfpassword] = useState("");

  // react curring
  const handleChange = (setState) => (event) => {
    return setState(event.target.value);
  };

  const handleOnClick = async (e) => {
    e.preventDefault();
    try {
      if (!otp) return toast.error("Please enter OTP.", toastOptions);
      if (!password) return toast.error("Please enter password.", toastOptions);
      if (!cnfpassword)
        return toast.error("Please enter confirm password.", toastOptions);
      if (!isPasswordValid(password))
        return toast.error("Invalid Password!", toastOptions);
      if (password !== cnfpassword)
        return toast.error("Password and Confirm Password doesn't match.");

      const verifyOTP = await axios.post(
        "https://sentiment-analysis-backend-three.vercel.app/auth/verify_otp",
        { email: email.trim(), otp }
      );

      const response = await axios.post(
        "https://sentiment-analysis-backend-three.vercel.app/auth/update_password",
        { email, password }
      );

      if (response.data) {
        toast.success(response.data.message, toastOptions);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      if (error.response?.data?.message)
        return toast.error(error.response.data.message, toastOptions);

      toast.error(error.message, toastOptions);
    }
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    try {
      if (!email.trim())
        return toast.error("Please enter email.", toastOptions);
      if (!isEmailValid(email))
        return toast.error("Invalid Email!", toastOptions);

      // api for getting otp from backend
      const response = await axios.post(
        "https://sentiment-analysis-backend-three.vercel.app/auth/send_otp",
        {
          email: email.trim(),
        }
      );

      if (response.data) {
        console.log(response.data);
        setOtpReceived(true);
        toast.success(response.data?.message, toastOptions);
      }
    } catch (error) {
      console.log(error);
      if (error.response?.data?.message)
        return toast.error(error.response.data.message, toastOptions);

      toast.error(error.message, toastOptions);
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
          <img src={logo} alt="" height="40px" className={styles.logo} />
          <div className={styles.content}>
            <h3 className={styles.heading}>Reset your password</h3>

            {!otpReceived ? (
              <div className={`${styles.emailContainer}`}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={`${styles.email}`}
                  onChange={handleChange(setEmail)}
                />
                <button className={styles.sendOTP} onClick={handleSendOTP}>
                  Submit
                </button>
              </div>
            ) : (
              <>
                <div className={`${styles.otp}`}>
                  <input
                    type="text"
                    placeholder="Enter OTP (Check your email)"
                    className={`${styles.input} w-100 `}
                    onChange={handleChange(setOtp)}
                  />
                  <p onClick={handleSendOTP} className={`${styles.resend}`}>
                    Resend
                  </p>
                </div>
                <input
                  type="text"
                  placeholder="New Password"
                  className={`${styles.input}`}
                  onChange={handleChange(setPassword)}
                />
                <input
                  type="text"
                  placeholder="Confirm Password"
                  className={`${styles.input}`}
                  onChange={handleChange(setCnfpassword)}
                />
                <button className={styles.submit} onClick={handleOnClick}>
                  Change My Password
                </button>
                <p className={styles.goback} onClick={() => setOtpReceived("")}>
                  Change Email ID
                </p>
              </>
            )}
            <div className={styles.goback} onClick={() => navigate("/login")}>
              Back to Login
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;
