const protect = (req, res, next) => {
  const { cookie } = req.session

  if (!cookie) {
    return res
      .status(404)
      .json({ status: 'Fail', message: 'Unauthorized, You are not logged in' })
  }

  req.user = cookie
  next()
}

export default protect
