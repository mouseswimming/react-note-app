import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Route, Routes, Navigate } from "react-router-dom";
import NewNote from "./components/NewNote";

import { NoteData, RawNote, Tag } from "./types";
import { useMemo } from "react";
import { useLocalStorage } from "./utils/useLocalStorage";
import NoteList from "./components/NoteList";
import NoteLayout from "./components/NoteLayout";
import NoteShow from "./components/NoteShow";
import NoteEdit from "./components/NoteEdit";

import data from "./data/demo.json";

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", data.notes);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", data.tags);

  const notesWithTags = useMemo(() => {
    return notes?.map((note) => {
      return {
        ...note,
        tags: tags?.filter((tag) => note.tagIds.includes(tag.id)),
      };
    });
  }, [notes, tags]);

  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes((prevNotes) => {
      return [
        ...prevNotes,
        { ...data, id: crypto.randomUUID(), tagIds: tags.map((tag) => tag.id) },
      ];
    });
  }

  function onUpdateNote(id: string, { tags, ...data }: NoteData) {
    console.log({ data });
    setNotes((prevNotes) => {
      return prevNotes.map((note) => {
        if (note.id === id) {
          return { ...note, ...data, tagIds: tags.map((tag) => tag.id) };
        } else {
          return note;
        }
      });
    });
  }

  function onDeleteNote(id: string) {
    setNotes((prevNotes) => {
      return prevNotes.filter((note) => note.id !== id);
    });
  }

  function updateTag(id: string, label: string) {
    setTags((prevTags) => {
      return prevTags.map((tag) => {
        if (tag.id === id) {
          return { ...tag, label };
        } else {
          return tag;
        }
      });
    });
  }

  function onCreateTag(tag: Tag) {
    setTags((prevTags) => [...prevTags, tag]);
  }

  function onDeleteTag(id: string) {
    setTags((prevTags) => {
      return prevTags.filter((tag) => tag.id !== id);
    });
  }

  return (
    <Container
      style={{
        backgroundImage: "url('/note.svg')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center bottom -100px",
      }}
      className="min-vh-100"
    >
      <Routes>
        <Route
          path="/"
          element={
            <NoteList
              availableTags={tags}
              notes={notesWithTags}
              updateTag={updateTag}
              onDeleteTag={onDeleteTag}
            />
          }
        />
        <Route
          path="/new"
          element={
            <NewNote
              onSubmit={onCreateNote}
              onAddTag={onCreateTag}
              availableTags={tags}
            />
          }
        />
        <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
          <Route index element={<NoteShow onDeleteNote={onDeleteNote} />} />
          <Route
            path="edit"
            element={
              <NoteEdit
                onSubmit={onUpdateNote}
                onAddTag={onCreateTag}
                availableTags={tags}
              />
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  );
}

export default App;
