export function adminMiddleware(req, res, next) {
    if (req.session.adminid) next()
    else
        return res.status(403).json({ message: "Access only for admins" })
}