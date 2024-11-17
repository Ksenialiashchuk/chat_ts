import React, { useState } from 'react';
interface MessageInputProps {
    onSendMessage: (message: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
    const [inputValue, setInputValue] = useState('');

    const handleSendClick = () => {
        if (inputValue.trim()) {
            onSendMessage(inputValue);
            setInputValue('');
        }
    };

    return (
        <div className="message-input">
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter you text..."
            />
            <button onClick={handleSendClick}>Send</button>
        </div>
    );
};

export default MessageInput;
