import style from "./modal-overlay.module.css";

function ModalOverlay({ onCloseModal }: { onCloseModal: () => void }) {
  return <div onClick={onCloseModal} className={style.overlay}></div>;
}

export default ModalOverlay;
