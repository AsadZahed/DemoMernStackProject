import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { LoginCredentials } from "../../network/notes_api";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import styleUtils from "../../styles/utils.module.css";
import { useEffect } from "react";
import { TextInputField } from "../atoms";

interface LoginModalBodyProps {
  errorText?: string | null;
  onSubmit: (credentials: LoginCredentials) => void;
}

export const LoginModalBody = ({
  onSubmit,
  errorText,
}: LoginModalBodyProps) => {
  //const [errorText, setErrorText] = useState<string | null>(null);

  //yup schema for login credentials validation
  const loginSchema = yup
    .object({
      username: yup.string().required("Username is required"),
      password: yup.string().required("Password must be entered"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginCredentials>({
    defaultValues: { username: "", password: "" },
    resolver: yupResolver(loginSchema),
    mode: "onChange",
  });
  useEffect(() => {}, [errorText]);

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
          name="password"
          label="Password"
          type="password"
          placeholder="Password"
          register={register}
          error={errors.password}
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          className={styleUtils.width100}
        >
          Log In
        </Button>
      </Form>
    </Modal.Body>
  );
};
