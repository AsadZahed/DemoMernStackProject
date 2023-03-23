import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignUpCredentials } from "../../network/notes_api";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { TextInputField } from "../atoms";
import styleUtils from "../../styles/utils.module.css";

interface SignUpModalProps {
  errorText?: string | null;
  onSubmit: (credentials: SignUpCredentials) => void;
}

export const SignUpModalBody = ({ errorText, onSubmit }: SignUpModalProps) => {
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
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpCredentials>({
    defaultValues: { username: "", password: "", confirmPassword: "" },
    resolver: yupResolver(signupSchema),
    mode: "onChange",
  });

  return (
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
  );
};
