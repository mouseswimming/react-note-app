import { useMemo, useState } from "react";
import { Row, Col, Stack, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select/creatable";
import { Note, Tag } from "../types";
import NoteCard from "./NoteCard";
import TagEditModal from "./TagEditModal";

type NoteListProps = {
  availableTags: Tag[];
  notes: Note[];
  updateTag: (id: string, label: string) => void;
  onDeleteTag: (id: string) => void;
};

export default function NoteList({
  availableTags,
  notes,
  updateTag,
  onDeleteTag,
}: NoteListProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");
  const [modalShow, setModalShow] = useState(false);

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        (title === "" ||
          note.title.toLowerCase().indexOf(title.toLocaleLowerCase()) !== -1) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            note.tags.some((_tag) => tag.id === _tag.id)
          ))
      );
    });
  }, [title, selectedTags, notes]);

  return (
    <>
      <Row className="mb-4 align-items-center py-2 px-1 bg-dark bg-gradient text-white rounded-bottom">
        <Col>
          <h1>Notes</h1>
        </Col>
        <Col xs="auto">
          <Stack direction="horizontal" gap={2}>
            <Link to="/new">
              <Button variant="primary">Create Note</Button>
            </Link>
            <Button onClick={() => setModalShow(true)} variant="light">
              Manage Tags
            </Button>
          </Stack>
        </Col>
      </Row>
      <Form>
        <Row className="mb-4">
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="search"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <ReactSelect
                isMulti
                options={availableTags.map((tag) => ({
                  label: tag.label,
                  value: tag.id,
                }))}
                value={selectedTags.map((tag) => ({
                  label: tag.label,
                  value: tag.id,
                }))}
                onChange={(tags) => {
                  setSelectedTags(
                    tags.map((tag) => ({
                      label: tag.label,
                      id: tag.value,
                    }))
                  );
                }}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Row sm={1} lg={2} xl={3} className="g-3">
        {filteredNotes.map((note) => (
          <NoteCard
            key={note.id}
            id={note.id}
            title={note.title}
            tags={note.tags}
            markdown={note.markdown}
          />
        ))}
      </Row>
      <TagEditModal
        tags={availableTags}
        show={modalShow}
        handleClose={() => setModalShow(false)}
        updateTag={updateTag}
        onDeleteTag={onDeleteTag}
      />
    </>
  );
}
