import { ReactNode, useCallback, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import style from "./modal.module.css";
import ModalOverlay from "../modal-overlay/ModalOverlay";
import { useAppDispatch } from "../../services/store";
import modalSlice from "../../services/reducers/modal";

const modal = document.getElementById("react-modals") as HTMLElement;

export interface ModalProps {
  title?: string;
  children: ReactNode;
}

function Modal({ title = "", children }: ModalProps) {
  const [popupClass, setPopupClass] = useState(style.popup);
  const dispatch = useAppDispatch();
  const { closeModal } = modalSlice.actions;

  const onCloseModal = useCallback(() => {
    dispatch(closeModal());
  }, [closeModal, dispatch]);

  const handleCloseModalByEsc = useCallback(
    (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        onCloseModal();
      }
    },
    [onCloseModal]
  );

  useEffect(() => {
    setPopupClass(style.popup_opened);
    document.addEventListener("keydown", handleCloseModalByEsc);
    return () => {
      document.removeEventListener("keydown", handleCloseModalByEsc);
      setPopupClass(style.popup);
    };
  }, [handleCloseModalByEsc]);

  return ReactDOM.createPortal(
    <div className={popupClass}>
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
