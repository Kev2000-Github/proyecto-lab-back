const { controllerWrapper } = require("../utils/common")
const { User } = require('../database/models')
const { ROLES } = require('../database/constants')
const uuid = require('uuid')

const firstLogin = controllerWrapper(async (req, res, next) => {
    const existUsers = await User.count()
    if(existUsers > 0) return next()
    const { username, password } = req.body
    await User.create({ id: uuid.v4(), username, password, role: ROLES.ADMIN })
    next()
})

module.exports = {
    firstLogin
  }