import { useRef, useState, useContext, useEffect } from "react";
import axios from "../../util/axios";
import Swal from "sweetalert2";
import AuthContext from "../../store/Auth/Auth-Context";

import dynamic from "next/dynamic";
import NoteContext from "../../store/Note/Note-Context";
const FroalaEditor = dynamic(() => import("../Editor/froalaEditor"), {
  ssr: false,
});

export default function NoteUpload({ setIsWrite, roomCode, addNoteToRoom }) {
  const [postData, setPostData] = useState("");
  const [pdfFile, setPdfFile] = useState("");
  const [flag, setFlag] = useState(false);

  const fileRef = useRef();

  const AuthCtx = useContext(AuthContext);
  const { token } = AuthCtx;
  const NoteCtx = useContext(NoteContext);
  const { noteList, loading, error, addNewNotes } = NoteCtx;

  const formHandler = async (event) => {
    event.preventDefault();
    if (postData.length > 0 || pdfFile) {
      const formData = new FormData();
      formData.append("post", postData);
      formData.append("file", pdfFile);
      formData.append("roomCode", roomCode);

      addNewNotes(formData, token);

      setFlag(true);
    }
  };

  const pickedHandler = (event) => {
    if (event.target.files && event.target.files.length === 1) {
      setPdfFile(event.target.files[0]);
    }
  };

  useEffect(() => {
    if (flag && loading && !error) {
      setIsWrite(false);
      fileRef.current.value = null;
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Note Added succesfully!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }, [loading, error]);

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
