import { ReactNode } from "react";
import ReactDOM from "react-dom";
import style from "./modal.module.css";
import ModalOverlay from "../modal-overlay/ModalOverlay";

const modal = document.getElementById("react-modals") as HTMLElement;

export interface ModalProps {
  title: string;
  children: ReactNode;
  isOpen: boolean;
  onCloseModal: () => void;
}

function Modal({ title = "", children, isOpen = true, onCloseModal }: ModalProps) {
  return ReactDOM.createPortal(
    <div className={isOpen ? style.popup_opened : style.popup}>
      <ModalOverlay onCloseModal={onCloseModal} />
      <div className={style.container}>
        <div className={style.header}>
          <h2 className="text text_type_main-large">{title}</h2>
          <button className={style.close} onClick={onCloseModal}></button>
        </div>
        {children}
      </div>
    </div>,
    modal
  );
}

export default Modal;
