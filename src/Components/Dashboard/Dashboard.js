import React, { useContext, useEffect, useState } from 'react';
import "./Dashboard.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faDollarSign, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import AuthContext from '../../Context/AuthContext/AuthContext';

export default function Dashboard() {
    
    const Context = useContext(AuthContext);
    const { url, userDetails, set_userDetails } = Context;

    const [call_api, set_call_api] = useState(true);
    const [reg_users, set_reg_users] = useState(0);
    const [act_users, set_act_users] = useState(0);
    const [refer_points, set_refer_points] = useState(0);
    const [daily_points, set_daily_points] = useState(0);

    const fetchData = async () => {
        if(!call_api) return;
        set_call_api(false);
        try {
            let response = await fetch((url + "/v1/dashboard/admin"), {
                method: "GET",
                headers: {
                    "accept": "application/json",
                    "Content-Type": "application/json",
                    authorization: userDetails?.token,
                },
            });
            response = await response.json();
            if(response.statusCode == 401) {
                set_userDetails(null);
                localStorage.removeItem("userDetails");
            } else if(response.statusCode >= 400) {
            } else {
                set_reg_users(response?.data?.usersCount);
                set_act_users(response?.data?.usersCount);
                set_refer_points(response?.data?.referPoints);
                set_daily_points(response?.data?.dailyPoints);
            }
        } catch(err) {
        }
        set_call_api(true);
    };

    useEffect(() => {
      fetchData();
    }, []);

    return (
        <div className="dashboard">
            <div className="counters">
                <div className="counters_inside" style={{background: "rgba(255,159,0,255)"}}>
                    <div className="cou_logo">
                        <FontAwesomeIcon icon={faUser} style={{color: "black", fontSize: 20}} />
                    </div>
                    <div className="cou_con">
                        <div className="cou_head">Total Registered Users</div>
                        <div className="cou_num">{reg_users}</div>
                    </div>
                </div>
                <div className="counters_inside" style={{background: "rgba(242,87,103,255)"}}>
                    <div className="cou_logo">
                        <FontAwesomeIcon icon={faUser} style={{color: "black", fontSize: 20}} />
                    </div>
                    <div className="cou_con">
                        <div className="cou_head">Pending users</div>
                        <div className="cou_num">0</div>
                    </div>
                </div>
                <div className="counters_inside" style={{background: "rgba(16,202,147,255)"}}>
                    <div className="cou_logo">
                        <FontAwesomeIcon icon={faUser} style={{color: "black", fontSize: 20}} />
                    </div>
                    <div className="cou_con">
                        <div className="cou_head">Today Registered Users</div>
                        <div className="cou_num">{act_users}</div>
                    </div>
                </div>
                <div className="counters_inside" style={{background: "rgba(58,122,254,255)"}}>
                    <div className="cou_logo">
                        <FontAwesomeIcon icon={faDollarSign} style={{color: "black", fontSize: 20}} />
                    </div>
                    <div className="cou_con">
                        <div className="cou_head">Total Referral Coins</div>
                        <div className="cou_num">{refer_points}</div>
                    </div>
                </div>
                <div className="counters_inside" style={{background: "rgba(36,54,92,255)"}}>
                    <div className="cou_logo">
                        <FontAwesomeIcon icon={faDollarSign} style={{color: "black", fontSize: 20}} />
                    </div>
                    <div className="cou_con">
                        <div className="cou_head">Today Distribute Coins</div>
                        <div className="cou_num">{daily_points}</div>
                    </div>
                </div>
                <div className="counters_inside" style={{background: "rgba(0,175,239,255)"}}>
                    <div className="cou_logo">
                        <FontAwesomeIcon icon={faCommentDots} style={{color: "black", fontSize: 20}} />
                    </div>
                    <div className="cou_con">
                        <div className="cou_head">Feedback</div>
                        <div className="cou_num">0</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
