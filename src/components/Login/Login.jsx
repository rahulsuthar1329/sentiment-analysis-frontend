import React, { useState } from "react";
import styles from "./Login.module.css";
import vector from "./images/Left_Image_Cropped.png";
import google from "./images/Google_Logo.png";
import checkbox_unselected from "./images/Checkbox_Unselected.png";
import checkbox_selected from "./images/Checkbox_Selected.png";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin, useGoogleOneTapLogin } from "@react-oauth/google";
import { ToastContainer, toast } from "react-toastify";
import toastOptions from "../../utils/toastOptions";
import { useDispatch } from "react-redux";
import { setLogin } from "../../store/Slices/AuthSlice";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import GenieToast from "./../GenieToast/GenieToast";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [uniqueId, setUniqueId] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [genieToast, setGenieToast] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Google Sign In
  // const authOnSuccess = async (response) => {
  //   console.log(response);
  //   try {
  //     // const res = await axios.get(
  //     //   "https://www.googleapis.com/oauth2/v3/userinfo",
  //     //   {
  //     //     headers: {
  //     //       Authorization: `Bearer ${response.access_token}`,
  //     //     },
  //     //   }
  //     // );
  //     const res = jwt_decode(response?.credential);
  //     console.log(res);
  //   } catch (error) {
  //     console.log("google signin error : ", error);
  //   }
  // };

  // const authOnError = (err) => {
  //   console.log("Google Login Error!", err);
  // };

  // const login = useGoogleOneTapLogin({
  //   onSuccess: authOnSuccess,
  //   onError: authOnError,
  // });

  const handleChange = (setState) => (event) => {
    setState(event.target.value);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (uniqueId.trim() && password.trim()) {
        const response = await axios.post("http://localhost:5001/auth/login", {
          uniqueId,
          password,
        });
        if (response.status === 200) {
          setLoading(false);
          toast.success("Login Successfully!", toastOptions);
          const { user, token } = response?.data;
          dispatch(setLogin({ user, token }));
          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
      } else {
        if (!uniqueId.trim()) {
          setLoading(false);
          toast.error("Please enter username or email.", toastOptions);
          return;
        }
        if (!password.trim()) {
          setLoading(false);
          toast.error("Please enter password.", toastOptions);
          return;
        }
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message, toastOptions);
        setLoading(false);
        return;
      }
      toast.error("Internal Server Error!", toastOptions);
      setLoading(false);
      console.log("Error: ", error);
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.mycont}>
        <div className={styles.leftSide}>
          <img
            src={vector}
            alt=""
            style={{ aspectRatio: 1, height: "75vh", width: "auto" }}
            className={styles.vector}
          />
        </div>
        <div className={styles.rightSide}>
          <form className={styles.content} onSubmit={handleOnSubmit}>
            <h2 className={styles.heading}>Login</h2>

            <input
              type="text"
              placeholder="Email or Username"
              value={uniqueId}
              name="uniqueId"
              onChange={handleChange(setUniqueId)}
              className={styles.input}
            />

            <div className={`${styles.input}`} style={{ position: "relative" }}>
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                value={password}
                name="password"
                className="border-0 w-100"
                style={{ outline: "none" }}
                onChange={handleChange(setPassword)}
              />
              <div
                className="border-0 d-flex align-items-center position-absolute top-0 bottom-0"
                style={{ right: "15px", cursor: "pointer", userSelect: "none" }}
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {!passwordVisible ? (
                  <BsFillEyeFill size={20} color={"#349b7e"} />
                ) : (
                  <BsFillEyeSlashFill size={20} color="#349b7e" />
                )}
              </div>
            </div>

            <div
              className={`d-flex justify-content-between align-items-center w-75 px-2 ${styles.forgot}`}
            >
              <p
                onClick={() => setRemember(!remember)}
                style={{
                  cursor: "pointer",
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                <img
                  src={remember ? checkbox_selected : checkbox_unselected}
                  alt="checkbox"
                  style={{ height: "15px", width: "auto", aspectRatio: 1 }}
                />{" "}
                <span>Remember Me</span>
              </p>
              <p>
                <span onClick={() => navigate("/forgot")}>
                  Forgot Password?
                </span>
              </p>
            </div>

            <button className={styles.submit}>
              {loading ? "..." : "Submit"}
            </button>
            <p>
              Don't have an Account ?{" "}
              <span onClick={() => navigate("/register")}>Register here.</span>
            </p>
          </form>
          <button
            className={`${styles.submit} d-flex justify-content-between align-items-center`}
          >
            <img
              src={google}
              alt="google icon"
              style={{ height: "auto", width: "23px", aspectRatio: 1 }}
            />{" "}
            <p>Login with Google</p>
            <div></div>
          </button>
        </div>
      </div>
      <ToastContainer />
      {genieToast ? (
        <GenieToast
          message={"Please enter a valid email or password."}
          setToast={setGenieToast}
        />
      ) : null}
    </div>
  );
};

export default Login;
