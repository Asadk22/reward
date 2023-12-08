import React, { useState } from "react";
import "./FeedBack.css";

const Feedback = ({ data }) => {
  return (
    <div className="position-relative">
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Feedback Rating</th>
            <th>Interest</th>
            <th>Comment</th>
            <th>Date</th>
            {/* <th>Action</th> */}
          </tr>
        </thead>
        <tbody>
          {data?.map((userData) => {
            return (
              <tr key={userData._id}>
                <td>
                  <div className="column">
                    <strong className="bold_large">
                      {userData?.userInfo?.name}
                    </strong>
                  </div>
                </td>
                <td>
                  <div className="status">
                    {userData?.ratting === 0 ? "-" : userData?.ratting}
                  </div>
                </td>
                <td>
                  <div className="column">
                    <strong className="bold_large">
                      {userData?.interested}
                    </strong>
                  </div>
                </td>
                <td>
                  <div className="column">
                    <strong className="bold_large">{userData?.comment}</strong>
                  </div>
                </td>
                <td>{new Date(userData.createdAt).toLocaleString()}</td>
                {/* <td>
              <div onClick={()=>setShow({coins:userData?.adminCoins,showModal:true,userId:userData?._id})} className="view">Reward</div>
            </td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Feedback;
