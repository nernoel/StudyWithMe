'use client';

import React from 'react';

interface ModalProps {
  show: boolean;
  handleClose: () => void;
  children: React.ReactNode; // Allow passing children elements
}

const Modal: React.FC<ModalProps> = ({ show, handleClose, children }) => {
  return (
    <div className={`fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center ${show ? '' : 'hidden'}`}>
      <div className="relative bg-white rounded-lg shadow-lg w-11/12 md:w-1/3 p-6">
        <button className="absolute top-2 right-2 text-gray-500" onClick={handleClose}>
          &#x2715;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
