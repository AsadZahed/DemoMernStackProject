import { User } from "../../models/user";
import { SignUpCredentials } from "../../network/notes_api";
import * as NotesApi from "../../network/notes_api";
import { Modal } from "react-bootstrap";
import { useState } from "react";
import { ConflictError } from "../../errors/http_errors";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../store/userSlice";
import { ModalHeader, SignUpModalBody } from "../molecules";

interface SignUpModalProps {
  onDismiss: () => void;
  onSignUpSuccessful: (user: User) => void;
}

export const SignUpModal = ({
  onDismiss,
  onSignUpSuccessful,
}: SignUpModalProps) => {
  const [errorText, setErrorText] = useState<string | null>(null);
  const dispatch = useDispatch();

  async function onSubmit(credentials: SignUpCredentials) {
    try {
      const newUser = await NotesApi.signUp(credentials);
      onSignUpSuccessful(newUser);
      dispatch(
        setUserInfo({
          username: newUser.username,
          email: newUser.email,
        })
      );
    } catch (error) {
      if (error instanceof ConflictError) {
        setErrorText(error.message);
      } else {
        alert(error);
      }
      console.error(error);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <ModalHeader title="Sign up" />
      <SignUpModalBody onSubmit={onSubmit} errorText={errorText} />
    </Modal>
  );
};
