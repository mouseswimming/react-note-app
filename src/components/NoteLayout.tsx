import { Navigate, Outlet, useParams } from "react-router-dom";
import { Note } from "../types";

type NoteLayoutProps = {
  notes: Note[];
};

export default function NoteLayout({ notes }: NoteLayoutProps) {
  const { id } = useParams();
  const note = notes.find((note) => note.id === id);
  if (!note) return <Navigate to="/" replace />;
  return <Outlet context={note} />;
}
