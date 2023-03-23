import { Col, Row } from "react-bootstrap";
import styles from "../../styles/NotesPage.module.css";
import { NoteCard } from "../molecules";
import { Note as NoteModel } from "../../models/note";
interface NotesGridProps {
  notes: NoteModel[];
  setNoteToEdit: any;
  deleteNote: (note: NoteModel) => void;
}

export const NotesGrid = ({
  notes,
  setNoteToEdit,
  deleteNote,
}: NotesGridProps) => {
  return (
    <Row xs={1} md={2} xl={3} className={`g-4 ${styles.notesGrid}`}>
      {notes.map((note) => (
        <Col key={note._id}>
          <NoteCard
            note={note}
            className={styles.note}
            onNoteClicked={setNoteToEdit}
            onDeleteNoteClicked={deleteNote}
          />
        </Col>
      ))}
    </Row>
  );
};
