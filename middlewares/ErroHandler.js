module.exports = (error, _req, res, _next) => {
  const { message, cause } = error;
  
  if (cause.status && message) return res.status(cause.status).json({ message });
  return res.status(500).end();
};