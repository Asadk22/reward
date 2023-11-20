import React, { useContext, useEffect, useState } from "react";
import "./UsersList.css";
import RewardModal from "../Modals/RewardModal";
import AuthContext from "../../Context/AuthContext/AuthContext";

export default function UsersList({ data, set_data }) {
  const [show, setShow] = useState();
  const [dataUser, setUserData] = useState([]);
  const Context = useContext(AuthContext);
  const { url, userDetails } = Context;
  const handleClose = () => {
    setShow(false);
  };
  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    setUserData(data);
  }, [data]);

  const fetchUser = async () => {
    fetch(url + "/v1/users?page=1&limit=10&search=&sortDirection=0", {
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        authorization: userDetails.token,
      },
    })
      .then((value) => value.json())
      .then((res) => {
        if (res?.statusCode === 200) {
          setUserData(res?.data?.data);
        }
      })
      .catch((err) => {
        console.log("🛵🦽 ~ file: UsersList.js:25 ~ .then ~ err:", err);
      });
  };
  return (
    <div className="position-relative">
      <table>
        <RewardModal
          show={show}
          setShow={setShow}
          handleClose={handleClose}
          set_data={set_data}
          fetchUser={fetchUser}
        />
        <thead>
          <tr>
            <th>Image</th>
            <th>User</th>
            <th>Referred By</th>
            <th>Admin Coins</th>
            <th>Total Coins</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {dataUser?.map((userData) => {
            return (
              <tr key={userData._id}>
                <td>
                  <div className="column">
                    <span>
                      <img src="./default.png" alt="" />
                    </span>
                    <span>{userData.referral_code}</span>
                  </div>
                </td>
                <td>
                  <div className="column">
                    <strong className="bold_large">{userData.name}</strong>
                    <span>{userData.email}</span>
                    <span>{userData.phone}</span>
                  </div>
                </td>
                <td>
                  <div className="column">
                    <strong className="bold_large">
                      {userData?.referredBy?.name}
                    </strong>
                    <span>{userData?.referredBy?.referral_code}</span>
                  </div>
                </td>
                <td>
                  <div className="status">{userData?.adminCoins}</div>
                </td>
                <td>
                  <div className="status">{userData?.coins}</div>
                </td>
                <td>{new Date(userData.createdAt).toLocaleString()}</td>
                <td>
                  <div
                    onClick={() =>
                      setShow({
                        coins: userData?.adminCoins,
                        showModal: true,
                        userId: userData?._id,
                      })
                    }
                    className="view"
                  >
                    Reward
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
