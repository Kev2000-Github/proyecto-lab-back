const { HttpStatusError } = require("../errors/httpStatusError")
const { application } = require('express')
const { User, Session, Subsidiary } = require('../database/models')
const { controllerWrapper } = require("../utils/common")
const { ROLES } = require('../database/constants');

const checkrol = controllerWrapper(async (req, res, next) => {
    const userReceived = req.user

    if(!userReceived) throw HttpStatusError.forbidden("Not received!")

    if(userReceived.role != ROLES.AGENT && userReceived.role != ROLES.ADMIN) throw HttpStatusError.forbidden("Wrong value!")

    next()
})

module.exports = {
    checkrol
  }