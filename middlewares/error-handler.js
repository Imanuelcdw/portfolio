const errorHandler = async (err, req, res, next) => {
  res.status(500).json({ error: err.message })
}

module.exports = errorHandler
