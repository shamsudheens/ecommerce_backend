export function userMiddleware(req, res, next) {
    if (req.session.adminid) next()
    else
        return res.status(403).json({ message: "Access denied" })
}