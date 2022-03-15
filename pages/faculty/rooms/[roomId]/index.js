import { Row, Col, Card, Form } from "react-bootstrap";
import { BsPencilSquare } from "react-icons/bs";
import { FiDownload } from "react-icons/fi";
import dynamic from "next/dynamic";
import { useState } from "react";
import parse from "html-react-parser";
import FacultyLayout from "../../../../components/Layout/FacultyLayout.js";
import { useContext, useLayoutEffect } from "react";
import { useRouter } from "next/router";
import AuthContext from "../../../../store/auth-context.js";

const FroalaEditor = dynamic(
  () => import("../../../../components/Editor/froalaEditor.js"),
  { ssr: false }
);

export default function SingleRoomPage() {
  const [isWrite, setIsWrite] = useState(false);
  const [data, setData] = useState("");

  const router = useRouter();
  const AuthCtx = useContext(AuthContext);

  // const { userType } = AuthCtx;
  // useLayoutEffect(() => {
  //   if (userType !== "faculty") {
  //     router.push("/");
  //   }
  // }, [userType, router]);

  return (
    <FacultyLayout>
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
                <FroalaEditor setData={setData} />
                <Form.Control type="file" id="pdfFile" />
                <div>
                  <button
                    className="cancel-btn"
                    onClick={() => setIsWrite(false)}
                  >
                    cancel
                  </button>
                  <button className="save-btn">save</button>
                </div>
              </Card.Body>
            </Card>
          )}
        </Col>
        <Col sm="12">
          <Card className="note-card">
            <Card.Body>
              <p>
                <small>March 03, 2022 at 1.25am</small>
              </p>
              <h4>lorem torem fat note</h4>
              <div className="note-card-description">{parse(data)}</div>
              <div className="note-card-file">
                <img src="/images/pdf.png" alt="file" />
                <p>javssssssssssssssssa.pdf</p>
                <FiDownload />
              </div>
            </Card.Body>
          </Card>
          {[1, 2, 3, 4, 5].map((note, idx) => (
            <Card className="note-card" key={idx}>
              <Card.Body>
                <p>
                  <small>March 03, 2022 at 1.25am</small>
                </p>
                <h4>lorem torem fat note</h4>
                <p className="note-card-description">
                  Contrary to popular belief, Lorem Ipsum is not simply random
                  text. It has roots in a piece of classical Latin literature
                  from 45 BC, making it over 2000 years old. Richard McClintock,
                  a Latin professor at Hampden-Sydney College in Virginia,
                  looked up one of the more obscure Latin words,
                </p>
                <div className="note-card-file">
                  <img src="/images/pdf.png" alt="file" />
                  <p>javssssssssssssssssa.pdf</p>
                  <FiDownload />
                </div>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </FacultyLayout>
  );
}
