import React, { useState } from 'react';

interface ChatBubbleProps {
  message: string;
  sender: string;
  timestamp: string;
  isOwnMessage: boolean;
  onReply: (messageId: string) => void;
  messageId: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, sender, timestamp, isOwnMessage, onReply, messageId }) => {
  return (
    <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-2`}>
      <div className={`p-4 rounded-lg shadow-lg ${isOwnMessage ? 'bg-blue-100' : 'bg-gray-100'}`}>
        <p className="text-sm">{message}</p>
        <p className="text-xs text-gray-500 mt-2">{sender} - {new Date(timestamp).toLocaleString()}</p>
        <button 
          className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600 mt-2"
          onClick={() => onReply(messageId)}
        >
          Reply
        </button>
      </div>
    </div>
  );
};

export default ChatBubble;
