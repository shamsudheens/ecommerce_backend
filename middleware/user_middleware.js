export function userMiddleware(req, res, next) {
    if (req.session.userid) next()
    else
        return res.status(403).json({ message: "Access denied" })
}