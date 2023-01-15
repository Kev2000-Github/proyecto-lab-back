const { controllerWrapper } = require('../../utils/common')
const controller = require('./item.controller')
const {groupResponse} = require('../group/group.view')

const responseData = (item) => ({
    data: {
        id: item.id,
        name: item.name,
        description: item.description,
        photo: item.photo
    }
})
module.exports.itemResponse = responseData

module.exports.get_item = controllerWrapper(async (req, res) => {
    const {groups} = req.query
    const filters = {
        groups: groups ? groups.split(",") : []
    }
    const items = await controller.getAllItems(filters)
    const data = items.map(item => {
        return responseData(item).data
    })
    res.json({data})
})

module.exports.post_item = controllerWrapper(async (req, res) => {
    const itemData = req.body
    const item = await controller.createItem(itemData)
    res.json(responseData(item))
})

module.exports.delete_item = controllerWrapper(async (req, res) => {
    const {itemId} = req.params
    const item = await controller.deleteItem({itemId})
    res.json(responseData(item))
})

module.exports.put_item = controllerWrapper(async (req, res) => {
    const {itemId} = req.params
    const itemData = req.body
    const item = await controller.editItem({itemId, itemData})
    res.json(responseData(item))
})

module.exports.post_item_group = controllerWrapper(async (req, res) => {
    const {itemId, groupId} = req.params
    const itemGroup = await controller.addItemToGroup({itemId, groupId})
    const data = {
        item: responseData(itemGroup.item).data,
        group: groupResponse(itemGroup.group).data
    }
    res.json({data})
})

module.exports.delete_item_group = controllerWrapper(async (req, res) => {
    const {itemId, groupId} = req.params
    const itemGroup = await controller.removeItemToGroup({itemId, groupId})
    const data = {
        item: responseData(itemGroup.item).data,
        group: groupResponse(itemGroup.group).data
    }
    res.json({data})
})