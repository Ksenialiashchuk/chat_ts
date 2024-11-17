import React, { useState, useEffect, useRef } from 'react';
import MessageList from './Message';
import MessageInput from './MessageInput';
import { MessageType } from './types';
import './App'

const Chat: React.FC = () => {
    const [messages, setMessages] = useState<MessageType[]>([]);
    const ws = useRef<WebSocket | null>(null);

    useEffect(() => {
        ws.current = new WebSocket('ws://localhost:8080');

        ws.current.onopen = () => {
            console.log('Connected to WebSocket server');
        };

        ws.current.onmessage = (event) => {
            const newMessage: MessageType = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        };

        ws.current.onclose = () => {
            console.log('Disconnected from WebSocket server');
        };

        return () => {
            ws.current?.close();
        };
    }, []);

    const sendMessage = (message: string) => {
        const username = "UserName";
        const newMessage: MessageType = {
            username,
            message,
            timestamp: Date.now(),
        };


        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            ws.current.send(JSON.stringify(newMessage));
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        } else {
            console.error("WebSocket connection is not open.");
        }
    };

    return (
        <div className="chat-container">
            <MessageList messages={messages} />
            <MessageInput onSendMessage={sendMessage} />
        </div>
    );
};

export default Chat;
