import { Container } from "react-bootstrap";
import GraphMainSection from "../components/GraphMainSection";
import NotesPageLoggedOutView from "../components/NotesPageLoggedOutView";
import { User } from "../models/user";
import styles from "../styles/NotesPage.module.css";

interface NotesPageProps {
  loggedInUser: User | null;
}
//Parent component for Graph Screen, if user is not logged in shows public screen.
const GraphPage = ({ loggedInUser }: NotesPageProps) => {
  return (
    <Container className={styles.notesPage}>
      <>{loggedInUser ? <GraphMainSection /> : <NotesPageLoggedOutView />}</>
    </Container>
  );
};

export default GraphPage;
