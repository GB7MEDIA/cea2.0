import winston from 'winston';

const setupWebSocket = (io) => {
  io.on('connection', (socket) => {
    winston.info(`New WebSocket connection: ${socket.id}`);

    // Example of handling a custom event
    //socket.on('joinRoom', (roomId) => {
      //socket.join(roomId);
      //winston.info(`Socket ${socket.id} joined room ${roomId}`);
    //});

    // Handle disconnection
    socket.on('disconnect', () => {
      winston.info(`WebSocket disconnected: ${socket.id}`);
    });

    // Add more event listeners as needed
  });
};

export default setupWebSocket;
