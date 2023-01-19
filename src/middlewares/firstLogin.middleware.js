const { HttpStatusError } = require("../errors/httpStatusError")
const { controllerWrapper, hashPassword } = require("../utils/common")
const { User } = require('../database/models')
const { ROLES } = require('../database/constants')

const firstLogin = controllerWrapper(async (req, res, next) => {
    const existUsers = await User.count()
    if(existUsers > 0) return next()
    const { username, password } = req.body
    const newPassword = await hashPassword(10, password)
    await User.create({ username, password: newPassword, rol: ROLES.ADMIN })
    next()
})

module.exports = {
    firstLogin
  }