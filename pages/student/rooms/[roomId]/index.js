import { Row, Col, Card, Form } from "react-bootstrap";
import { BsPencilSquare } from "react-icons/bs";
import { FiDownload } from "react-icons/fi";
import { useState } from "react";
import parse from "html-react-parser";
import StudentLayout from "../../../../components/Layout/StudentLayout";

export default function SingleRoomPage() {
  return (
    <StudentLayout>
      <Row>
        <Col sm="12">
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
    </StudentLayout>
  );
}
