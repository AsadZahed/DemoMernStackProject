import { Modal } from "react-bootstrap";
import { Note } from "../../models/note";
import { NoteInput } from "../../network/notes_api";
import * as NotesApi from "../../network/notes_api";
import { AddEditNoteBody, ModalHeader } from "../molecules";

interface AddEditNoteDialogProps {
  noteToEdit?: Note;
  onDismiss: () => void;
  onNoteSaved: (note: Note) => void;
}

export const AddEditNoteDialog = ({
  noteToEdit,
  onDismiss,
  onNoteSaved,
}: AddEditNoteDialogProps) => {
  async function onSubmit(input: NoteInput) {
    try {
      let noteResponse: Note;
      if (noteToEdit) {
        noteResponse = await NotesApi.updateNote(noteToEdit._id, input);
      } else {
        noteResponse = await NotesApi.createNote(input);
      }
      onNoteSaved(noteResponse);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <ModalHeader title={noteToEdit ? "Edit notes" : "Add note"} />
      <AddEditNoteBody onSubmit={onSubmit} noteToEdit={noteToEdit} />
    </Modal>
  );
};
