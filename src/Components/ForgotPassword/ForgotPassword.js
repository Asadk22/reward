import React, { useContext, useState } from "react";
import AuthContext from "../../Context/AuthContext/AuthContext";

const ForgotPassword = ({ setAuthRoute, setEmail, email }) => {
  const [otp, setOTP] = useState("");
  const [togglePassword, setTogglePassword] = useState(false);

  const Context = useContext(AuthContext);
  const { url } = Context;
  const sendEmail = async () => {
    let payload = { id: email };
    try {
      let response = await fetch(url + "/v1/user/send_otp", {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      response = await response.json();
      console.log(
        "🛵🦽 ~ file: ForgotPassword.js:26 ~ sendEmail ~ response:",
        response
      );

      if (response.statusCode >= 400) {
      } else {
        setTogglePassword(true);
        localStorage.setItem("OTP", JSON.stringify(response.data));
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  const MatchOTP = () => {
    const getOTP = JSON.parse(localStorage.getItem("OTP"));
    if (Number(otp) === getOTP?.OTP) {
      console.log("🛵🦽 ~ file: ForgotPassword.js:41 ~ MatchOTP ~ otp:", otp);
      setAuthRoute("Reset");
    } else {
      setAuthRoute("Forgot");
    }
  };

  return (
    <div className="d-flex justify-content-center  align-items-center vh-100">
      {togglePassword ? (
        <div className="d-flex flex-column gap-5  p-5 rounded-2 ">
          <div className="d-flex flex-column gap-3">
            <h2 className="fw-bold text-center">Email Sent</h2>
            <div className="logo_login">
              <img src="./yz_logo.png" alt="" />
            </div>
          </div>
          <div className="d-flex flex-sm-row flex-column  align-items-center gap-2">
            <div className="d-flex fw-semibold col">Enter OTP</div>
            <div className="col">
              <input
                value={otp}
                onChange={(e) => setOTP(e?.target?.value)}
                type="text"
                placeholder="Enter OTP"
                className="w-100 py-2 px-2 rounded-1 text-start border border-1"
              />
            </div>
          </div>
          {/* <div className="d-flex flex-sm-row flex-column  align-items-center gap-2">
            <div className="d-flex fw-semibold col">Confirm New Password</div>
            <div className="col">
              <input
                value={formData?.confirmNewPassword}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    confirmNewPassword: e?.target?.value,
                  })
                }
                type="text"
                placeholder="Confirm New Password"
                className="w-100 py-2 px-2 rounded-1 text-start border border-1"
              />
            </div>
          </div> */}
          <div>
            <button
              type="submit"
              className="w-100 border-0 rounded-2 py-2 btn btn-primary text-white  "
              onClick={() => MatchOTP()}
            >
              Submit
            </button>
          </div>
        </div>
      ) : (
        <div className="d-flex flex-column gap-5  p-5 rounded-2 ">
          <div className="d-flex flex-column gap-3">
            <h2 className="fw-bold">Forgot Password</h2>
            <div className="logo_login">
              <img src="./yz_logo.png" alt="" />
            </div>
          </div>
          <div className="d-flex flex-column  justify-content-start gap-2">
            <div className="fw-semibold  text-center">
              Enter E-mail to send OTP
            </div>
            <div>
              <input
                value={email}
                onChange={(e) => setEmail(e?.target?.value)}
                type="email"
                placeholder="Enter email"
                className="w-100 py-2 px-2 rounded-1 text-start border border-1"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-100 border-0 rounded-2 py-2 btn btn-primary text-white "
              onClick={() => sendEmail()}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
