import React from 'react';
import './Modal.css'

const Modal = ({ isOpen, setIsOpen, content, title }) => {
  return (
    <>
      {isOpen && (
        <div className='modal'>
          <div className='modal-content'>
            <button onClick={() => setIsOpen(false)} className='close'>
              X
            </button>
            <h2 className='modal-title'>{title}</h2>
            {content()}
          </div>
        </div>
      )}
    </>
  );
};


export default Modal;
