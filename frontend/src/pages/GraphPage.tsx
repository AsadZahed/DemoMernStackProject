import { Container } from "react-bootstrap";
import GraphMainSection from "../components/GraphMainSection";
import NotesPageLoggedOutView from "../components/NotesPageLoggedOutView";
import { User } from "../models/user";
import styles from "../styles/NotesPage.module.css";

interface NotesPageProps {
  loggedInUser: User | null;
}

const GraphPage = ({ loggedInUser }: NotesPageProps) => {
  return (
    <Container className={styles.notesPage}>
      <>{loggedInUser ? <GraphMainSection /> : <NotesPageLoggedOutView />}</>
    </Container>
  );
};

export default GraphPage;
