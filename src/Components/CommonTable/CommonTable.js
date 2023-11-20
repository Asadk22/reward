import React, { useContext, useEffect, useState } from "react";
import "./CommonTable.css";
import UsersList from "../UsersList/UsersList";
import { Pagination } from "@mui/material";
import AuthContext from "../../Context/AuthContext/AuthContext";
import PointsCompo from "../PointsCompo/PointsCompo";
import Feedback from "../FeedBack/Feedback";

let type = 1,
  count = 0,
  my_tab = "";
export default function CommonTable(props) {
  const Context = useContext(AuthContext);
  const { userDetails, set_userDetails, url } = Context;

  const [referral_code, set_referral_code] = useState("");
  const [page, set_page] = useState(1);
  const [limit, set_limit] = useState(10);
  const [total, set_total] = useState(0);
  const [sortDirection, set_sortDirection] = useState(0);
  const [search, set_search] = useState("");
  const [data, set_data] = useState([]);

  const fetchData = async (apiURL, in_page, in_limit, in_search) => {
    let comp_tab = my_tab;
    let comp_search = search;
    try {
      let response = null;
      if (props.selected_tab !== "Feedback") {
        response = await fetch(
          apiURL +
            "?page=" +
            (in_page ? in_page : page) +
            "&limit=" +
            (in_limit ? in_limit : limit) +
            "&search=" +
            (in_search
              ? in_search
              : search +
                (props.selected_tab == "Referral Coins" ||
                props.selected_tab == "Daily Coins"
                  ? "&type=" + type
                  : "") +
                "&sortDirection=" +
                sortDirection +
                (props.selected_tab == "Team member"
                  ? "&referral_code=" + referral_code
                  : "")),
          {
            method: "GET",
            headers: {
              accept: "application/json",
              "Content-Type": "application/json",
              authorization: userDetails.token,
            },
          }
        );
        response = await response.json();

        if (response.statusCode == 401) {
          set_userDetails(null);
          localStorage.removeItem("userDetails");
        } else if (comp_tab == my_tab && comp_search == search) {
          if (response.statusCode >= 400) {
            set_total(0);
            set_data([]);
          } else {
            set_total(response.data.count);
            set_data(response.data.data);
          }
        }
      } else {
        response = await fetch(
          apiURL +
            "?page=" +
            (in_page ? in_page : page) +
            "&limit=" +
            (in_limit ? in_limit : limit),
          {
            method: "GET",
            headers: {
              accept: "application/json",
              "Content-Type": "application/json",
              authorization: userDetails.token,
            },
          }
        );
        response = await response.json();

        if (response.statusCode == 401) {
          set_userDetails(null);
          localStorage.removeItem("userDetails");
        } else if (comp_tab == my_tab && comp_search == search) {
          if (response.statusCode >= 400) {
            set_total(0);
            set_data([]);
          } else {
            set_total(response.data.length);
            set_data(response.data);
          }
        }
      }
    } catch (err) {
      console.log(err.message);
      set_total(0);
      set_data([]);
    }
  };

  useEffect(() => {
    set_page(1);
    set_limit(10);
    set_search("");
    let apiURL = "";
    if (props.selected_tab == "Users List") {
      apiURL = "/v1/users";
    } else if (props.selected_tab == "Referral Coins") {
      apiURL = "/v1/user/referPoints";
      type = 1;
    } else if (props.selected_tab == "Daily Coins") {
      apiURL = "/v1/user/referPoints";
      type = 2;
    } else if (props.selected_tab == "Team member") {
      type = 0;
      apiURL = "/v1/user/teamList";
    } else if (props.selected_tab == "Feedback") {
      apiURL = "/v1/user/admin/get_all_feedbacks";
    }

    my_tab = props.selected_tab;
    fetchData(url + apiURL, 1, "");
  }, [props.selected_tab]);

  const handle_change_page = (event, new_page) => {
    set_page(new_page);
  };

  useEffect(() => {
    if (count > 0) {
      let apiURL = "";
      if (props.selected_tab == "Users List") apiURL = "/v1/users";
      else if (props.selected_tab == "Referral Coins")
        apiURL = "/v1/user/referPoints";
      else if (props.selected_tab == "Daily Coins")
        apiURL = "/v1/user/referPoints";
      else if (props.selected_tab == "Team member")
        apiURL = "/v1/user/teamList";
      else if (props.selected_tab == "Feedback")
        apiURL = "/v1/user/admin/get_all_feedbacks";
      fetchData(url + apiURL);
    }
    count++;
  }, [page, limit, search]);

  return (
    <>
      {props.selected_tab == "Team member" && (
        <div className="input_referral_code">
          <h3 className="input_referral_code_head">Enter referral code</h3>
          <input
            value={referral_code}
            onChange={(e) => set_referral_code(e?.target?.value)}
            type="text"
          />
          <div
            onClick={() => fetchData(url + "/v1/user/teamList")}
            className="submit_team_members"
          >
            Search
          </div>
        </div>
      )}
      <div className="common">
        <div className="head_common">{props.selected_tab}</div>
        <div className="limit_box">
          <div className="limit">
            <span>Show</span>
            <select
              name="enteries"
              id="enteries"
              value={limit}
              onChange={(e) => set_limit(e?.target?.value)}
            >
              <option value="10">10</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            <span>enteries</span>
          </div>
          <div className="search">
            <span>Search</span>
            <input
              value={search}
              onChange={(e) => set_search(e?.target?.value)}
              type="text"
            />
          </div>
        </div>
        <div className="common_div">
          {props.selected_tab == "Users List" && (
            <UsersList data={data} set_data={props?.set_selected_tab} />
          )}
          {props.selected_tab == "Feedback" && (
            <Feedback data={data} set_data={props?.set_selected_tab} />
          )}
          {(props.selected_tab == "Referral Coins" ||
            props.selected_tab == "Daily Coins" ||
            props.selected_tab == "Team member") && (
            <PointsCompo data={data} type={type} />
          )}
        </div>
        <div className="below_table">
          <div className="below_table_1">
            Showing {total == 0 ? 0 : (page - 1) * limit + 1} to{" "}
            {total == 0 ? 0 : Math.min(page * limit, total)} of {total} enteries
          </div>
          <div className="pagination">
            <Pagination
              count={Math.ceil(total / limit)}
              onChange={handle_change_page}
              color="primary"
            />
          </div>
        </div>
      </div>
    </>
  );
}
