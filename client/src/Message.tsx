import React from 'react';
import { MessageType } from './types';

interface MessageListProps {
    messages: MessageType[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => (
    <div className="message-list">
        {messages.map((message, index) => (
            <div key={index} className={`message ${message.username === 'UserName' ? 'own-message' : ''}`}>
                <strong>{message.username}</strong>: {message.message} <em>{new Date(message.timestamp).toLocaleTimeString()}</em>
            </div>
        ))}
    </div>
);

export default MessageList;
