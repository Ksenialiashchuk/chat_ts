import WebSocket, { WebSocketServer } from 'ws';
import { MessageType } from './types';

const PORT = 8080;
const wss = new WebSocketServer({ port: PORT });

wss.on('connection', (ws: WebSocket) => {
    console.log('Новый клиент подключен.');

    ws.on('message', (data: string) => {
        const message: MessageType = JSON.parse(data);
        console.log(`Получено сообщение от ${message.username}: ${message.message}`);

        wss.clients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(message));
            }
        });
    });

    ws.on('close', () => {
        console.log('Клиент отключился.');
    });
});

console.log(`WebSocket сервер запущен на порту ${PORT}`);
