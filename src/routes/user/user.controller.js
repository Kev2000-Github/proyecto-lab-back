const { Group, sequelize } = require('../../database/models')
const uuid = require('uuid')
const { HttpStatusError } = require('../../errors/httpStatusError')

module.exports.getAllGroups = async () => {
    const groups = await User.findAll()
    return groups
}

module.exports.getGroup = async ({groupId}) => {
    const group = await User.findByPk(groupId)
    if(!group) throw HttpStatusError.notFound("Group not found")
    return group
}