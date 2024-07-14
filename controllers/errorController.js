const AppError = require('./../utils/appError');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  if (err && err.errmsg && typeof err.errmsg === 'string') {
    const regex = /(["'])(\\?.)*?\1/;
    const match = err.errmsg.match(regex);

    if (match) {
      const value = match[0];
      const message = `Duplicate field value: ${value}. Please use another value!`;
      return new AppError(message, 400);
    }
  }
  return new AppError('Duplicate field value. Please use another value!', 400);
};

// const handleValidationErrorDB = (err) => {
//   const errors = Object.values(err.errors).map((el) => el.message);
//   const message = `Invalid input data. ${errors.join('. ')}`;
//   return new AppError(message, 400);
// };

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => {
    let message = el.message;
    if (el.kind === 'required') {
      message = `${el.path} is required`;
    } else if (el.kind === 'unique') {
      message = `${el.path} already exists`;
    }
    // Add more specific messages for other validation errors (e.g., format, min/max length)
    return message;
  });
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleJWTError = () => new AppError('Invalid token. Please log in', 401);

const handleJWTExpiredError = () =>
  new AppError('Ur token has Expired Please login Again', 401);

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error('ERROR:', err); // Log the error for debugging purposes
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };

    if (error.name === 'CastError') error = handleCastErrorDB(error);

    if (error.code === 11000) error = handleDuplicateFieldsDB(error);

    if (error.name === 'ValidationError')
      error = handleValidationErrorDB(error); // Adjusted to handle ValidatorError

    if (error.name === 'JsonWebTokenError') error = handleJWTError();

    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

    sendErrorProd(error, res);
  }
};
