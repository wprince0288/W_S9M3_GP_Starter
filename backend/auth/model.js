const yup = require('yup')
const jwt = require('jsonwebtoken')

const SECRET = process.env.SECRET || 'shh, this is very secret'

const credentialsSchema = yup.object().shape({
  username: yup.string().typeError().trim().required().min(3).max(20),
  password: yup.string().typeError().required().min(8),
})

const validateUser = async data => {
  try {
    const valid = await credentialsSchema.validate(data)
    return [null, valid]
  } catch (err) {
    const error = err.message
    return [error, null]
  }
}

const validate = async (req, res, next) => {
  const [error, validated] = await validateUser(req.body)
  if (error) {
    next({ message: 'Invalid credentials', status: 401 })
  } else {
    req.body = validated
    req.token = generateToken(validated.username)
    next()
  }
}

function generateToken(username) {
  return jwt.sign(
    { subject: username },
    SECRET,
    { expiresIn: '2minutes' },
  )
}

function checkToken(req, res, next) {
  const token = req.headers.authorization
  if (!token) {
    next({ message: 'Invalid credentials', status: 401 })
  } else {
    jwt.verify(token, SECRET, (err, decoded) => {
      if (err) return next({ message: 'Invalid credentials', status: 401 })
      req.jwt = decoded
      const sessionEndDate = new Date(decoded.exp * 1000)
      const secondsRemaining = Math.floor((sessionEndDate - new Date()) / 1000)
      req.jwt.remaining = secondsRemaining
      next()
    })
  }
}

module.exports = {
  validate,
  checkToken,
}
