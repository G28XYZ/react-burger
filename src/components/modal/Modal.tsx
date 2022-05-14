import { ReactNode, useCallback, useEffect } from "react";
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

function Modal({ title = "", children, isOpen = false, onCloseModal }: ModalProps) {
  const handleCloseModalByEsc = useCallback(
    (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        onCloseModal();
      }
    },
    [onCloseModal]
  );

  useEffect(() => {
    if (isOpen) document.addEventListener("keydown", handleCloseModalByEsc);
    return () => document.removeEventListener("keydown", handleCloseModalByEsc);
  }, [handleCloseModalByEsc, isOpen]);

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
