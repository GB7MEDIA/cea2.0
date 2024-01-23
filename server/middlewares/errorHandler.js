import winston from 'winston';

const errorHandler = (err, req, res, next) => {
  // Log the error for server side debugging
  winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

  // Error response structure
  const errorResponse = {
    status: 'error',
    message: err.message || 'Internal Server Error'
  };

  // Check for specific types of errors or add custom error handling as needed
  if (err.name === 'ValidationError') {
    // Mongoose validation error
    res.status(400);
    errorResponse.message = err.message;
  } else if (err.name === 'UnauthorizedError') {
    // JWT authentication error
    res.status(401);
    errorResponse.message = 'Invalid Token';
  } else {
    // Generic server error
    res.status(err.status || 500);
  }

  res.json(errorResponse);
};

export default errorHandler;
