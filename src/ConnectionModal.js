import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useState } from "react";

function ConnectionsModal(props) {
  const initialState = {
    name: "",
    description: "",
    server: "",
    dual_stack: 0,
    sso_enabled: 0,
    use_external_browser: 0,
    single_user_mode: 0,
    machine: 0,
    warn_invalid_server_certificate: 1,
  };
  const [connection, setConnection] = useState(initialState);

  function handleChange(e) {
    const key = e.target.name;
    const value =
      e.target.type === "checkbox" ? +e.target.checked : e.target.value;

    setConnection((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function sendConnection() {
    props.addConnection(connection);
    setConnection(initialState);
  }

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>New Connection</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Connection Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="My VPN Connection"
              size="sm"
              value={connection.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Connection Description (Optional)</Form.Label>
            <Form.Control
              type="text"
              name="description"
              placeholder="My Cool VPN Connection!"
              size="sm"
              value={connection.description}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Server Address</Form.Label>
            <Form.Control
              type="text"
              name="server"
              placeholder="https://1.2.3.4:10443"
              size="sm"
              value={connection.server}
              onChange={handleChange}
            />
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Check
              type="switch"
              name="dual_stack"
              label="Enable IPv6"
              value="dual_stack"
              checked={connection.dual_stack}
              onChange={handleChange}
            />
            <Form.Check
              type="switch"
              name="sso_enabled"
              label="Enable SSO"
              value="sso_enabled"
              checked={connection.sso_enabled}
              onChange={handleChange}
            />
            <Form.Check
              type="switch"
              name="use_external_browser"
              label="Use External Browser"
              value="use_external_browser"
              checked={connection.use_external_browser}
              onChange={handleChange}
              disabled={!connection.sso_enabled}
            />
            <Form.Check
              type="switch"
              name="machine"
              label="Machine Connection"
              value="machine"
              checked={connection.machine}
              onChange={handleChange}
            />
            <Form.Check
              type="switch"
              name="warn_invalid_server_certificate"
              label="Warn on Invalid Server Cetificate"
              value="warn_invalid_server_certificate"
              checked={connection.warn_invalid_server_certificate}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={sendConnection}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConnectionsModal;
