import React from "react";
import ReactDOM from "react-dom";

const modal = document.getElementById("react-modals") as HTMLElement;

class Modal extends React.Component {
  render() {
    return ReactDOM.createPortal(
      <>
        <div className="Modal">
          <h2>header</h2>
          children
        </div>
      </>,
      modal
    );
  }
}

export default Modal;
