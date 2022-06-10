import React from "react";
import { Modal, Button } from "react-bootstrap";

const UseModal = ({
  show,
  handleShow,
  title,
  body,
  buttonName,
  buttonHandle,
}) => {
  return (
    <>
      <Modal show={show} onHide={handleShow} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleShow}>
            Close
          </Button>
          <Button variant="primary" onClick={buttonHandle}>
            {buttonName}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UseModal;
