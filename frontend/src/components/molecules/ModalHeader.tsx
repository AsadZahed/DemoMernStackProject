import { Modal } from "react-bootstrap";

interface ModalHeaderProps {
  title: string;
}
export const ModalHeader = ({ title }: ModalHeaderProps) => {
  return (
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
  );
};

