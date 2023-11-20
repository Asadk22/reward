import React, { useContext, useState } from "react";
import AuthContext from "../../Context/AuthContext/AuthContext";

const ResetPassword = ({ setAuthRoute, setEmail, email }) => {
  const [formData, setFormData] = useState({});
  const [invalid, set_invalid] = useState(false);
  const Context = useContext(AuthContext);
  const { url } = Context;
  const submitReset = async () => {
    if (formData?.password === formData?.confirmPassword) {
      set_invalid(false);
      let payload = { id: email, password: formData?.password };
      try {
        let response = await fetch(url + "/v1/user/change_password", {
          method: "PUT",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        response = await response.json();
        console.log(
          "🛵🦽 ~ file: ResetPassword.js:21 ~ submitReset ~ response:",
          response
        );

        if (response.statusCode >= 400) {
        } else {
          setEmail("");
          setAuthRoute("/");
        }
      } catch (err) {}
    } else {
      set_invalid(true);
    }
  };
  return (
    <div className="d-flex justify-content-center  align-items-center vh-100">
      <div className="d-flex flex-column gap-5  p-5 rounded-2 ">
        <div className="d-flex flex-column gap-3">
          <h2 className="fw-bold text-center">Reset Password</h2>
          <div className="logo_login">
            <img src="./yz_logo.png" alt="" />
          </div>
        </div>
        <div className="d-flex flex-sm-row flex-column  align-items-center gap-2">
          <div className="d-flex fw-semibold col">New Password</div>
          <div className="col">
            <input
              value={formData?.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e?.target?.value })
              }
              type="password"
              placeholder="Enter New Password"
              className="w-100 py-2 px-2 rounded-1 text-start border border-1"
            />
          </div>
        </div>
        <div className="d-flex flex-sm-row flex-column  align-items-center gap-2">
          <div className="d-flex fw-semibold col">Confirm New Password</div>
          <div className="col">
            <input
              value={formData?.password}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e?.target?.value,
                })
              }
              type="text"
              placeholder="Enter confirm Password"
              className="w-100 py-2 px-2 rounded-1 text-start border border-1"
            />
          </div>
        </div>
        <div
          style={{ color: invalid ? "red" : "transparent" }}
          className="invalid"
        >
          Password and confirm password is not matched.
        </div>
        <div>
          <button
            type="submit"
            className="w-100 border-0 rounded-2 py-2 btn btn-primary text-white  "
            onClick={() => submitReset()}
          >
            Change
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
