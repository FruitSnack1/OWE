import jwt from 'jsonwebtoken'

function verifyToken(req, res, next) {
    // const token = req.cookies['accessToken'];
    const token = req.headers.authorization;
    console.log('User token : ', token)
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

function generateToken(data) {
    return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET)
}

export { verifyToken, generateToken }