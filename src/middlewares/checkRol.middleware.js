const { HttpStatusError } = require("../errors/httpStatusError")
const { controllerWrapper } = require("../utils/common")
const { ROLES } = require('../database/constants');

const defaultRoles = [ROLES.ADMIN, ROLES.AGENT]

const checkRol = (roles=defaultRoles) => controllerWrapper(async (req, res, next) => {
    const userReceived = req.user
    if(!userReceived) throw HttpStatusError.forbidden("Not received!")

    if(!roles.includes(userReceived.role)) 
        throw HttpStatusError.forbidden("You don't have the required permissions")
    next()
})

module.exports = {
    checkRol
  }