import { useRef, useState, useContext } from "react";
import axios from "../../util/axios";
import Swal from "sweetalert2";
import AuthContext from "../../store/Auth/Auth-Context";

import dynamic from "next/dynamic";
const FroalaEditor = dynamic(() => import("../Editor/froalaEditor"), {
  ssr: false,
});

export default function NoteUpload({ setIsWrite, roomCode, addNoteToRoom }) {
  const [postData, setPostData] = useState("");
  const [pdfFile, setPdfFile] = useState("");

  const fileRef = useRef();

  const AuthCtx = useContext(AuthContext);
  const { token } = AuthCtx;

  const formHandler = async (event) => {
    event.preventDefault();
    if (postData.length > 0 || pdfFile) {
      try {
        const formData = new FormData();
        formData.append("post", postData);
        formData.append("file", pdfFile);
        formData.append("roomCode", roomCode);

        let result = await axios.post("/api/f/note", formData, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        addNoteToRoom(result.data.note);
        fileRef.current.value = null;
        setIsWrite(false);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Room created succesfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const pickedHandler = (event) => {
    if (event.target.files && event.target.files.length === 1) {
      setPdfFile(event.target.files[0]);
      //   event.target.value = null;
    }
  };

  return (
    <form onSubmit={formHandler}>
      <FroalaEditor setPostData={setPostData} />

      <input
        className="form-control"
        type="file"
        id="pdfFile"
        accept="application/pdf"
        ref={fileRef}
        onChange={pickedHandler}
      />
      <div>
        <button className="cancel-btn" onClick={() => setIsWrite(false)}>
          cancel
        </button>
        <button type="submit" className="save-btn">
          save
        </button>
      </div>
    </form>
  );
}
