const { HttpStatusError } = require("../errors/httpStatusError")
const { controllerWrapper } = require("../utils/common")
const { ROLES } = require('../database/constants');

const defaultRoles = [ROLES.ADMIN, ROLES.AGENT]

const checkrol = (roles=defaultRoles) => controllerWrapper(async (req, res, next) => {
    const userReceived = req.user
    if(!userReceived) throw HttpStatusError.forbidden("Not received!")

    if(roles.includes(userReceived.role)) next()

    throw HttpStatusError.forbidden("You don't have the required permissions")
})

module.exports = {
    checkrol
  }