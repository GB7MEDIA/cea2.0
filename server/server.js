import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import 'dotenv/config';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import winston from 'winston';

import routes from './routes/index.js';
import connectDatabase from './config/database.js';
import errorHandler from './middleware/errorHandler.js';
import setupWebSocket from './config/socket.js';

const app = express();

// Database Connection
connectDatabase();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS Configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN || '*', // Replace '*' with your client's URL in production
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
app.use(cors(corsOptions));

// Helmet Configuration for Security
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:"],
      },
    },
    frameguard: false,
    hsts: false,
  })
);

// Routes
app.use('/api', routes);

// Error Handling Middleware
app.use(errorHandler);

const server = http.createServer(app);
const io = new SocketIOServer(server, { cors: corsOptions });

// Setup WebSocket
setupWebSocket(io);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  winston.info(`Server running on port ${PORT}`);
});

