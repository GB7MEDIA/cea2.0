import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Import routes
import {AuthRoutes} from "./routes/auth.routes.js";
import {ChatRoutes} from "./routes/chat.routes.js";
import {MieterRoutes} from "./routes/mieter.routes.js";
import {ObjektRoutes} from "./routes/objekt.routes.js";
import {SchädenRoutes} from "./routes/schäden.routes.js";
import {UserRoutes} from "./routes/user.routes.js";

// Initialize express app
const app = express();

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect("mongodb+srv://mongodbcea:xe122m8QdHuyi3l1@cea.tetk7pb.mongodb.net")
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(helmet());

// Use routes
app.use('/api/auth', AuthRoutes);
app.use('/api/chat', ChatRoutes);
app.use('/api/mieter', MieterRoutes);
app.use('/api/objekt', ObjektRoutes);
app.use('/api/schäden', SchädenRoutes);
app.use('/api/user', UserRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

import http from 'http';
import { Server } from 'socket.io';

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(3001, () => {
    console.log('Socket.io server running on port 3001');
});
