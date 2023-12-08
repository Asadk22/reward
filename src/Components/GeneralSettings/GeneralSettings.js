import React, { useContext, useEffect, useState } from "react";
import "./GeneralSettings.css";
import AuthContext from "../../Context/AuthContext/AuthContext";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function GeneralSettings(props) {
  const Context = useContext(AuthContext);
  const { userDetails, set_userDetails, url } = Context;

  let [msg, set_msg] = useState("");
  let [appName, set_appName] = useState("");
  let [footer, set_footer] = useState("");
  let [referPoints, set_referPoints] = useState(0);
  let [dailyPoints, set_dailyPoints] = useState(0);
  let [about, set_about] = useState("");
  let [address, set_address] = useState("");
  let [email, set_email] = useState(userDetails?.email);
  let [phone, set_phone] = useState(userDetails?.phone);
  const [privacyPolicy, setPrivacyPolicy] = useState("");
  const [termsCondition, setTermsCondition] = useState("");

  let changeProfileData = async () => {
    try {
      let payload = {
        email,
        phone,
        name: userDetails?.name,
        userName: userDetails?.userName,
      };
      let response = await fetch(url + "/v1/user/updateProfile", {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          authorization: userDetails.token,
        },
        body: JSON.stringify(payload),
      });
      response = await response.json();

      if (response.statusCode == 401) {
        set_userDetails(null);
        localStorage.removeItem("userDetails");
      } else if (response.statusCode >= 400) {
      } else {
        localStorage.setItem(
          "userDetails",
          JSON.stringify({ ...userDetails, email, phone })
        );
        set_userDetails({ ...userDetails, email, phone });
      }
    } catch (err) {}
  };
  const changeData = async () => {
    try {
      changeProfileData();
      let payload = {
        appName,
        footer,
        referPoints,
        dailyPoints,
        about,
        address,
        termsAndConditions: termsCondition,
        privacyAndPolicy: privacyPolicy,
      };
      let response = await fetch(url + "/v1/user/admin/options", {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          authorization: userDetails.token,
        },
        body: JSON.stringify(payload),
      });
      response = await response.json();

      if (response.statusCode == 401) {
        set_userDetails(null);
        localStorage.removeItem("userDetails");
      } else if (response.statusCode >= 400) {
        set_msg(response.msg);
      } else {
        set_msg("Settings updated successfully");
      }
    } catch (err) {}
  };

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
        set_appName(response?.data?.appName);
        set_footer(response?.data?.footer);
        props.set_footer(response?.data?.footer);
        set_referPoints(response?.data?.referPoints);
        set_dailyPoints(response?.data?.dailyPoints);
        set_about(response?.data?.about);
        set_address(response?.data?.address);
        setTermsCondition(response?.data?.termsAndConditions);
        setPrivacyPolicy(response?.data?.privacyAndPolicy);
      }
    } catch (err) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="back_div">
        <div className="gene_head">General settings</div>
        <div className="gene_inner">
          <div
            style={{
              textAlign: "center",
              fontWeight: "bold",
              color:
                msg == "Settings updated successfully"
                  ? "green"
                  : msg != ""
                  ? "red"
                  : "transparent",
            }}
          >
            {msg}
          </div>
          <div className="two_inputs">
            <div className="input">
              <div className="label">
                Application name<span style={{ color: "red" }}>*</span>
              </div>
              <input
                type="text"
                value={appName}
                onChange={(e) => set_appName(e?.target?.value)}
                placeholder="Application Name"
              />
            </div>
            <div className="input">
              <div className="label">
                Footer Text<span style={{ color: "red" }}>*</span>
              </div>
              <input
                type="text"
                value={footer}
                onChange={(e) => set_footer(e?.target?.value)}
                placeholder="Footer text"
              />
            </div>
          </div>
          <div className="two_inputs">
            <div className="input">
              <div className="label">
                Website logo image<span style={{ color: "red" }}>*</span>
              </div>
              <input
                type="file"
                name="logo"
                id="image"
                title="Logo required"
                accept="image/jpeg, image/png"
              />
            </div>
            <div className="input">
              <div className="label">
                Website favicon image<span style={{ color: "red" }}>*</span>
              </div>
              <input
                type="file"
                name="logo"
                id="image"
                title="Logo required"
                accept="image/jpeg, image/png"
              />
            </div>
          </div>
          <div className="two_inputs">
            <div className="input">
              <div className="label">
                Referral Coins<span style={{ color: "red" }}>*</span>
              </div>
              <input
                type="number"
                value={referPoints}
                onChange={(e) => set_referPoints(e?.target?.value)}
                placeholder="Referral Coins"
              />
            </div>
            <div className="input">
              <div className="label">
                Daily Coins<span style={{ color: "red" }}>*</span>
              </div>
              <input
                type="number"
                value={dailyPoints}
                onChange={(e) => set_dailyPoints(e?.target?.value)}
                placeholder="Daily Coins"
              />
            </div>
          </div>
          <div className="single_input">
            <div className="label">
              Address<span style={{ color: "red" }}>*</span>
            </div>
            <input
              type="text"
              value={address}
              onChange={(e) => set_address(e?.target?.value)}
              placeholder="Address"
            />
          </div>
          <div className="two_inputs">
            <div className="input">
              <div className="label">
                Phone number<span style={{ color: "red" }}>*</span>
              </div>
              <input
                type="text"
                value={phone}
                onChange={(e) => set_phone(e?.target?.value)}
                placeholder="Phone number"
              />
            </div>
            <div className="input">
              <div className="label">
                Email<span style={{ color: "red" }}>*</span>
              </div>
              <input
                type="text"
                value={email}
                onChange={(e) => set_email(e?.target?.value)}
                placeholder="Email"
              />
            </div>
          </div>
          <div className="single_input">
            <div className="label">
              About<span style={{ color: "red" }}>*</span>
            </div>
            <input
              type="text"
              value={about}
              onChange={(e) => set_about(e?.target?.value)}
              placeholder="About"
            />
          </div>
          <div className="two_inputs">
            <div className="input">
              <div className="label">
                Privacy Policy<span style={{ color: "red" }}>*</span>
              </div>
              <CKEditor
                editor={ClassicEditor}
                data={privacyPolicy}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setPrivacyPolicy(data);
                }}
              />
            </div>
            <div className="input">
              <div className="label">
                Tersms and Condition<span style={{ color: "red" }}>*</span>
              </div>
              <CKEditor
                editor={ClassicEditor}
                data={termsCondition}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setTermsCondition(data);
                }}
              />
            </div>
          </div>
          <div className="save_admin_div">
            <button onClick={changeData} className="save_admin">
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
