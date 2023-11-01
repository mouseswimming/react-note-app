import { NoteData, Tag } from "../types";
import { useNote } from "../utils/useNote";
import NoteForm from "./NoteForm";

type EditNoteProps = {
  onSubmit: (id: string, data: NoteData) => void;
  onAddTag: (data: Tag) => void;
  availableTags: Tag[];
};

export default function EditNote({
  onSubmit,
  onAddTag,
  availableTags,
}: EditNoteProps) {
  const note = useNote();
  return (
    <>
      <h1 className="mb-4">Edit Note</h1>
      <NoteForm
        onSubmit={(data) => onSubmit(note.id, data)}
        onAddTag={onAddTag}
        availableTags={availableTags}
        title={note.title}
        tags={note.tags}
        markdown={note.markdown}
      />
    </>
  );
}
