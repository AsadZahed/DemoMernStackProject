import { Container } from "react-bootstrap";
import {
  NotesPageLoggedOutView,
  NotesPageLoggedInView,
} from "../components/organisms";
import { User } from "../models/user";
import styles from "../styles/NotesPage.module.css";

interface NotesPageProps {
  loggedInUser: User | null;
}
//Parent component for Notes Screen, if user is not logged in shows public screen.
export const NotesPage = ({ loggedInUser }: NotesPageProps) => {
  return (
    <Container className={styles.notesPage}>
      <>
        {loggedInUser ? <NotesPageLoggedInView /> : <NotesPageLoggedOutView />}
      </>
    </Container>
  );
};

