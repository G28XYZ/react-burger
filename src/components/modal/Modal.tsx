import ReactDOM from "react-dom";
import style from "./modal.module.css";

const modal = document.getElementById("react-modals") as HTMLElement;

function Modal({ title = "", children, isOpen = true, onCloseModal }: any) {
  return ReactDOM.createPortal(
    <div className={isOpen ? style.popup_opened : style.popup}>
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
