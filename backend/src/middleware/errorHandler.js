// Error handling middleware
export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Handle Zod validation errors
  if (err.name === 'ZodError') {
    return res.status(400).json({
      message: 'Validation error',
      errors: err.errors
    });
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      message: 'Invalid token'
    });
  }

  // Handle MongoDB duplicate key errors
  if (err.code === 11000) {
    return res.status(400).json({
      message: 'Duplicate key error',
      field: Object.keys(err.keyPattern)[0]
    });
  }

  // Default error
  res.status(500).json({
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
};