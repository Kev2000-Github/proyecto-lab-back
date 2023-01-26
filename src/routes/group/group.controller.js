const { Group, sequelize } = require('../../database/models')
const uuid = require('uuid')
const { HttpStatusError } = require('../../errors/httpStatusError')

module.exports.getAllGroups = async ({limit=10, offset=0}) => {
    const groups = await Group.findAndCountAll({limit, offset})
    const totalPages = Math.ceil(groups.count/limit)
    groups.totalPages = totalPages
    return groups
}

module.exports.getGroup = async ({groupId}) => {
    const group = await Group.findByPk(groupId)
    if(!group) throw HttpStatusError.notFound("Group not found")
    return group
}

module.exports.createGroup = async ({name}) => {
    const group = await Group.create({name, id: uuid.v4()})
    return group
}

module.exports.deleteGroup = async ({groupId}) => {
    const group = await Group.findByPk(groupId)
    if(!group) throw HttpStatusError.notFound("Group not found")
    await group.destroy()
    return group
}

module.exports.editGroup = async ({groupId, name}) => {
    const group = await Group.findByPk(groupId)
    if(!group) throw HttpStatusError.notFound("Group not found")
    await group.update({ name })
    return group
}