import { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { Note as NoteModel } from "../../models/note";
import * as NotesApi from "../../network/notes_api";
import styleUtils from "../../styles/utils.module.css";
import { NotesGrid } from "../molecules";
import { AddEditNotesDialog } from "./../molecules/AddEditNoteDialog";

export const NotesPageLoggedInView = () => {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [notesLoading, setNotesLoading] = useState(true);
  const [showNotesLoadingError, setShowNotesLoadingError] = useState(false);

  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);

  useEffect(() => {
    async function loadNotes() {
      try {
        setShowNotesLoadingError(false);
        setNotesLoading(true);
        const notes = await NotesApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.error(error);
        setShowNotesLoadingError(true);
      } finally {
        setNotesLoading(false);
      }
    }
    loadNotes();
  }, []);

  async function deleteNote(note: NoteModel) {
    try {
      await NotesApi.deleteNote(note._id);
      setNotes(notes.filter((existingNote) => existingNote._id !== note._id));
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <>
      <Button
        className={`mb-4 ${styleUtils.blockCenter} ${styleUtils.flexCenter}`}
        onClick={() => setShowAddNoteDialog(true)}
      >
        <FaPlus />
        Add new note
      </Button>
      {notesLoading && <Spinner animation="border" variant="primary" />}
      {showNotesLoadingError && (
        <p>Something went wrong. Please refresh the page.</p>
      )}
      {!notesLoading && !showNotesLoadingError && (
        <>
          {notes.length > 0 ? (
            <NotesGrid
              notes={notes}
              setNoteToEdit={setNoteToEdit}
              deleteNote={deleteNote}
            />
          ) : (
            <p>You don't have any notes yet</p>
          )}
        </>
      )}
      <AddEditNotesDialog
        notes={notes}
        setNotes={setNotes}
        noteToEdit={noteToEdit}
        setNoteToEdit={setNoteToEdit}
        showAddNoteDialog={showAddNoteDialog}
        setShowAddNoteDialog={setShowAddNoteDialog}
      />
    </>
  );
};
