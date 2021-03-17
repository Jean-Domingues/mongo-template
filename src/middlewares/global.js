exports.global = (req, res, next) => {
  res.locals.varLocal = 'Variavel local'
  console.log('Middleware global');
  next()
}

exports.checkCsrfError = (err, req, res, next) => {
  if(err && 'EBADCSRFTOKEN' === err.code) {
    res.render('404')
  }
}

exports.applyCsrf = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken()
  next()
}