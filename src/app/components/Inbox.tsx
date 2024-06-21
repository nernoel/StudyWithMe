'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ChatBubble from './ChatBubble';
import Modal from './Modal';


interface Message {
  id: string;
  sender: { name: string };
  content: string;
  timestamp: string;
}

const Inbox: React.FC<{ userId: string }> = ({ userId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [replyToMessageId, setReplyToMessageId] = useState<string | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/inbox/${userId}`);
        setMessages(response.data);
      } catch (error) {
        setError('Failed to fetch messages');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [userId]);

  const handleReply = (messageId: string) => {
    setReplyToMessageId(messageId);
    setShowModal(true);
  };

  const handleSend = (message: string) => {
    // Update the local state with the new message (optional)
    setShowModal(false);
    setReplyToMessageId(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setReplyToMessageId(null);
  };

  if (loading) return <p className='text-transparent bg-clip-text bg-gradient-to-r to-indigo-300 from-purple-300'>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="inbox">
     <h1 className="mb-4 text-3xl font-extrabold text-gray-200 md:text-5xl lg:text-6xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-gray-900 from-gray-900">Messages</span> </h1>
      {messages.length === 0 ? (
        <p className='text-transparent bg-clip-text bg-gradient-to-r to-indigo-300 from-purple-300'>Your inbox is currently empty!</p>
      ) : (
        <ul>
          {messages.map((message) => (
            <li key={message.id} className="mb-4">
              <ChatBubble
                message={message.content}
                sender={message.sender.name}
                timestamp={message.timestamp}
                isOwnMessage={message.sender.name === 'Your User Name'}
                onReply={handleReply}
                messageId={message.id} 
                userId={userId} 
                recipientId={userId}             />
            </li>
          ))}
        </ul>
      )}
      {replyToMessageId && (
        <Modal 
          show={showModal} 
          handleClose={handleCloseModal} 
          handleSend={handleSend} 
          image={'/path/to/avatar.jpg'} // Replace with actual avatar URL
          recipientId={replyToMessageId} 
          senderId={userId} 
        />
      )}
    </div>
  );
};

export default Inbox;
