'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ChatBubble from './ChatBubble'; // assuming ChatBubble component is in the same directory

interface Message {
  id: string;
  content: string;
  timestamp: string;
  sender: {
    name: string;
  };
}

interface InboxProps {
  userId: string;
}

const Inbox: React.FC<InboxProps> = ({ userId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/inbox/${userId}`);
        setMessages(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch messages:', error);
        setLoading(false);
      }
    };

    fetchMessages();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p className="text-4xl font-black text-gray-900 dark:text-white">Inbox</p>
      {messages.length === 0 ? (
        <div>No messages</div>
      ) : (
        <ul>
          {messages.map(message => (
            <li key={message.id}>
              <ChatBubble
                      content={message.content}
                      name={message.sender.name}
                      timestamp={message.timestamp} 
                      id={''} sender={{
                          name: ''
                      }}              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Inbox;
