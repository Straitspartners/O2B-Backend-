// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import './Signup.css';

// const Login = () => {
//   const [loginType, setLoginType] = useState("password");
//   const [identifier, setIdentifier] = useState("");
//   const [password, setPassword] = useState("");
//   const [otp, setOtp] = useState("");
//   const [error, setError] = useState("");
//   const [isOtpSent, setIsOtpSent] = useState(false);
//   const [showPopup, setShowPopup] = useState(false); // State for popup visibility
//   const navigate = useNavigate();

//   const Forgetpassword = () => {
//     navigate("/forgotpassword");
//   };
//   // Handle form submission
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     const loginData = {
//       login_type: loginType,
//       identifier,
//       password,
//       otp: loginType === "otp" ? otp : undefined,
//     };

//     try {
//       const response = await axios.post(
//         "http://192.168.31.111:8000/api/users/login/",
//         loginData
//       );
//       if (response.data.tokens) {
//         // Store JWT tokens in localStorage or context/state
//         localStorage.setItem("access_token", response.data.tokens.access);
//         localStorage.setItem("refresh_token", response.data.tokens.refresh);
//         // Redirect user to the homepage or dashboard
//         navigate("/dashboardpreferences");
//       }
//     } catch (error) {
//       setError(error.response?.data?.error || "Something went wrong");
//       setShowPopup(true); // Show popup on error

//     }
//   };

//   // Handle OTP request
//   const requestOtp = async () => {
//     try {
//       const response = await axios.post(
//         "http://192.168.31.111:8000/api/users/login/",
//         { identifier, login_type: "otp" }
//       );
//       if (response.data.message === "OTP sent successfully.") {
//         setIsOtpSent(true);
//         setError("");
//       }
//     } catch (error) {
//       setError(error.response?.data?.error || "Something went wrong");
//     }
//   };

//   return (
//     <div className="signup-container">
//       <div className="signup-section gap-4">
//         <h1 className="signup-section-h1">One Step Closer To Your Bali!</h1>
//         <div className="signup-overlay">
//           <h2 className="signup-section-h2 " style={{ marginBottom: "15px" }}>Sign up</h2>

//           {/* <p className="d-none d-md-block " style={{ color: "white" }}>
//             Sign in to rediscover the magic of Bali, your gateway to
//             unforgettable experiences
//           </p> */}

//           <div className="signup-form ">
//             <form onSubmit={handleLogin}>
//               <div className="form-group gap-4">
//                 <input
//                 className="input-field gap-4"
//                   placeholder="Email or Mobile Number"
//                   type="text"
//                   style={{ marginBottom: "15px" }}
//                   id="identifier"
//                   value={identifier}
//                   onChange={(e) => setIdentifier(e.target.value)}
//                   required
//                 />
//               </div>

//               {loginType === "password" ? (
//                 <>
//                   <div className="form-group">
//                     <input
//                     className="input-field gap-4"
//                       type="password"
//                       id="password"
//                       style={{ marginBottom: "15px" }}
//                       placeholder="Password"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       required
//                     />
//                   </div>
//                 </>
//               ) : (
//                 <>
//                   {isOtpSent ? (
//                     <div className="form-group">
//                       <label htmlFor="otp">Enter OTP</label>
//                       <input
//                         type="text"
//                         id="otp"
                        
//                         value={otp}
//                         onChange={(e) => setOtp(e.target.value)}
//                         required
//                       />
//                     </div>
//                   ) : (
//                     <div className="signup-btn-div">
//                       <button
//                         className="signup-btn"
//                         type="button"
//                         onClick={requestOtp}
//                       >
//                         Send OTP
//                       </button>
//                     </div>
//                   )}
//                 </>
//               )}

//               <div className="form-group">
//                 <label>
//                   <input
//                  style={{ marginBottom: "15px" }}
//                     type="radio"
//                     value="password"
//                     checked={loginType === "password"}
//                     onChange={() => setLoginType("password")}
//                   />
//                   Login with Password
//                 </label>
//                 <span  style={{ padding: "10px" }}></span>
//                 <label>
//                   <input
               
//                     className="signin-radio"
//                     type="radio"
//                     value="otp"
//                     checked={loginType === "otp"}
//                     onChange={() => setLoginType("otp")}
//                   />
//                   Login with OTP
//                 </label>
//                 <div style={{ marginBottom: "15px" }} className="signup-btn-div ">
//                    <button className="signup-btn" type="submit">
//                   Login
//                 </button>
//                 </div>
//               </div>
//               {/* <button className="Forgetpassword-btn" onClick={}>
//                 Forget password
//               </button> */}
              
//               <p  className="signin-text">
//                 Forget password? <a href="/forgotpassword">Reset</a>
//               </p>
            
              
             
             
//             </form>
//           </div>
//         </div>
//       </div>
//       {showPopup && (
//         <div className="popup-overlay">
//           <div className="popup">
//             <p>{error}</p>
          
//             <button onClick={() => setShowPopup(false)}>OK</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Login;
// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import './Signup.css';

// const Login = () => {
//   const [loginType, setLoginType] = useState("password");
//   const [identifier, setIdentifier] = useState("");
//   const [password, setPassword] = useState("");
//   const [otp, setOtp] = useState("");
//   const [error, setError] = useState("");
//   const [isOtpSent, setIsOtpSent] = useState(false);
//   const [showPopup, setShowPopup] = useState(false); // State for popup visibility
//   const navigate = useNavigate();

//   const Forgetpassword = () => {
//     navigate("/forgotpassword");
//   };

//   // Handle form submission
//   const handleLogin = async (e) => {
//     e.preventDefault();
    
//     // Check if identifier (email or mobile) is empty
//     if (!identifier) {
//       setError("Please enter your email or mobile number.");
//       setShowPopup(true);
//       return;
//     }

//     const loginData = {
//       login_type: loginType,
//       identifier,
//       password,
//       otp: loginType === "otp" ? otp : undefined,
//     };

//     try {
//       const response = await axios.post(
//         "http://192.168.31.111:8000/api/users/login/",
//         loginData
//       );
//       if (response.data.tokens) {
//         // Store JWT tokens in localStorage or context/state
//         localStorage.setItem("access_token", response.data.tokens.access);
//         localStorage.setItem("refresh_token", response.data.tokens.refresh);
//         // Redirect user to the homepage or dashboard
//         navigate("/dashboardpreferences");
//       }
//     } catch (error) {
//       setError(error.response?.data?.error || "Something went wrong");
//       setShowPopup(true); // Show popup on error
//     }
//   };

//   // Handle OTP request
//   const requestOtp = async () => {
//     if (!identifier) {
//       setError("Please enter your email or mobile number.");
//       setShowPopup(true);
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "http://192.168.31.111:8000/api/users/login/",
//         { identifier, login_type: "otp" }
//       );
//       if (response.data.message === "OTP sent successfully.") {
//         setIsOtpSent(true);
//         setError("");
//       }
//     } catch (error) {
//       setError(error.response?.data?.error || "Something went wrong");
//       setShowPopup(true);
//     }
//   };

//   return (
//     <div className="signup-container">
//       <div className="signup-section gap-4">
//         <h1 className="signup-section-h1">One Step Closer To Your Bali!</h1>
//         <div className="signup-overlay">
//           <h2 className="signup-section-h2 " style={{ marginBottom: "15px" }}>Sign up</h2>

//           <div className="signup-form ">
//             <form onSubmit={handleLogin}>
//               <div className="form-group gap-4">
//                 <input
//                   className="input-field gap-4"
//                   placeholder="Email or Mobile Number"
//                   type="text"
//                   style={{ marginBottom: "15px" }}
//                   id="identifier"
//                   value={identifier}
//                   onChange={(e) => setIdentifier(e.target.value)}
//                   required
//                 />
//               </div>

//               {loginType === "password" ? (
//                 <>
//                   <div className="form-group">
//                     <input
//                       className="input-field gap-4"
//                       type="password"
//                       id="password"
//                       style={{ marginBottom: "15px" }}
//                       placeholder="Password"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       required
//                     />
//                   </div>
//                 </>
//               ) : (
//                 <>
//                   {isOtpSent ? (
//                     <div className="form-group">
//                       <label htmlFor="otp">Enter OTP</label>
//                       <input
//                         type="text"
//                         id="otp"
//                         value={otp}
//                         onChange={(e) => setOtp(e.target.value)}
//                         required
//                       />
//                     </div>
//                   ) : (
//                     <div className="signup-btn-div">
//                       <button
//                         className="signup-btn"
//                         type="button"
//                         onClick={requestOtp}
//                       >
//                         Send OTP
//                       </button>
//                     </div>
//                   )}
//                 </>
//               )}

//               <div className="form-group">
//                 <label>
//                   <input
//                     style={{ marginBottom: "15px" }}
//                     type="radio"
//                     value="password"
//                     checked={loginType === "password"}
//                     onChange={() => setLoginType("password")}
//                   />
//                   Login with Password
//                 </label>
//                 <span style={{ padding: "10px" }}></span>
//                 <label>
//                   <input
//                     className="signin-radio"
//                     type="radio"
//                     value="otp"
//                     checked={loginType === "otp"}
//                     onChange={() => setLoginType("otp")}
//                   />
//                   Login with OTP
//                 </label>
//                 <div style={{ marginBottom: "15px" }} className="signup-btn-div ">
//                   <button className="signup-btn" type="submit">
//                     Login
//                   </button>
//                 </div>
//               </div>
              
//               <p className="signin-text">
//                 Forget password? <a href="/forgotpassword">Reset</a>
//               </p>
//             </form>
//           </div>
//         </div>
//       </div>

//       {showPopup && (
//         <div className="popup-overlay">
//           <div className="popup">
//             <p>{error}</p>
//             <button onClick={() => setShowPopup(false)}>OK</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Login;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Signup.css';

const Login = () => {
  const [loginType, setLoginType] = useState("password");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // State for popup visibility
  const [countdown, setCountdown] = useState(0); // State to track remaining time for resend OTP
  const [isOtpButtonDisabled, setIsOtpButtonDisabled] = useState(false); // Disable OTP button during countdown
  const navigate = useNavigate();

  const Forgetpassword = () => {
    navigate("/forgotpassword");
  };

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Check if identifier (email or mobile) is empty
    if (!identifier) {
      setError("Please enter your email or mobile number.");
      setShowPopup(true);
      return;
    }

    const loginData = {
      login_type: loginType,
      identifier,
      password,
      otp: loginType === "otp" ? otp : undefined,
    };

    try {
      const response = await axios.post(
        "http://192.168.31.111:8000/api/users/login/",
        loginData
      );
      if (response.data.tokens) {
        // Store JWT tokens in localStorage or context/state
        localStorage.setItem("access_token", response.data.tokens.access);
        localStorage.setItem("refresh_token", response.data.tokens.refresh);
        // Redirect user to the homepage or dashboard
        navigate("/dashboardpreferences");
      }
    } catch (error) {
      setError(error.response?.data?.error || "Something went wrong");
      setShowPopup(true); // Show popup on error
    }
  };

  // Handle OTP request
  const requestOtp = async () => {
    if (!identifier) {
      setError("Please enter your email or mobile number.");
      setShowPopup(true);
      return;
    }

    try {
      const response = await axios.post(
        "http://192.168.31.111:8000/api/users/login/",
        { identifier, login_type: "otp" }
      );
      if (response.data.message === "OTP sent successfully.") {
        setIsOtpSent(true);
        setError("");
        startCountdown(); // Start the countdown timer for resend
      }
    } catch (error) {
      setError(error.response?.data?.error || "Something went wrong");
      setShowPopup(true);
    }
  };

  // Start countdown timer for OTP resend
  const startCountdown = () => {
    setCountdown(120); // 2 minutes in seconds
    setIsOtpButtonDisabled(true);

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsOtpButtonDisabled(false); // Re-enable button once countdown finishes
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Format time in mm:ss
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <div className="signup-container">
      <div className="signup-section gap-4">
        <h1 className="signup-section-h1">One Step Closer To Your Bali!</h1>
        <div className="signup-overlay">
          <h2 className="signup-section-h2 " style={{ marginBottom: "15px" }}>Sign up</h2>

          <div className="signup-form ">
            <form onSubmit={handleLogin}>
              <div className="form-group gap-4">
                <input
                  className="input-field gap-4"
                  placeholder="Email or Mobile Number"
                  type="text"
                  style={{ marginBottom: "15px" }}
                  id="identifier"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  required
                />
              </div>

              {loginType === "password" ? (
                <>
                  <div className="form-group">
                    <input
                      className="input-field gap-4"
                      type="password"
                      id="password"
                      style={{ marginBottom: "15px" }}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </>
              ) : (
                <>
                  {isOtpSent ? (
                    <div className="form-group">
                      <label htmlFor="otp">Enter OTP</label>
                      <input
                        type="text"
                        id="otp"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                      />
                      <div>
                        {countdown > 0 ? (
                          <p>Resend OTP in: {formatTime(countdown)}</p>
                        ) : (
                          <button
                            className="signup-btn"
                            type="button"
                            onClick={requestOtp}
                            disabled={isOtpButtonDisabled}
                          >
                            Resend OTP
                          </button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="signup-btn-div">
                      <button
                        className="signup-btn"
                        type="button"
                        onClick={requestOtp}
                        disabled={isOtpButtonDisabled}
                      >
                        Send OTP
                      </button>
                    </div>
                  )}
                </>
              )}

              <div className="form-group">
                <label>
                  <input
                    style={{ marginBottom: "15px" }}
                    type="radio"
                    value="password"
                    checked={loginType === "password"}
                    onChange={() => setLoginType("password")}
                  />
                  Login with Password
                </label>
                <span style={{ padding: "10px" }}></span>
                <label>
                  <input
                    className="signin-radio"
                    type="radio"
                    value="otp"
                    checked={loginType === "otp"}
                    onChange={() => setLoginType("otp")}
                  />
                  Login with OTP
                </label>
                <div style={{ marginBottom: "15px" }} className="signup-btn-div ">
                  <button className="signup-btn" type="submit">
                    Login
                  </button>
                </div>
              </div>
              
              <p className="signin-text">
                Forget password? <a href="/forgotpassword">Reset</a>
              </p>
            </form>
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <p>{error}</p>
            <button onClick={() => setShowPopup(false)}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
