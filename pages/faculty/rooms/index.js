import { Container, Row, Col, Card, Dropdown } from "react-bootstrap";
import { FcSearch } from "react-icons/fc";
import { RiMore2Fill } from "react-icons/ri";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdContentCopy } from "react-icons/md";
import { useRouter } from "next/router";
import Modal from "../../../components/UI/Modal/Modal";
import { useContext, useEffect, useState } from "react";
import CreateRoom from "../../../components/Inputes/CreateRoom";
import axios from "../../../util/axios";
import moment from "moment";
import AuthContext from "../../../store/auth-context";

export default function RoomsPage() {
  const [allRooms, setAllRooms] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();

  const AuthCtx = useContext(AuthContext);
  const { token } = AuthCtx;

  useEffect(async () => {
    if (token) {
      try {
        let result = await axios.get("/api/f/rooms", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setAllRooms(result.data.rooms);
      } catch (err) {
        setErrorMsg(err.response?.data.message);
      }
    }
  }, [token]);

  const singleRoomHandler = (roomCode) => {
    router.push(`/faculty/rooms/${roomCode}`);
  };

  const closeModalhandler = () => {
    setShowModal(false);
  };

  const addNewRoomHandler = (room) => {
    setAllRooms([room, ...allRooms]);
  };

  return (
    <div className="room-page">
      {showModal && (
        <Modal showModal={showModal} closeModalhandler={closeModalhandler}>
          <CreateRoom
            closeModalhandler={closeModalhandler}
            addNewRoomHandler={addNewRoomHandler}
          />
        </Modal>
      )}
      <Container>
        <Row>
          <Col
            sm="12"
            className="d-flex justify-content-between align-items-center"
          >
            <form className="search-box">
              <input type="text" placeholder="search your room" />
              <button>
                <FcSearch />
              </button>
            </form>
            <div className="add-btn">
              <IoIosAddCircleOutline onClick={() => setShowModal(true)} />
            </div>
          </Col>
          <Col sm="12">
            <hr />
            <p>You have created 8 rooms.</p>
          </Col>
        </Row>
        <Row>
          {allRooms &&
            allRooms.map((room, idx) => (
              <Col lg="4" key={idx}>
                <Card className="room-card">
                  <Card.Header
                    onClick={singleRoomHandler.bind(null, room.roomCode)}
                  >
                    <h5>{room.roomName}</h5>
                    <p>
                      <small>
                        <strong>Start: </strong>
                        {moment(room.createdAt).format("ll")}
                      </small>
                    </p>
                  </Card.Header>
                  <Card.Footer>
                    <p>
                      <MdContentCopy />
                      {room.roomCode}
                    </p>
                  </Card.Footer>

                  <Dropdown>
                    <Dropdown.Toggle variant="" id="dropdown-basic">
                      <RiMore2Fill className="m-0 text-dark" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item href="/faculty/rooms/1">
                        Open
                      </Dropdown.Item>
                      {/* <Dropdown.Item>Update</Dropdown.Item>
                    <Dropdown.Item>Delete</Dropdown.Item> */}
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
