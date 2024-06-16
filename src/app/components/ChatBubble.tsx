import React, { useState } from 'react';
import ReplyButton from './Buttons/ReplyButton';
import {auth} from '@/app/api/auth/[...nextauth]/auth'

interface ChatBubbleProps {
  message: string;
  sender: string;
  timestamp: string;
  isOwnMessage: boolean;
  onReply: (messageId: string) => void;
  messageId: string;
  userId: string;
  recipientId: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({recipientId, userId, message, sender, timestamp, isOwnMessage, onReply, messageId }) => {
  return (
    <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-2`}>
      <div className={`p-4 rounded-lg shadow-lg ${isOwnMessage ? 'bg-blue-100' : 'bg-green-300'}`}>
        <p className="text-sm">{message}</p>
        <p className="text-xs text-gray-500 mt-2">{sender} - {new Date(timestamp).toLocaleString()}</p>
        <ReplyButton
          senderId={userId} // current user id is sender
          recipientId={recipientId} // person who sent id of post
          image={''}
        />
      </div>
    </div>
  );
};

export default ChatBubble;
