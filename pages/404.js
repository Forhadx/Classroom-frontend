import { Container, Row, Col } from "react-bootstrap";

export default function ErrorPage() {
  return (
    <Container>
      <Row>
        <Col sm="12">
          <img
            src={"http://localhost:3000/images/404.png"}
            alt="404-error"
            className="w-100"
          />
        </Col>
      </Row>
    </Container>
  );
}
