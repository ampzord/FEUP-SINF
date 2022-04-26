function isLoggedIn(req, res, next) {
  if (req.session.user === undefined || req.session.primavera === undefined) {
    res.status(401).send('Bad Request. Please log in before making any more requests.')
    return
  }
  next()
}

module.exports = {
  isLoggedIn
}