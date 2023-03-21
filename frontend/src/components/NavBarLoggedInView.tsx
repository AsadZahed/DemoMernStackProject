import { Button, Navbar } from "react-bootstrap";
import { User } from "../models/user";
import * as NotesApi from "../network/notes_api";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../src/store/store";
import { logout } from "../features/counter/counterSlice";

interface NavBarLoggedInViewProps {
  onLogoutSuccessful: () => void;
}

const NavBarLoggedInView = ({
  onLogoutSuccessful,
}: NavBarLoggedInViewProps) => {
  const username = useSelector((state: RootState) => state.counter.username);
  const dispatch = useDispatch();

  async function logoutUser() {
    try {
      await NotesApi.logout();
      onLogoutSuccessful();
      dispatch(logout());
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <>
      <Navbar.Text className="me-2">Signed in as: {username}</Navbar.Text>
      <Button onClick={logoutUser}>Log out</Button>
    </>
  );
};

export default NavBarLoggedInView;