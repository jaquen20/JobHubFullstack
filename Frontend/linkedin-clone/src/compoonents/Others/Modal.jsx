import React from "react";
import Styles from "./Modal.module.css";

const Modal = ({ show, onClose, children }) => {
  if (!show) return null;
  return (
    <div className={Styles.modalOverlay}>
      <div className={Styles.modalContent}>
        <button onClick={onClose} className={Styles.modalClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
