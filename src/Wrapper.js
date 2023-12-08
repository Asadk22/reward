import React, { useContext, useEffect, useState } from "react";
import AuthContext from "./Context/AuthContext/AuthContext";
import Main from "./Components/Main/Main";
import Login from "./Components/Login/Login";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentDots,
  faGauge,
  faKey,
  faGear,
  faList,
  faDollarSign,
  faPeopleCarryBox,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import ResetPassword from "./Components/ForgotPassword/ResetPassword";

export default function Wrapper() {
  const Context = useContext(AuthContext);
  const { userDetails, set_userDetails } = Context;
  const [authRoute, setAuthRoute] = useState("/");
  const [email, setEmail] = useState("");

  let [selected_tab, set_selected_tab] = useState("Dashboard");
  let [dash_color, set_dash_color] = useState("rgb(170, 170, 170)");
  let [user_list_color, set_user_list_color] = useState("rgb(170, 170, 170)");
  let [refer_points_color, set_refer_points_color] =
    useState("rgb(170, 170, 170)");
  let [daily_points_color, set_daily_points_color] =
    useState("rgb(170, 170, 170)");
  let [team_member_color, set_team_member_color] =
    useState("rgb(170, 170, 170)");
  let [feedback_color, set_feedback_color] = useState("rgb(170, 170, 170)");
  let [general_settings_color, set_general_settings_color] =
    useState("rgb(170, 170, 170)");
  let [change_pass_color, set_change_pass_color] =
    useState("rgb(170, 170, 170)");
  let [logout_color, set_logout_color] = useState("rgb(170, 170, 170)");
  let [blue_color, set_blue_color] = useState("rgb(58, 122, 254)");

  const handleLogOut = async () => {
    set_userDetails(null);
    localStorage.removeItem("userDetails");
  };

  const landscape = () => {
    let expand = document.querySelector(".expand");
    if (expand) expand.style.display = "none";
  };

  const mobile = () => {
    let expand = document.querySelector(".expand");
    if (expand) expand.style.display = "flex";
  };

  const handleResize = () => {
    if (window.innerWidth > window.innerHeight) landscape();
    else mobile();
  };

  useEffect(() => {
    setInterval(() => {
      if (window.innerWidth > window.innerHeight) landscape();
      else mobile();
    }, 100);
  }, []);

  let [open, set_open] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      handleResize();
    }, 20);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    let closeSideBar = async () => {
      let sidebar = document.querySelector(".sidebar");
      if (sidebar && open) {
        sidebar.classList.add("close_sidebar");
        setTimeout(() => {
          sidebar.classList.remove("close_sidebar");
          sidebar.style.display = "none";
          set_open(false);
        }, 380);
      }
    };

    window.addEventListener("click", closeSideBar);

    return () => {
      window.removeEventListener("click", closeSideBar);
    };
  }, [open]);
  console.log({ selected_tab });
  let openSideBar = async () => {
    let sidebar = document.querySelector(".sidebar");
    if (sidebar) {
      sidebar.style.display = "flex";
      sidebar.classList.add("open_sidebar");
      setTimeout(() => {
        sidebar.classList.remove("open_sidebar");
        set_open(true);
      }, 380);
    }
  };

  return (
    <>
      {!userDetails && (
        <>
          {authRoute?.includes("Forgot") && (
            <ForgotPassword
              setAuthRoute={setAuthRoute}
              setEmail={setEmail}
              email={email}
            />
          )}
          {authRoute?.includes("Reset") && (
            <ResetPassword
              setAuthRoute={setAuthRoute}
              setEmail={setEmail}
              email={email}
            />
          )}
          {authRoute?.includes("/") && <Login setAuthRoute={setAuthRoute} />}
        </>
      )}
      {userDetails && (
        <>
          <nav>
            <div className="nav_l">
              <img src="./yz_logo.png" alt="" />
            </div>
            <div className="expand">
              <img onClick={openSideBar} src="./lines.png" alt="" />
            </div>
            <div style={{ marginLeft: 55, marginTop: 20 }}>
              <h1>{`Superadmin (${userDetails?.email})`}</h1>
            </div>
            <div className="sidebar">
              <div
                className="tab"
                onClick={() => set_selected_tab("Dashboard")}
                onMouseEnter={() => set_dash_color("rgb(58, 122, 254)")}
                onMouseLeave={() => set_dash_color("rgb(170, 170, 170)")}
              >
                <FontAwesomeIcon
                  icon={faGauge}
                  style={{
                    color:
                      selected_tab == "Dashboard" ? blue_color : dash_color,
                  }}
                />
                <span
                  style={{
                    color:
                      selected_tab == "Dashboard" ? blue_color : dash_color,
                    marginLeft: "0.6rem",
                  }}
                >
                  Dashboard
                </span>
              </div>
              <div
                className="tab"
                onClick={() => set_selected_tab("Users List")}
                onMouseEnter={() => set_user_list_color("rgb(58, 122, 254)")}
                onMouseLeave={() => set_user_list_color("rgb(170, 170, 170)")}
              >
                <FontAwesomeIcon
                  icon={faList}
                  style={{
                    color:
                      selected_tab == "Users List"
                        ? blue_color
                        : user_list_color,
                  }}
                />
                <span
                  style={{
                    color:
                      selected_tab == "Users List"
                        ? blue_color
                        : user_list_color,
                    marginLeft: "0.6rem",
                  }}
                >
                  Users List
                </span>
              </div>
              <div
                className="tab"
                onClick={() => set_selected_tab("Referral Coins")}
                onMouseEnter={() => set_refer_points_color("rgb(58, 122, 254)")}
                onMouseLeave={() =>
                  set_refer_points_color("rgb(170, 170, 170)")
                }
              >
                <FontAwesomeIcon
                  icon={faDollarSign}
                  style={{
                    color:
                      selected_tab == "Referral Coins"
                        ? blue_color
                        : refer_points_color,
                  }}
                />
                <span
                  style={{
                    color:
                      selected_tab == "Referral Coins"
                        ? blue_color
                        : refer_points_color,
                    marginLeft: "0.6rem",
                  }}
                >
                  Referral Coins
                </span>
              </div>
              <div
                className="tab"
                onClick={() => set_selected_tab("Daily Coins")}
                onMouseEnter={() => set_daily_points_color("rgb(58, 122, 254)")}
                onMouseLeave={() =>
                  set_daily_points_color("rgb(170, 170, 170)")
                }
              >
                <FontAwesomeIcon
                  icon={faDollarSign}
                  style={{
                    color:
                      selected_tab == "Daily Coins"
                        ? blue_color
                        : daily_points_color,
                  }}
                />
                <span
                  style={{
                    color:
                      selected_tab == "Daily Coins"
                        ? blue_color
                        : daily_points_color,
                    marginLeft: "0.6rem",
                  }}
                >
                  Daily Coins
                </span>
              </div>
              <div
                className="tab"
                onClick={() => set_selected_tab("Team member")}
                onMouseEnter={() => set_team_member_color("rgb(58, 122, 254)")}
                onMouseLeave={() => set_team_member_color("rgb(170, 170, 170)")}
              >
                <FontAwesomeIcon
                  icon={faPeopleCarryBox}
                  style={{
                    color:
                      selected_tab == "Team member"
                        ? blue_color
                        : team_member_color,
                  }}
                />
                <span
                  style={{
                    color:
                      selected_tab == "Team member"
                        ? blue_color
                        : team_member_color,
                    marginLeft: "0.6rem",
                  }}
                >
                  Member List
                </span>
              </div>
              <div
                className="tab"
                onClick={() => set_selected_tab("Feedback")}
                onMouseEnter={() => set_feedback_color("rgb(58, 122, 254)")}
                onMouseLeave={() => set_feedback_color("rgb(170, 170, 170)")}
              >
                <FontAwesomeIcon
                  icon={faCommentDots}
                  style={{
                    color:
                      selected_tab == "Feedback" ? blue_color : feedback_color,
                  }}
                />
                <span
                  style={{
                    color:
                      selected_tab == "Feedback" ? blue_color : feedback_color,
                    marginLeft: "0.6rem",
                  }}
                >
                  Feedback
                </span>
              </div>
              <div
                className="tab"
                onClick={() => set_selected_tab("General settings")}
                onMouseEnter={() =>
                  set_general_settings_color("rgb(58, 122, 254)")
                }
                onMouseLeave={() =>
                  set_general_settings_color("rgb(170, 170, 170)")
                }
              >
                <FontAwesomeIcon
                  icon={faGear}
                  style={{
                    color:
                      selected_tab == "General settings"
                        ? blue_color
                        : general_settings_color,
                  }}
                />
                <span
                  style={{
                    color:
                      selected_tab == "General settings"
                        ? blue_color
                        : general_settings_color,
                    marginLeft: "0.6rem",
                  }}
                >
                  General Settings
                </span>
              </div>
              <div
                className="tab"
                onClick={() => set_selected_tab("Change Password")}
                onMouseEnter={() => set_change_pass_color("rgb(58, 122, 254)")}
                onMouseLeave={() => set_change_pass_color("rgb(170, 170, 170)")}
              >
                <FontAwesomeIcon
                  icon={faKey}
                  style={{
                    color:
                      selected_tab == "Change Password"
                        ? blue_color
                        : change_pass_color,
                  }}
                />
                <span
                  style={{
                    color:
                      selected_tab == "Change Password"
                        ? blue_color
                        : change_pass_color,
                    marginLeft: "0.6rem",
                  }}
                >
                  Change Password
                </span>
              </div>
              <div
                className="tab"
                onClick={() => {
                  handleLogOut();
                  set_logout_color("rgb(170, 170, 170)");
                  set_selected_tab("Dashboard");
                }}
                onMouseEnter={() => set_logout_color("rgb(58, 122, 254)")}
                onMouseLeave={() => set_logout_color("rgb(170, 170, 170)")}
              >
                <FontAwesomeIcon
                  icon={faRightFromBracket}
                  style={{
                    color: selected_tab == "Logout" ? blue_color : logout_color,
                  }}
                />
                <span
                  style={{
                    color: selected_tab == "Logout" ? blue_color : logout_color,
                    marginLeft: "0.6rem",
                  }}
                >
                  Logout
                </span>
              </div>
            </div>
          </nav>
          <Main
            selected_tab={selected_tab}
            set_selected_tab={set_selected_tab}
          />
        </>
      )}
    </>
  );
}
