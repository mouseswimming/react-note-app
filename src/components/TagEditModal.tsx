import { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row, Stack } from "react-bootstrap";
import { Tag } from "../types";

type TagEditModalProps = {
  show: boolean;
  handleClose: () => void;
  tags: Tag[];
  updateTag: (id: string, label: string) => void;
  onDeleteTag: (id: string) => void;
};

export default function TagEditModal({
  show,
  handleClose,
  tags,
  updateTag,
  onDeleteTag,
}: TagEditModalProps) {
  const [modalShow, setModalShow] = useState(show);

  useEffect(() => {
    setModalShow(show);
  }, [show]);

  return (
    <Modal show={modalShow} onHide={handleClose} aria-labelledby="modal-title">
      <Modal.Header closeButton>
        <Modal.Title id="modal-title">Manage Tags</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Stack direction="vertical" gap={2}>
            {tags.map((tag) => (
              <Row key={tag.id}>
                <Col>
                  <Form.Control
                    type="text"
                    defaultValue={tag.label}
                    onChange={(e) => updateTag(tag.id, e.target.value)}
                  />
                </Col>
                <Col xs="auto">
                  <Button
                    onClick={() => onDeleteTag(tag.id)}
                    variant="outline-danger"
                  >
                    &times;
                  </Button>
                </Col>
              </Row>
            ))}
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
