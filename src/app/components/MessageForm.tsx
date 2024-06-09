'use client'

import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';


interface MessageFormProps {
    senderId: string;
    recipientId: string;
}  


const MessageForm = ({ senderId, recipientId }: MessageFormProps) => {
    const [content, setContent] = useState<string>('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setContent(e.target.value);
    };

      const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
          await axios.post('http://localhost:3000/send', {
            senderId,
            recipientId,
            content,
          });
          setContent('');
        } catch (error) {
          console.error('Failed to send message:', error);
        }
      };

      return (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="content">Message</label>
            <input
              type="text"
              id="content"
              value={content}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Send</button>
        </form>
      );
  };

  export default MessageForm;