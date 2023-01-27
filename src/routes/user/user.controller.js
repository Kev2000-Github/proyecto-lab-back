const { User, Subsidiary, sequelize } = require('../../database/models')
const uuid = require('uuid')
const { HttpStatusError } = require('../../errors/httpStatusError')
const { ROLES } = require('../../database/constants')

const includeOpts = {include: Subsidiary}

module.exports.getAllUsers = async ({limit=10,offset=0}) => {
    const opts = {...includeOpts, limit, offset}
    const users = await User.findAndCountAll(opts)
    const totalPages = Math.ceil(users.count/limit)
    users.totalPages = totalPages
    return users
}

module.exports.getUser = async ({userId}) => {
    const user = await User.findByPk(userId, includeOpts)
    if(!user) throw HttpStatusError.notFound("User not found")
    return user
}

module.exports.createUser = async ({username, password, subsidiaryId}) => {
    return sequelize.transaction(async transaction => {
        const subsidiary = await Subsidiary.findByPk(subsidiaryId)
        if(!subsidiary) throw HttpStatusError.notFound("Subsidiary not found")
        const user = await User.create({username, password, subsidiaryId, id: uuid.v4()}, {transaction})
        return user
    })
}

module.exports.deleteUser = async ({userId}) => {
    const user = await User.findByPk(userId, includeOpts)
    if(!user) throw HttpStatusError.notFound("User not found")
    if(user.rol === ROLES.ADMIN) throw HttpStatusError.forbidden("Admin cannot be deleted")
    await user.destroy()
    return user
}

module.exports.editUser = async ({userId, username, password, subsidiaryId}) => {
    return sequelize.transaction(async transaction => {
        const user = await User.findByPk(userId, includeOpts)
        if(!user) throw HttpStatusError.notFound("User not found")
        await user.update({username, password, subsidiaryId}, {transaction})
        return user
    })
}