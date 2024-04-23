import { io } from 'socket.io-client';

export const initSocket = async () => {
    const options = {
        'force new connection': true,
        reconnectionAttempt: 'Infinity',
        timeout: 10000,
        transports: ['websocket'],
    };
    return io("https://codexwebapp.onrender.com", options);
    // return io("http://localhost:5000", options);
    // return io(process.env.REACT_APP_BACKEND_URL, options);
};