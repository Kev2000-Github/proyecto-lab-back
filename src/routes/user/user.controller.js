const { User, sequelize } = require('../../database/models')
const uuid = require('uuid')
const { HttpStatusError } = require('../../errors/httpStatusError')
const { hashPassword } = require('../../utils/common')

module.exports.getAllUsers = async () => {
    const users = await User.findAll()
    return users
}

module.exports.getUser = async ({userId}) => {
    const user = await User.findByPk(userId)
    if(!user) throw HttpStatusError.notFound("User not found")
    return user
}

module.exports.createUser = async ({username, password}) => {
    const newPassword = await hashPassword(10, password)
    const user = await User.create({username, password: newPassword, id: uuid.v4()})
    return user
}

module.exports.deleteUser = async ({userId}) => {
    const user = await User.findByPk(userId)
    if(!user) throw HttpStatusError.notFound("User not found")
    await user.destroy()
    return user
}

module.exports.editUser = async ({userId, username, password}) => {
    const user = await User.findByPk(userId)
    if(!user) throw HttpStatusError.notFound("User not found")

    const updateData = {username}
    if(password) updateData.password = await hashPassword(10, password)
    await user.update(updateData)
    return user
}