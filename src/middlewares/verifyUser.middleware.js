const { HttpStatusError } = require("../errors/httpStatusError")
const { User, Session, Subsidiary } = require('../database/models')
const { controllerWrapper, getAuthSession } = require("../utils/common")

const verifyUser = (get = true) => controllerWrapper(async (req, res, next) => {
    const sessionId = getAuthSession(req.headers.authorization)
    const session = await Session.findByPk(sessionId)
    if(!session) throw HttpStatusError.notFound("Session not found")
    const user = await User.findByPk(session.userId, {include: Subsidiary})
    if(!user) throw HttpStatusError.notFound("User not found")
    if(get) req.user = user
    next()
})

module.exports = {
    verifyUser
  }