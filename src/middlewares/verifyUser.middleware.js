const { HttpStatusError } = require("../errors/httpStatusError")
const { application } = require('express')
const { User, Session, Subsidiary } = require('../database/models')
const { controllerWrapper } = require("../utils/common")

const verifyUser = (get = true) => controllerWrapper(async (req, res, next) => {

    var bearer = req.headers.authorization
    let arr = bearer.split(' ');
    const sessionId = arr[1]

    console.log(sessionId)
    const session = await Session.findByPk(sessionId)
    
    if(!session) throw HttpStatusError.notFound("Session not found")
    const user = await User.findByPk(session.userId)

    if(!user) throw HttpStatusError.notFound("User not found")

    if(get) req.user = user


    next()

})

module.exports = {
    verifyUser
  }