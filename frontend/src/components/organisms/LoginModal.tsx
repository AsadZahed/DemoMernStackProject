import { User } from "../../models/user";
import { LoginCredentials } from "../../network/notes_api";
import * as NotesApi from "../../network/notes_api";
import { Modal } from "react-bootstrap";
import { useState } from "react";
import { UnauthorizedError } from "../../errors/http_errors";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../store/userSlice";
import { ModalHeader, LoginModalBody } from "../molecules";

interface LoginModalProps {
  onDismiss: () => void;
  onLoginSuccessful: (user: User) => void;
}

export const LoginModal = ({
  onDismiss,
  onLoginSuccessful,
}: LoginModalProps) => {
  const [errorText, setErrorText] = useState<string | null>(null);

  const dispatch = useDispatch();

  async function onSubmit(credentials: LoginCredentials) {
    try {
      const user = await NotesApi.login(credentials);
      onLoginSuccessful(user);
      dispatch(
        setUserInfo({
          username: user.username,
          email: user.email,
        })
      );
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        setErrorText(error.message);
      } else {
        alert(error);
      }
      console.error(error);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <ModalHeader title="Log in" />
      <LoginModalBody onSubmit={onSubmit} errorText={errorText} />
    </Modal>
  );
};
