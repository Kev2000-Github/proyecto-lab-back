const { Item, Group, Subsidiary, ItemSubsidiary, sequelize } = require('../../database/models')
const { Op } = require('sequelize')
const uuid = require('uuid')
const { HttpStatusError } = require('../../errors/httpStatusError')

const getSubsidiaryOption = (subsidiaryId) => ({
    model: Subsidiary,
    where: {id: subsidiaryId},
    through: { attributes: ['quantity']}
})

const getNewItemOption = (subsidiaryId) => ({
    model: Subsidiary,
    where: {id: subsidiaryId},
    attributes: [],
    through: {attributes: []}
})

module.exports.getAllItems = async ({groups, subsidiaryId, newItem}, {limit = 10, offset = 0}) => {
    let options = { include: [], limit, offset }
    if(groups.length){
        options.include.push({
            model: Group,
            where: { id: { [Op.in]: groups } }
        })
    }
    if(subsidiaryId){
        if(newItem) {
            const excludeItems = (await Item.findAll({
                include: getNewItemOption(subsidiaryId),
                attributes: ['id'],
                raw: true
            })).map(item => item.id)
            options.where = {id: {[Op.notIn]: excludeItems}}
        }
        else options.include.push(getSubsidiaryOption(subsidiaryId))
    }
    const items = await Item.findAndCountAll(options)
    const totalPages = Math.ceil(items.count/limit)
    items.totalPages = totalPages
    return items
}

module.exports.getItem = async ({itemId, subsidiaryId, withgroup}) => {
    const options = {include: []}
    if(subsidiaryId) options.include.push(getSubsidiaryOption(subsidiaryId))
    if(withgroup === "true") options.include.push({model: Group})
    const item = await Item.findByPk(itemId, options)
    if(!item) throw HttpStatusError.notFound("Item not found")
    return item
}

module.exports.createItem = async ({name, description, photo, code, groups}) => {
    const inputData = {
        name,
        description,
        photo,
        code,
        id: uuid.v4()
    }
    const item = await Item.create(inputData)
    for(const group of groups){
      await item.addGroup(group)
    }
    return item
}

module.exports.deleteItem = async ({itemId}) => {
    const item = await Item.findByPk(itemId)
    if(!item) throw HttpStatusError.notFound("Item not found")
    
    const isItemActive = await ItemSubsidiary.count({
        where: {
            itemId,
            quantity: {[Op.gt]: 0}
        }
    })
    if(isItemActive) throw HttpStatusError.conflict("This Item is still active")
    await item.destroy()
    return item
}

module.exports.editItem = async ({itemId, itemData}) => {
    const inputData = {
        name: itemData.name,
        description: itemData.description,
        photo: itemData.photo,
        code: itemData.code
    }
    const item = await Item.findByPk(itemId)
    if(!item) throw HttpStatusError.notFound("Item not found")
    await item.update(inputData)
    for(const group of itemData.groups){
      await item.addGroup(group)
    }
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

module.exports.addItemSubsidiary = async ({itemId, subsidiaryId, quantity}) => {
    const item = await Item.findByPk(itemId)
    if(!item) throw HttpStatusError.notFound("Item not found")
    const subsidiary = await Subsidiary.findByPk(subsidiaryId)
    if(!subsidiary) throw HttpStatusError.notFound("Subsidiary not found")
    let itemSubsidiary = await ItemSubsidiary.findOne({
        where: {itemId, subsidiaryId},
    })
    if(!itemSubsidiary) itemSubsidiary = ItemSubsidiary.create({itemId, subsidiaryId, quantity})
    else{
        itemSubsidiary.update({quantity})
    }
    return item
}