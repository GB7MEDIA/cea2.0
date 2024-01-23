import dotenv from 'dotenv';
dotenv.config();

const config = {
  // Server Port
  defaultPort: 4000,

  // CORS Configuration
  corsOptions: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000', // Replace with your client's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  },

  // Helmet Configuration for Security
  helmetConfig: {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:"],
        connectSrc: ["'self'", process.env.API_URL], // Add your API URL or any other sources you connect to
      },
    },
    frameguard: false,
    hsts: false,
  },

  // Database Configuration
  database: {
    uri: process.env.DATABASE_URI || 'mongodb://localhost:27017/myapp',
  },

  // Any other global configuration entries...
};

export default config;
