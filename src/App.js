import sslvpnoptions from "./sslvpn_options.json";
import { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import ConnectionsModal from "./ConnectionModal";
import ListGroup from "react-bootstrap/ListGroup";

function App() {
  const [sslOptions, setSslOptions] = useState(sslvpnoptions);
  const [connections, setConnections] = useState([]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleOptionsChange = (event) => {
    const id = event.target.id;
    const value = +event.target.checked;

    let index = sslOptions.findIndex((x) => x.id === id);
    let temporaryOptions = sslOptions.slice();
    temporaryOptions[index]["value"] = value;
    setSslOptions(temporaryOptions);
  };

  const addConnection = (connection) => {
    const updatedConnections = [...connections, connection];
    setConnections(updatedConnections);
    handleClose();
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>FortiClient VPN Configuration Generator</Navbar.Brand>
        </Container>
      </Navbar>
      <br />
      <Container>
        <br />
        <Row>
          <Col xs={2}>
            <h2>Settings:</h2>
            <Form>
              {sslOptions.map((item) => (
                <div key={item.id}>
                  <Form.Check
                    type={item.type}
                    id={item.id}
                    label={item.name}
                    value={item.id}
                    checked={item.value}
                    onChange={handleOptionsChange}
                  />
                </div>
              ))}
            </Form>
            <h2>Connections:</h2>
            <ListGroup>
              {connections.map((connection, index) => (
                <ListGroup.Item key={connection.name}>
                  {connection.name}
                </ListGroup.Item>
              ))}
            </ListGroup>
            <br />
            <Button variant="success" onClick={handleShow}>
              Add Connection
            </Button>
          </Col>
          <Col>
            <Form.Control
              as="textarea"
              value={
                `<?xml version="1.0" encoding="UTF-8" ?>\n` +
                `<forticlient_configuration>\n` +
                `\t<vpn>\n` +
                `\t\t<sslvpn>\n` +
                `\t\t\t<options>\n` +
                sslOptions
                  .map(
                    (item) => `\t\t\t\t<${item.id}>${item.value}</${item.id}>`
                  )
                  .join("\n") +
                `\n\t\t\t</options>\n` +
                `\t\t\t<connections>\n` +
                connections.map(connection => (
                  `\t\t\t\t<connection>\n` +
                  `\t\t\t\t\t<name>${connection.name}</name>\n` +
                  `\t\t\t\t\t<description>${connection.description}</description>\n` +
                  `\t\t\t\t\t<server>${connection.server}</server>\n` +
                  `\t\t\t\t\t<dual_stack>${connection.dual_stack}</dual_stack>\n` +
                  `\t\t\t\t\t<sso_enabled>${connection.sso_enabled}</sso_enabled>\n` +
                  `\t\t\t\t\t<use_external_browser>${connection.use_external_browser}</use_external_browser>\n` +
                  `\t\t\t\t\t<machine>${connection.machine}</machine>\n` +
                  `\t\t\t\t\t<warn_invalid_server_certificate>${connection.warn_invalid_server_certificate}</warn_invalid_server_certificate>\n` +
                  `\t\t\t\t</connection>\n`
                )) +
                `\t\t\t<\connections>\n` +
                `\t\t</sslvpn>\n` +
                `\t</vpn>\n` +
                `</forticlient_configuration>`
              }
              style={{ height: "50vh" }}
              disabled
            />
          </Col>
        </Row>
      </Container>
      <ConnectionsModal
        show={show}
        handleClose={handleClose}
        addConnection={addConnection}
      />
    </div>
  );
}

export default App;
