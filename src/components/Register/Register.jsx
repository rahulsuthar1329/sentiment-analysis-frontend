import React, { useState } from "react";
import styles from "./Register.module.css";
import vector from "./images/Left_Image_Cropped.png";
import google from "./images/Google_Logo.png";
import checkbox_unselected from "./images/Checkbox_Unselected.png";
import checkbox_selected from "./images/Checkbox_Selected.png";
import selectedRadio from "./images/selectedRadioOutlined.png";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import unSelectedRadio from "./images/unSelectedRadioOutlined.png";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import toastOptions from "../../utils/toastOptions";
import axios from "axios";
import {
  isEmailValid,
  isPasswordValid,
  isMobileValid,
  isUsernameValid,
} from "../../utils/validation";
import VerifyOTP from "../VerifyOTP/VerifyOTP";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [dateType, setDateType] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSelected, setIsSelected] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [verifyOTPModel, setVerifyOTPModel] = useState(false);
  const [form, setForm] = useState(null);

  let formData = new FormData();

  const navigate = useNavigate();

  const handleChange = (setState) => (event) => {
    if (event.target.name === "dob") {
      setState(event.target.value.split("-").reverse().join("-"));
      return;
    }
    setState(event.target.value);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (
        firstName.trim().length >= 3 &&
        lastName.trim().length >= 3 &&
        isPasswordValid(password) &&
        isUsernameValid(username) &&
        isMobileValid(mobile) &&
        isEmailValid(email) &&
        dateOfBirth &&
        gender &&
        isSelected
      ) {
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("username", username);
        formData.append("mobile", mobile);
        formData.append("gender", gender);
        formData.append("email", email.toLowerCase());
        formData.append("dateOfBirth", dateOfBirth);
        formData.append("password", password);

        setForm(formData);

        const response = await axios.post(
          "https://sentiment-analysis-backend-three.vercel.app/auth/send_auth_otp",
          { email: email.trim().toLowerCase(), username: username.trim() }
        );
        if (response.data) {
          setLoading(false);
          toast.success("OTP has been sent to your mail successfully.");
          setVerifyOTPModel(true);
          // setTimeout(() => navigate("/login"), 2000);
          return;
        }
      } else {
        if (!firstName.trim())
          toast.error("Please enter first name.", toastOptions);
        else if (!lastName.trim())
          toast.error("Please enter last name.", toastOptions);
        else if (!username.trim())
          toast.error("Please enter username.", toastOptions);
        else if (!isUsernameValid(username))
          toast.error("Please enter valid username.", toastOptions);
        else if (!email.trim())
          toast.error("Please enter email.", toastOptions);
        else if (!isEmailValid(email))
          toast.error("Please enter valid email.", toastOptions);
        else if (!mobile.trim())
          toast.error("Please enter mobile number.", toastOptions);
        else if (!isMobileValid(mobile))
          toast.error("Please enter valid mobile number.", toastOptions);
        else if (!dateOfBirth.trim())
          toast.error("Please select your Date of Birth.", toastOptions);
        else if (!gender.trim())
          toast.error("Please select your gender.", toastOptions);
        else if (!password.trim())
          toast.error("Please enter a password.", toastOptions);
        else if (!isPasswordValid(password))
          toast.error("Please enter a valid password.", toastOptions);
        else if (!isSelected)
          toast.error(
            "Please agree to our terms and conditions.",
            toastOptions
          );
        setLoading(false);
      }
    } catch (error) {
      if (error.response?.status === 403) {
        toast.error(error.response.data.message, toastOptions);
        setLoading(false);
        return;
      }
      toast.error("Internal Server Error!", toastOptions);
      console.log("Register Error : ", error);
      setLoading(false);
    }
  };

  return (
    <div className={styles.register}>
      <div className={styles.mycont}>
        <div className={styles.leftSide}>
          <img
            src={vector}
            alt=""
            style={{
              aspectRatio: 1,
              height: "75vh",
              width: "auto",
              boxShadow: "none",
            }}
            className={styles.vector}
          />
        </div>
        <div className={styles.rightSide}>
          <form className={styles.content} onSubmit={handleOnSubmit}>
            <h2 className={`${styles.heading} ${styles.dynamicWidth}`}>
              Register
            </h2>

            <div
              className={`d-flex justify-content-between gap-2 ${styles.dynamicWidth}`}
            >
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                name="firstName"
                onChange={handleChange(setFirstName)}
                className={styles.input}
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                name="lastName"
                onChange={handleChange(setLastName)}
                className={styles.input}
              />
            </div>

            <input
              type="text"
              placeholder="Username"
              value={username}
              name="username"
              onChange={handleChange(setUsername)}
              className={styles.input}
            />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              name="email"
              onChange={handleChange(setEmail)}
              className={styles.input}
            />

            <input
              type="text"
              placeholder="Mobile Number"
              value={mobile}
              name="mobile"
              onChange={handleChange(setMobile)}
              className={styles.input}
            />

            <input
              type={dateType ? "date" : "text"}
              placeholder="Date of Birth"
              className={styles.datepicker}
              name="dob"
              id="datepicker"
              value={dateOfBirth}
              onMouseOver={() => setDateType(true)}
              onMouseLeave={() => setDateType(false)}
              onChange={handleChange(setDateOfBirth)}
            />

            <div className={` ${styles.radioSection} ${styles.dynamicWidth}`}>
              <div
                className={`d-flex justify-content-between align-items-center`}
              >
                <label
                  htmlFor="male"
                  className="d-flex justify-content-between align-items-center gap-2"
                  style={{ cursor: "pointer" }}
                >
                  <input
                    type="radio"
                    onChange={handleChange(setGender)}
                    value="male"
                    id="male"
                    name="gender"
                    className="d-none"
                  />
                  <img
                    src={gender === "male" ? selectedRadio : unSelectedRadio}
                    width="18px"
                  />
                  <p>Male</p>
                </label>
                <label
                  htmlFor="female"
                  className="d-flex justify-content-between align-items-center gap-2"
                  style={{ cursor: "pointer" }}
                >
                  <input
                    type="radio"
                    onChange={handleChange(setGender)}
                    value="female"
                    id="female"
                    name="gender"
                    className="d-none"
                  />
                  <img
                    src={gender === "female" ? selectedRadio : unSelectedRadio}
                    width="18px"
                  />
                  <p>Female</p>
                </label>
                <label
                  htmlFor="other"
                  className="d-flex justify-content-between align-items-center gap-2"
                  style={{ cursor: "pointer" }}
                >
                  <input
                    type="radio"
                    onChange={handleChange(setGender)}
                    value="other"
                    id="other"
                    name="gender"
                    className="d-none"
                  />
                  <img
                    src={gender === "other" ? selectedRadio : unSelectedRadio}
                    width="18px"
                  />
                  <p>Other</p>
                </label>
              </div>
            </div>
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
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              className={styles.input}
              name="password"
              onChange={handleChange(setConfirmPassword)}
            />

            <div
              className={`${styles.dynamicWidth} d-flex px-1 gap-3 align-items-center `}
              style={{ cursor: "pointer" }}
              onClick={() => setIsSelected(!isSelected)}
            >
              <img
                src={isSelected ? checkbox_selected : checkbox_unselected}
                height={"18px"}
              />
              <p>
                I agree with <span>terms and conditions.</span>
              </p>
              <div></div>
            </div>

            <button className={styles.submit}>
              {loading ? "..." : "Submit"}
            </button>
            <p>
              Already have an Account ?{" "}
              <span onClick={() => navigate("/login")}>Login here.</span>
            </p>
          </form>
          <button
            className={`${styles.submit} d-flex justify-content-between align-items-center`}
          >
            <img src={google} alt="google icon" height={"23px"} />{" "}
            <p>Register with Google</p>
            <div></div>
          </button>
        </div>
      </div>

      {verifyOTPModel && (
        <VerifyOTP setVerifyOTPModel={setVerifyOTPModel} formData={form} />
      )}

      <ToastContainer />
    </div>
  );
};

export default Register;
