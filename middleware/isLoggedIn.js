const isLoggedIn = (req, res, next) => {
    if (!(req.session && req.session.user)) {
        return res.redirect('/login')
    } else {
        next()
    }
}

module.exports = isLoggedIn
