import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AuthContext from "../../../Context/AuthContext/AuthContext";
import axios from "axios";

function RewardModal({
  show,
  setShow,
  handleClose,
  data,
  set_data,
  fetchUser,
}) {
  const Context = useContext(AuthContext);
  const { userDetails, set_userDetails, url } = Context;
  const validNumber = new RegExp(
    "/^(?:-(?:[1-9](?:d{0,2}(?:,d{3})+|d*))|(?:0|(?:[1-9](?:d{0,2}(?:,d{3})+|d*))))(?:.d+|)$/"
  );
  let config = {
    headers: {
      Authorization: `${userDetails?.token}`,
    },
  };
  const [adminPoints, setAdminPoints] = useState(0);
  const [isError, setError] = useState("");
  const handleChangeAdminPoints = (e) => {
    e.preventDefault();

    setAdminPoints(e?.target?.value);
    setError("");
  };
  const handleSubmitPoints = async (multiple) => {
    if (
      Number(show?.coins) + Number(adminPoints) * multiple < 0 &&
      multiple === -1
    ) {
      setError("Cant subtract coins");
      return console.log("error less then 0");
    }
    console.log(show?.coins, multiple, Number(adminPoints));
    let payload = {
      id: show?.userId,
      adminCoins: Number(show?.coins) + Number(adminPoints) * multiple,
    };
    try {
      let res = await axios.post(
        url + "/v1/user/admin/admins_coins",
        payload,
        config
      );
      console.log(res);
      fetchUser();
      set_data("");
      set_data("Users List");
      setShow(false);
      setError("");
    } catch (error) {
      setError("");
      console.log(error);
    }
  };

  console.log({ set_data });
  return (
    <>
      <Modal show={show?.showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Admin Reward</Modal.Title>
        </Modal.Header>
        <Modal.Body className="py-4">
          <div className="position-relative">
            <input
              value={adminPoints}
              onChange={handleChangeAdminPoints}
              name="adminPoints"
              type="number"
              placeholder="Enter Points"
              className="p-2 rounded"
            />
            {isError ? (
              <p
                style={{ fontSize: "12px" }}
                className="text-danger position-absolute top-100 mt-1 mb-1"
              >
                {isError}
              </p>
            ) : null}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => handleSubmitPoints(-1)}>
            Minus
          </Button>
          <Button variant="primary" onClick={() => handleSubmitPoints(1)}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default RewardModal;
