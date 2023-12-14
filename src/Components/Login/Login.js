import React, { useContext, useState } from "react";
import AuthContext from "../../Context/AuthContext/AuthContext";
import "./Login.css";
import eyeOpen from "../../Assets/eyeopen.svg";
import eyeClose from "../../Assets/eyeclose.svg";
export default function Login({ setAuthRoute }) {
  const [invalid, set_invalid] = useState(false);
  const [email, set_email] = useState("");
  const [password, set_password] = useState("");
  const [isSecure, setIsSecure] = useState(true);
  const Context = useContext(AuthContext);
  const { url, set_userDetails } = Context;

  const handle_login = async (e) => {
    e.preventDefault();
    let payload = { email, password };
    set_invalid(false);
    try {
      let response = await fetch(url + "/v1/user/login/admin", {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      response = await response.json();

      if (response.statusCode >= 400) {
        set_invalid(true);
      } else {
        localStorage.setItem("userDetails", JSON.stringify(response.data));
        set_userDetails(response.data);
        set_invalid(false);
      }
    } catch (err) {
      set_invalid(true);
    }
  };

  return (
    <>
      <div className="login_outer">
        <form onSubmit={handle_login} className="login">
          <h2 style={{ fontWeight: "bold", textAlign: "center" }}>
            Welcome to admin panel
          </h2>
          <div className="logo_login">
            <img src="./yz_logo.png" alt="" />
          </div>
          <div className="form_group">
            <strong>Email</strong>
            <input
              value={email}
              onChange={(e) => set_email(e?.target?.value)}
              type="email"
              placeholder="Enter email"
            />
          </div>
          <div className="form_group">
            <strong>Password</strong>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                background: "#E7F0FE",
                border: "1px solid rgba(0, 0, 0, 0.2)",
                borderRadius: "5px",
                padding: "0 5px 0 5px",
              }}
            >
              <input
                value={password}
                onChange={(e) => set_password(e?.target?.value)}
                type={isSecure && "password"}
                placeholder="Enter password"
                style={{ borderWidth: 0, borderRadius: 10 }}
              />
              <div style={{ width: 20 }} onClick={() => setIsSecure(!isSecure)}>
                {isSecure ? <img src={eyeOpen} /> : <img src={eyeClose} />}
              </div>
            </div>
          </div>
          <div
            style={{ color: invalid ? "red" : "transparent" }}
            className="invalid"
          >
            Invalid Credentials
          </div>
          <button type="submit">Login</button>
          <div
            style={{ display: "flex", justifyContent: "center" }}
            onClick={() => setAuthRoute("Forgot")}
          >
            <a type="click" style={{ color: "#3A7AFE" }}>
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </>
  );
}
