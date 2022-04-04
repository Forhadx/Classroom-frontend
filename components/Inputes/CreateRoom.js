import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useState, useContext, useEffect } from "react";
import AuthContext from "../../store/Auth/Auth-Context";
import RoomContext from "../../store/Room/Room-Context";

export default function CreateRoom(props) {
  const [flag, setFlag] = useState(false);

  const { closeModalhandler } = props;

  const AuthCtx = useContext(AuthContext);
  const { token } = AuthCtx;
  const RoomCtx = useContext(RoomContext);
  const { initAddFacultyRoom, addFacultyRoom, errorMsg, loading } = RoomCtx;

  const validationSchema = Yup.object().shape({
    roomName: Yup.string()
      .required("room name is required !")
      .min(3, "too small room name, minimum 3 character !")
      .max(20, "maximum 20 character !"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const formSubmitHandler = async (data) => {
    let roomData = {
      roomName: data.roomName,
    };
    addFacultyRoom(roomData, token);
    setFlag(true);
  };

  useEffect(() => {
    if (!flag) {
      initAddFacultyRoom();
    }
  }, [initAddFacultyRoom]);

  useEffect(() => {
    if (!errorMsg && flag && !loading) {
      setFlag(false);
      reset();
      closeModalhandler();
    }
  }, [errorMsg, closeModalhandler]);

  return (
    <Form onSubmit={handleSubmit(formSubmitHandler)} className="modal-form">
      <h5>Write new classroom name</h5>

      <div className="form-group mb-2 mt-3">
        <input
          {...register("roomName")}
          type="text"
          placeholder="Enter your class name"
          className="form-control"
        />
        <p>
          <small>{errors.roomName?.message || errorMsg}</small>
        </p>
      </div>

      <Button type="submit" varient="primary">
        Create
      </Button>
    </Form>
  );
}
