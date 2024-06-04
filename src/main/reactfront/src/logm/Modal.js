import React from 'react';
import './Modal.css';
import '../App.css';

function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        <div className="modalb App" >
            <div className="modal-style">
                {children}
            </div>
        </div>
    );
}

export default Modal;
