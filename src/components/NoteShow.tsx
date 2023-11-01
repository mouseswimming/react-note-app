import { Button, Col, Row, Stack } from "react-bootstrap";
import { useNote } from "../utils/useNote";
import TagGroups from "./TagGroups";
import ReactMarkdown from "react-markdown";
import { Link, useNavigate } from "react-router-dom";

type NoteShowProps = {
  onDeleteNote: (id: string) => void;
};

export default function NoteShow({ onDeleteNote }: NoteShowProps) {
  const note = useNote();

  const navigate = useNavigate();

  return (
    <>
      <Row className="mb-4 align-items-center py-2 bg-dark bg-gradient text-white rounded-bottom">
        <Col>
          <h1 className="text-capitalize">{note.title}</h1>
        </Col>
        <Col xs="auto">
          <Link to={".."}>
            <Button size="sm" variant="outline-light">
              Back
            </Button>
          </Link>
        </Col>
      </Row>
      <Row className="align-items-center mb-4">
        <Col>
          <Stack direction="horizontal" gap={1}>
            <span>Tags: </span>
            <TagGroups tags={note.tags} alignLeft={true} />
          </Stack>
        </Col>
        <Col xs="auto">
          <Stack direction="horizontal" gap={2} className="justify-content-end">
            <Link to={"./edit"}>
              <Button size="sm" variant="primary">
                Edit
              </Button>
            </Link>
            <Button
              size="sm"
              variant="outline-danger"
              onClick={() => {
                onDeleteNote(note.id);
                navigate("..");
              }}
            >
              Delete
            </Button>
          </Stack>
        </Col>
      </Row>
      {/* <Row className="mb-3">
        <Stack direction="vertical">
          <h1 className="text-capitalize">{note.title}</h1>
          <TagGroups tags={note.tags} alignLeft={true} />
        </Stack>
      </Row> */}
      <ReactMarkdown className="border p-4 rounded-2">
        {note.markdown}
      </ReactMarkdown>
    </>
  );
}
