import { ModalProps } from "../ui/Modal";
import Modal from "../ui/Modal";
import RegisterForm from "../forms/RegisterForm";

export default function RegisterModal({isOpen, onClose}: ModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Registration">
            <RegisterForm onSuccess={onClose}/>
        </Modal>
    )
}