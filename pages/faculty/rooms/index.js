import Link from "next/link";
import { Container, Row, Col, Card, Dropdown } from "react-bootstrap";
import { FcSearch } from "react-icons/fc";
import { RiMore2Fill } from "react-icons/ri";
import { useRouter } from "next/router";

export default function RoomsPage() {
  const router = useRouter();

  const singleRoomHandler = () => {
    router.push("/faculty/rooms/1");
  };

  return (
    <div className="room-page">
      <Container>
        <Row>
          <Col sm="12">
            <form className="search-box">
              <input type="text" placeholder="search your room" />
              <button>
                <FcSearch />
              </button>
            </form>
          </Col>
          <Col sm="12">
            <hr />
            <p>You have created 8 rooms.</p>
          </Col>
        </Row>
        <Row>
          {[1, 2, 3, 4, 5].map((room, idx) => (
            <Col lg="4">
              <Card className="room-card" key={idx}>
                <Card.Header onClick={singleRoomHandler}>
                  <h5>Class 10 semester 1</h5>
                  <p>10 students</p>
                </Card.Header>
                <Card.Footer>
                  <p>
                    <strong>Start: </strong>23/2/2022
                  </p>
                </Card.Footer>

                <Dropdown>
                  <Dropdown.Toggle variant="" id="dropdown-basic">
                    <RiMore2Fill className="m-0 text-dark" />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">
                      Another action
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-3">
                      Something else
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
