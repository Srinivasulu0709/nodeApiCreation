const AppError = require('./../utils/appError');

// For check duplicate email in database
const handleDuplicateFieldsDB = (err) => {
    const field = Object.keys(err.keyValue)[0];
    const value = err.keyValue[field];
    const message = `Duplicate field value: '${value}'. Please use another ${field}!`;
    return new AppError(message, 400);
  };
  
  module.exports = (err, req, res, next) => {
    console.error('ERROR 💥', err);
  
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
  
    // Handle Mongo duplicate key error
    if (err.code === 11000) {
      err = handleDuplicateFieldsDB(err);
    }
  
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  };