import React, { useContext, useState } from 'react'
import "./ChangePassword.css";
import AuthContext from '../../Context/AuthContext/AuthContext';

export default function ChangePassword() {
    let [msg, set_msg] = useState("");
    let [oldPassword, set_oldPassword] = useState("");
    let [newPassword, set_newPassword] = useState("");
    let [cofirmNewPassword, set_cofirmNewPassword] = useState("");

    const Context = useContext(AuthContext);
    const { url, userDetails, set_userDetails } = Context;

    const fetchData = async () => {
        if(oldPassword == "" || newPassword == "") {
            set_msg("Please enter all fields");
            return;
        }
        else if(newPassword != cofirmNewPassword) {
            set_msg("Passwords do not match");
            return;
        }
        else set_msg("");
        try {
            let payload = {email: userDetails?.email, oldPassword, newPassword};
            let response = await fetch((url + "/v1/user/resetPass"), {
                method: "POST",
                headers: {
                    "accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            response = await response.json();
            
            if(response.statusCode == 401) {
                set_userDetails(null);
                localStorage.removeItem("userDetails");
            } else if(response.statusCode >= 400) {
            } else {
                set_oldPassword("");
                set_newPassword("");
                set_cofirmNewPassword("");
            }
            set_msg(response.msg);
        } catch(err) {
        }
    };

    return (
        <>
        <div className="back_div">
            <div className="gene_head">Change password</div>
            <div className="passwords">
                <div style={{color: (msg == "Password changed successfully") ? "green" : (msg != "" ? "red" : "transparent")}}>{msg}</div>
                <div className="input_change_pass">
                    <div className="label_change_pass">Old Password</div>
                    <input value={oldPassword} onChange={(e) => set_oldPassword(e?.target?.value)} type="password" placeholder='Enter old password' />
                </div>
                <div className="input_change_pass">
                    <div className="label_change_pass">New Password</div>
                    <input value={newPassword} onChange={(e) => set_newPassword(e?.target?.value)} type="password" placeholder='Enter new password' />
                </div>
                <div className="input_change_pass">
                    <div className="label_change_pass">Confirm new Password</div>
                    <input value={cofirmNewPassword} onChange={(e) => set_cofirmNewPassword(e?.target?.value)} type="password" placeholder='Confirm new password' />
                </div>
                <button onClick={fetchData} className="change_pass_btn">Change Password</button>
            </div>
        </div>
        </>
    )
}
