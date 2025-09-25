import { ModalProps } from "../ui/Modal"
import Modal from "../ui/Modal"
import LoginForm from "../forms/LoginForm"

export default function LoginModal({isOpen, onClose}: ModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Sign In">
      <LoginForm onSuccess={onClose} />
    </Modal>
    )
}