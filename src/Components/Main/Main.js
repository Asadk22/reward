import React, { useContext, useEffect, useState } from "react";
import "./Main.css";
import Dashboard from "../Dashboard/Dashboard";
import CommonTable from "../CommonTable/CommonTable";
import GeneralSettings from "../GeneralSettings/GeneralSettings";
import ChangePassword from "../ChangePassword/ChangePassword";
import AuthContext from "../../Context/AuthContext/AuthContext";

export default function Main(props) {
  const Context = useContext(AuthContext);
  const { userDetails, set_userDetails, url } = Context;

  let [footer, set_footer] = useState("");

  const fetchData = async () => {
    try {
      let response = await fetch(url + "/v1/user/admin/options", {
        method: "GET",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          authorization: userDetails.token,
        },
      });
      response = await response.json();

      if (response.statusCode == 401) {
        set_userDetails(null);
        localStorage.removeItem("userDetails");
      } else if (response.statusCode >= 400) {
      } else {
        set_footer(response?.data?.footer);
      }
    } catch (err) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="main">
      {props.selected_tab == "Dashboard" && <Dashboard />}
      {(props.selected_tab == "Users List" ||
        props.selected_tab == "Referral Coins" ||
        props.selected_tab == "Daily Coins" ||
        props.selected_tab == "Feedback" ||
        props.selected_tab == "Team member") && (
        <CommonTable
          selected_tab={props.selected_tab}
          set_selected_tab={props?.set_selected_tab}
        />
      )}
      {props.selected_tab == "General settings" && (
        <GeneralSettings set_footer={set_footer} />
      )}
      {props.selected_tab == "Change Password" && <ChangePassword />}
      <div className="footer">{footer}</div>
    </div>
  );
}
