import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { TextInputField } from "../atoms/TextInputField";
import { Note } from "../../models/note";
import { NoteInput } from "../../network/notes_api";

interface AddEditNoteBodyDialogProps {
  noteToEdit?: Note;
  onSubmit: (input: NoteInput) => void;
}

export const AddEditNoteBody = ({
  onSubmit,
  noteToEdit,
}: AddEditNoteBodyDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NoteInput>({
    defaultValues: {
      title: noteToEdit?.title || "",
      text: noteToEdit?.text || "",
    },
  });

  return (
    <>
      <Modal.Body>
        <Form id="addEditNoteForm" onSubmit={handleSubmit(onSubmit)}>
          <TextInputField
            name="title"
            label="Title"
            type="text"
            placeholder="Title"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.title}
          />

          <TextInputField
            name="text"
            label="Text"
            as="textarea"
            rows={5}
            placeholder="Text"
            register={register}
          />
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button type="submit" form="addEditNoteForm" disabled={isSubmitting}>
          Save
        </Button>
      </Modal.Footer>
    </>
  );
};
