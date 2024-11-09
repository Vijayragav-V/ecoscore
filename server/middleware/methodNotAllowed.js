const methodNotAllowed = (req, res) => {
    return res.status(405).json({
      error: `Cannot ${req.method} ${req.originalUrl}`,
    });
  };
  
  module.exports = methodNotAllowed;