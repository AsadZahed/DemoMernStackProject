import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { User } from "../models/user";
import { SignUpCredentials } from "../network/notes_api";
import * as NotesApi from "../network/notes_api";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import TextInputField from "./form/TextInputField";
import styleUtils from "../styles/utils.module.css";
import { useState } from "react";
import { ConflictError } from "../errors/http_errors";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../store/userSlice";

interface SignUpModalProps {
  onDismiss: () => void;
  onSignUpSuccessful: (user: User) => void;
}

const SignUpModal = ({ onDismiss, onSignUpSuccessful }: SignUpModalProps) => {
  const [errorText, setErrorText] = useState<string | null>(null);
  const dispatch = useDispatch();
  const signupSchema = yup
    .object({
      username: yup.string().required("Username is required."),
      email: yup
        .string()
        .email("Please enter valid Email address.")
        .required("Email is required."),
      password: yup
        .string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must contain 8 Characters, One Uppercase, One Lowercase, One Number & One Special Case Character."
        )
        .required("Password is required."),
      confirmPassword: yup
        .string()
        .required("This is required.")
        .oneOf([yup.ref("password"), ""], "Passwords doesnt match."),
    })
    .required();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isDirty },
  } = useForm<SignUpCredentials>({
    defaultValues: { username: "", password: "", confirmPassword: "" },
    resolver: yupResolver(signupSchema),
    mode: "onChange",
  });

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
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {errorText && <Alert variant="danger">{errorText}</Alert>}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextInputField
            name="username"
            label="Username"
            type="text"
            placeholder="Username"
            register={register}
            error={errors.username}
          />
          <TextInputField
            name="email"
            label="Email"
            type="email"
            placeholder="Email"
            register={register}
            error={errors.email}
          />
          <TextInputField
            name="password"
            label="Password"
            type="password"
            placeholder="Password"
            register={register}
            error={errors.password}
          />
          <TextInputField
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="Re-enter Password"
            register={register}
            error={errors.confirmPassword}
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            className={styleUtils.width100}
          >
            Sign Up
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default SignUpModal;
