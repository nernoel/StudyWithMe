import { PrismaClient } from '@prisma/client';
import React, { useState } from 'react';
import ReplyButton from './Buttons/ReplyButton';


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
    <div className=''>

      <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-1`}>
        <div>
      <img className="ml-2 mr-2 w-10 h-10 rounded-full" src="/AnonUser.png" alt="Rounded avatar"></img>
      </div>
        <div className={`p-2 rounded-lg shadow-lg ${isOwnMessage ? 'bg-blue-100' : 'bg-blue-500'}`}>
          <p className="text-gray-50 text-xs">{message}</p>
          <p className="mb-2 text-xs text-gray-50 mt-1">Received from: {sender} on {new Date(timestamp).toLocaleString()}</p>
          <ReplyButton
            senderId={userId} // current user id is sender
            recipientId={recipientId} // person who sent id of post
            image={''}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
