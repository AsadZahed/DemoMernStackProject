import { useState, useEffect } from "react";

import { Note as NoteModel } from "../../models/note";

import { AddEditNoteDialog } from "../organisms";

interface AddEditNotesDialogProps {
  notes: NoteModel[];
  setNotes: any;
  noteToEdit: NoteModel | null;
  setNoteToEdit: any;
  showAddNoteDialog: boolean;
  setShowAddNoteDialog: any;
}

export const AddEditNotesDialog = ({
  notes,
  setNotes,
  noteToEdit,
  setNoteToEdit,
  showAddNoteDialog,
  setShowAddNoteDialog,
}: AddEditNotesDialogProps) => {
  return (
    <>
      {showAddNoteDialog && (
        <AddEditNoteDialog
          onDismiss={() => setShowAddNoteDialog(false)}
          onNoteSaved={(newNote) => {
            setNotes([...notes, newNote]);
            setShowAddNoteDialog(false);
          }}
        />
      )}
      {noteToEdit && (
        <AddEditNoteDialog
          noteToEdit={noteToEdit}
          onDismiss={() => setNoteToEdit(null)}
          onNoteSaved={(updatedNote) => {
            setNotes(
              notes.map((existingNote) =>
                existingNote._id === updatedNote?._id
                  ? updatedNote
                  : existingNote
              )
            );
            setNoteToEdit(null);
          }}
        />
      )}
    </>
  );
};
