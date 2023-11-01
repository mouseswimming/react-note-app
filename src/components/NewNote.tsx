import { Row } from "react-bootstrap";
import { NoteData, Tag } from "../types";
import NoteForm from "./NoteForm";

type NewNoteProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (data: Tag) => void;
  availableTags: Tag[];
};

export default function NewNote({
  onSubmit,
  onAddTag,
  availableTags,
}: NewNoteProps) {
  return (
    <>
      <Row className="mb-4 align-items-center py-2 px-1 bg-dark bg-gradient text-white rounded-bottom">
        <h1>Create Note</h1>
      </Row>
      <NoteForm
        onSubmit={onSubmit}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  );
}
