import React from "react";
import "./PointsCompo.css";

export default function PointsCompo({ data, type }) {
  return (
    <table>
      <thead>
        <tr>
          {type == 0 && (
            <>
              <th>User</th>
              <th>Received Points</th>
              <th>Date</th>
            </>
          )}
          {type == 1 && (
            <>
              <th>User Name</th>
              <th>Referred User</th>
              <th>Received Coins</th>
              <th>Register Date</th>
            </>
          )}
          {type == 2 && (
            <>
              <th>User Details</th>
              <th>Received Coins</th>
              <th>Status</th>
              <th>Date</th>
            </>
          )}
        </tr>
      </thead>
      <tbody>
        {data.map((userData) => {
          return (
            <tr key={userData._id}>
              {type == 0 && (
                <>
                  <td>
                    <div className="column">
                      <strong className="bold_large">
                        {userData?.usedBy?.name}
                      </strong>
                      <span>{userData?.usedBy?.email}</span>
                      <span>{userData?.usedBy?.phone}</span>
                    </div>
                  </td>
                  <td>{userData?.coins}</td>
                  <td>{new Date(userData.createdAt).toLocaleString()}</td>
                </>
              )}
              {type == 1 && (
                <>
                  <td>
                    <div className="column">
                      <strong className="bold_large">
                        {userData?.usedBy?.name}
                      </strong>
                      <span>{userData?.usedBy?.referral_code}</span>
                    </div>
                  </td>
                  <td>
                    <div className="column">
                      <span className="bold_large">
                        {userData?.referredBy?.name}
                      </span>
                      <span>{userData?.referredBy?.referral_code}</span>
                    </div>
                  </td>
                  <td>{userData?.coins}</td>
                  <td>{new Date(userData.createdAt).toLocaleString()}</td>
                </>
              )}
              {type == 2 && (
                <>
                  <td>
                    <div className="column">
                      <strong className="bold_large">
                        {userData?.usedBy?.name}
                      </strong>
                      <span>{userData?.usedBy?.referral_code}</span>
                    </div>
                  </td>
                  <td>{userData?.coins}</td>
                  <td>
                    <span className="status">Recieved</span>
                  </td>
                  <td>{new Date(userData.createdAt).toLocaleString()}</td>
                </>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
