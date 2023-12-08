import React, { useState } from "react";
import AuthContext from "./AuthContext";

const AuthContextState = (props) => {
  let [userDetails, set_userDetails] = useState(
    JSON.parse(localStorage.getItem("userDetails")) || null
  );
  // let [url, set_url] = useState("http://localhost:4000");
  // let [url, set_url] = useState("https://dating-back-end.onrender.com");
  let [url, set_url] = useState("https://backend-bvn2.onrender.com");

  return (
    <AuthContext.Provider value={{ userDetails, set_userDetails, url }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextState;
