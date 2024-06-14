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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="inbox">
      <h2 className="text-xl font-bold mb-4">Inbox</h2>
      {messages.length === 0 ? (
        <p>No messages.</p>
      ) : (
        <ul>
          {messages.map((message) => (
            <li key={message.id} className="mb-4">
              <ChatBubble
                message={message.content}
                sender={message.sender.name}
                timestamp={message.timestamp}
                isOwnMessage={message.sender.name === 'Your User Name'} // Replace with actual user check
                onReply={handleReply}
                messageId={message.id}
              />
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
