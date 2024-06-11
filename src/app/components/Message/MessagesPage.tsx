'use client';

import React, { useState } from 'react';
import Modal from './Modal';
import MessageForm from './MessageForm';

const App: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const senderId = "123"; // Example sender ID
  const recipientId = "456"; // Example recipient ID

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleSendMessage = () => {
    setShowAlert(true);
    setShowModal(false);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000); // hide alert after 3 seconds
  };

  return (
    <div className="App">
      <button
        className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600"
        onClick={toggleModal}
      >
        Send Message
      </button>
      <Modal show={showModal} handleClose={toggleModal}>
        <MessageForm
          senderId={senderId}
          recipientId={recipientId}
          onMessageSent={handleSendMessage}
        />
      </Modal>
      {showAlert && (
        <div className="absolute right-4 top-4 rounded-xl border border-gray-100 bg-white p-4 shadow-lg">
          <div className="flex items-start gap-4">
            <span className="text-green-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
            <div className="flex-1">
              <strong className="block font-medium text-gray-900">Sent!</strong>
              <p className="mt-1 text-sm text-gray-700">Your message has been sent!</p>
            </div>
            <button
              className="text-gray-500 transition hover:text-gray-600"
              onClick={() => setShowAlert(false)}
            >
              <span className="sr-only">Dismiss popup</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
