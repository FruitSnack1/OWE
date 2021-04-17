import jwt from 'jsonwebtoken'

//ověření tokenu a získání identity
function verifyToken(req, res, next) {
    const token = req.headers.authorization
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

//generování tokenu
function generateToken(data) {
    return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET)
}

export { verifyToken, generateToken }