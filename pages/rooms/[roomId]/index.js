import RoomLayout from "../../../components/Layout/RoomLayout";
import { Row, Col, Card, Form } from "react-bootstrap";
import { BsPencilSquare } from "react-icons/bs";
import { FiDownload } from "react-icons/fi";
import dynamic from "next/dynamic";
import { useState } from "react";
import parse from "html-react-parser";

const FroalaEditor = dynamic(
  () => import("../../../components/Editor/froalaEditor.js"),
  { ssr: false }
);

export default function SingleRoomPage() {
  const [data, setData] = useState("");
  console.log("data: ", data);
  return (
    <RoomLayout>
      <Row>
        <Col sm="12">
          <Card className="note-header">
            <Card.Body>
              <h6>
                <BsPencilSquare />
                Attached New Notes
              </h6>
            </Card.Body>
          </Card>
          <Card>
            <FroalaEditor setData={setData} />
            <Form.Control type="file" />
            <div>
              <button>save</button>
              <button>cancel</button>
            </div>
          </Card>
        </Col>
        <Col sm="12">
          <Card className="note-card">
            <Card.Body>
              <p>
                <small>March 03, 2022 at 1.25am</small>
              </p>
              <h4>lorem torem fat note</h4>
              {/* <p className="note-card-description">
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature from
                45 BC, making it over 2000 years old. Richard McClintock, a
                Latin professor at Hampden-Sydney College in Virginia, looked up
                one of the more obscure Latin words,
              </p> */}
              <div className="note-card-description">{parse(data)}</div>
              <div className="note-card-file">
                <img src="/images/pdf.png" alt="file" />
                <p>javssssssssssssssssa.pdf</p>
                <FiDownload />
              </div>
            </Card.Body>
          </Card>
          <Card className="note-card">
            <Card.Body>
              <p>
                <small>March 03, 2022 at 1.25am</small>
              </p>
              <h4>lorem torem fat note</h4>
              <p className="note-card-description">
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature from
                45 BC, making it over 2000 years old. Richard McClintock, a
                Latin professor at Hampden-Sydney College in Virginia, looked up
                one of the more obscure Latin words,
              </p>
              <div className="note-card-file">
                <img src="/images/pdf.png" alt="file" />
                <p>javssssssssssssssssa.pdf</p>
                <FiDownload />
              </div>
            </Card.Body>
          </Card>
          <Card className="note-card">
            <Card.Body>
              <p>
                <small>March 03, 2022 at 1.25am</small>
              </p>
              <h5>lorem torem fat note</h5>
              <p className="note-card-description">
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature from
                45 BC, making it over 2000 years old. Richard McClintock, a
                Latin professor at Hampden-Sydney College in Virginia, looked up
                one of the more obscure Latin words,
              </p>
              <div className="note-card-file">
                <img src="/images/pdf.png" alt="file" />
                <p>javssssssssssssssssa.pdf</p>
                <FiDownload />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </RoomLayout>
  );
}
