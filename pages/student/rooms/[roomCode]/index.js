import { Row, Col, Card } from "react-bootstrap";
import { BsPencilSquare } from "react-icons/bs";
import { FiDownload } from "react-icons/fi";
import { useEffect, useState, useContext } from "react";
import parse from "html-react-parser";
import StudentLayout from "../../../../components/Layout/StudentLayout";
import NoteUpload from "../../../../components/Inputes/NoteUpload.js";
import axios from "../../../../util/axios";
import moment from "moment";
import download from "downloadjs";
import { useRouter } from "next/router";
import AuthContext from "../../../../store/Auth/Auth-Context";
import NoteContext from "../../../../store/Note/Note-Context.js";

export default function SingleRoomPage() {
  const router = useRouter();
  const roomCode = router.query.roomCode;

  const AuthCtx = useContext(AuthContext);
  const { token, userType } = AuthCtx;

  const NoteCtx = useContext(NoteContext);
  const { noteList, fetchRoomNotes } = NoteCtx;

  useEffect(() => {
    if (roomCode && token && userType) {
      fetchRoomNotes(roomCode, token, userType);
    }
  }, [roomCode, token, userType, fetchRoomNotes]);

  const downloadPdfHandler = async (note) => {
    let result = await axios.get(`/api/s/note/download/${note.id}`, {
      responseType: "blob",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const split = note.file.split("/");
    const filename = split[split.length - 1];
    return download(result.data, filename, "application/pdf");
  };

  return (
    <StudentLayout roomCode={roomCode}>
      <Row>
        <Col sm="12">
          {noteList.length > 0 ? (
            noteList.map((note, idx) => (
              <Card className="note-card" key={idx}>
                <Card.Body>
                  <p>
                    <small> {moment(note.createdAt).format("lll")}</small>
                  </p>
                  <div className="note-card-description">
                    {parse(note.post)}
                  </div>
                  {note.file && (
                    <div
                      className="note-card-file"
                      onClick={() => downloadPdfHandler(note)}
                    >
                      <img src="/images/pdf.png" alt="file" />
                      <p>
                        <small>
                          {note.file
                            .split("/")
                            [note.file.split("/").length - 1].slice(0, 6)
                            .concat("...") +
                            note.file
                              .split("/")
                              [note.file.split("/").length - 1].slice(-6)}
                        </small>
                      </p>
                      <FiDownload />
                    </div>
                  )}
                </Card.Body>
              </Card>
            ))
          ) : (
            <Card className="note-card">
              <Card.Body>
                <h6>The faculty have not published any notes.</h6>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </StudentLayout>
  );
}
