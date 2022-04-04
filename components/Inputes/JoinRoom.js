import { Form, Button } from "react-bootstrap";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as Yup from "yup";
import axios from "../../util/axios";
import { useState, useContext } from "react";
import AuthContext from "../../store/Auth/Auth-Context";
import Swal from "sweetalert2";

export default function JoinRoom(props) {
  const [roomCode, setRoomCode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const AuthCtx = useContext(AuthContext);
  const { token, studentId } = AuthCtx;

  //   const validationSchema = Yup.object().shape({
  //     roomName: Yup.string()
  //       .required("room name is required !")
  //       .min(3, "too small room name, minimum 3 character !")
  //       .max(20, "maximum 20 character !"),
  //   });

  //   const {
  //     register,
  //     handleSubmit,
  //     reset,
  //     formState: { errors },
  //   } = useForm({
  //     resolver: yupResolver(validationSchema),
  //   });

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const result = await axios.post(
        "/api/s/team/request",
        { studentId, roomCode },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      //   reset();
      //   props.addNewRoomHandler(result.data.room);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "You request send to the Faculty!",
        showConfirmButton: false,
        timer: 1500,
      });
      props.closeModalhandler();
    } catch (err) {
      setErrorMsg(err.response?.data.message);
    }
  };

  return (
    <Form onSubmit={formSubmitHandler} className="modal-form">
      <h5>Write classroom Code</h5>

      <div className="form-group mb-2 mt-3">
        <input
          type="text"
          placeholder="Enter room code"
          className="form-control"
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value)}
        />
        <p>
          <small>{errorMsg}</small>
        </p>
      </div>

      <Button type="submit" varient="primary">
        Join request
      </Button>
    </Form>
  );
}
