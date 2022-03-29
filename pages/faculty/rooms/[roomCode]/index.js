import { Row, Col, Card } from "react-bootstrap";
import { BsPencilSquare } from "react-icons/bs";
import { FiDownload } from "react-icons/fi";
import { useEffect, useState } from "react";
import parse from "html-react-parser";
import FacultyLayout from "../../../../components/Layout/FacultyLayout.js";
import NoteUpload from "../../../../components/Inputes/NoteUpload.js";
import axios from "axios";
import moment from "moment";
import download from "downloadjs";
import { useRouter } from "next/router";

export default function SingleRoomPage() {
  const [isWrite, setIsWrite] = useState(false);
  const [allNotes, setAllNotes] = useState([]);

  const router = useRouter();
  const roomCode = router.query.roomCode;

  useEffect(async () => {
    if (roomCode) {
      try {
        let result = await axios.post("http://localhost:8000/api/f/notes", {
          roomCode: roomCode,
        });
        setAllNotes(result.data.notes);
      } catch (err) {}
    }
  }, [roomCode]);

  const downloadPdfHandler = async (note) => {
    let result = await axios.get(
      `http://localhost:8000/api/f/note/download/${note.id}`,
      {
        responseType: "blob",
      }
    );
    const split = note.file.split("/");
    const filename = split[split.length - 1];
    return download(result.data, filename, "application/pdf");
  };

  const addNoteToRoom = (note) => {
    setAllNotes([note, ...allNotes]);
  };

  return (
    <FacultyLayout roomCode={roomCode}>
      <Row>
        <Col sm="12">
          {!isWrite ? (
            <Card className="note-header" onClick={() => setIsWrite(true)}>
              <Card.Body>
                <h6>
                  <BsPencilSquare />
                  Attached New Notes
                </h6>
              </Card.Body>
            </Card>
          ) : (
            <Card className="note-write-box">
              <Card.Body>
                <NoteUpload
                  setIsWrite={setIsWrite}
                  roomCode={roomCode}
                  addNoteToRoom={addNoteToRoom}
                />
              </Card.Body>
            </Card>
          )}
        </Col>
        <Col sm="12">
          {allNotes.map((note, idx) => (
            <Card className="note-card" key={idx}>
              <Card.Body>
                <p>
                  <small> {moment(note.createdAt).format("lll")}</small>
                </p>
                <div className="note-card-description">{parse(note.post)}</div>
                {note.file && (
                  <div
                    className="note-card-file"
                    onClick={() => downloadPdfHandler(note)}
                  >
                    <img src="/images/pdf.png" alt="file" />
                    <p>
                      <small>
                        {note.file.split("/")[note.file.split("/").length - 1]}
                      </small>
                    </p>
                    <FiDownload />
                  </div>
                )}
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </FacultyLayout>
  );
}
