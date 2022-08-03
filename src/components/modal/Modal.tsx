import { FC, useCallback, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import style from './modal.module.css';
import ModalOverlay from './../modal-overlay/ModalOverlay';
import { IModalProps, TCallbackModalCloseByEsc } from './../../utils/types';

const modal = document.getElementById('react-modals') as HTMLElement;

const Modal: FC<IModalProps> = ({ children, onCloseModal }) => {
  const [popupClass, setPopupClass] = useState<string>(style.popup);
  const handleCloseModalByEsc = useCallback<TCallbackModalCloseByEsc>(
    (e) => {
      if (e.code === 'Escape') {
        onCloseModal();
      }
    },
    [onCloseModal]
  );

  useEffect(() => {
    setPopupClass(style.popup_opened);
    document.addEventListener('keydown', handleCloseModalByEsc);
    return () => {
      document.removeEventListener('keydown', handleCloseModalByEsc);
      setPopupClass(style.popup);
    };
  }, [handleCloseModalByEsc]);

  return ReactDOM.createPortal(
    <div className={popupClass}>
      <ModalOverlay onCloseModal={onCloseModal} />
      <div className={style.container}>
        <div className={style.header}>
          <button className={style.close} onClick={onCloseModal}></button>
        </div>
        {children}
      </div>
    </div>,
    modal
  );
};

export default Modal;
