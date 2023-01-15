const { Item, Group, sequelize } = require('../../database/models')
const { Op } = require('sequelize')
const uuid = require('uuid')
const { HttpStatusError } = require('../../errors/httpStatusError')

module.exports.getAllItems = async ({groups}) => {
    let options = {}
    if(groups.length){
        options = {
            include: {
                model: Group,
                where: {
                    id: {
                        [Op.in]: groups
                    }
                }
            }
        }
    }
    const items = await Item.findAll(options)
    return items
}

module.exports.createItem = async ({name, description, photo}) => {
    const inputData = {
        name,
        description,
        photo,
        id: uuid.v4()
    }
    const item = await Item.create(inputData)
    return item
}

module.exports.deleteItem = async ({itemId}) => {
    const item = await Item.findByPk(itemId)
    if(!item) throw HttpStatusError.notFound("Item not found")
    await item.destroy()
    return item
}

module.exports.editItem = async ({itemId, itemData}) => {
    const inputData = {
        name: itemData.name,
        description: itemData.description,
        photo: itemData.photo
    }
    const item = await Item.findByPk(itemId)
    if(!item) throw HttpStatusError.notFound("Item not found")
    await item.update(inputData)
    return item
}

module.exports.addItemToGroup = async ({itemId, groupId}) => {
    const item = await Item.findByPk(itemId)
    if(!item) throw HttpStatusError.notFound("Item not found")
    const group = await Group.findByPk(groupId)
    if(!group) throw HttpStatusError.notFound("Group not found")
    const itemGroup = await Item.findOne({
        where: {id: itemId},
        include: {
            model: Group,
            where: {id: groupId}
        }
    })
    if(itemGroup) throw HttpStatusError.conflict("This item is already registered")
    await item.addGroup(groupId)
    return {item, group}
}

module.exports.removeItemToGroup = async ({itemId, groupId}) => {
    const item = await Item.findByPk(itemId)
    if(!item) throw HttpStatusError.notFound("Item not found")
    const group = await Group.findByPk(groupId)
    if(!group) throw HttpStatusError.notFound("Group not found")
    const itemGroup = await Item.findOne({
        where: {id: itemId},
        include: {
            model: Group,
            where: {id: groupId}
        }
    })
    if(!itemGroup) throw HttpStatusError.conflict("This item is not in this group")
    await item.removeGroup(groupId)
    return {item, group}
}

module.exports.getItem = async ({itemId}) => {
    const item = await Item.findByPk(itemId)
    if(!item) throw HttpStatusError.notFound("Item not found")
    return item
}