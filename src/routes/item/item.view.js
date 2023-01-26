const { controllerWrapper } = require('../../utils/common')
const controller = require('./item.controller')
const {groupResponse} = require('../group/group.view')

const responseData = (item) => {
    const isSubsidiaryOptionActive = item.Subsidiaries && item.Subsidiaries.length > 0
    const quantity = isSubsidiaryOptionActive ? item.Subsidiaries[0]?.ItemSubsidiary?.quantity : null
    return {
        data: {
            id: item.id,
            code: item.code,
            name: item.name,
            description: item.description,
            photo: item.photo,
            quantity
        }
    }
}
module.exports.itemResponse = responseData

module.exports.get_item = controllerWrapper(async (req, res) => {
    const {groups} = req.query
    const subsidiaryId = req.user?.Subsidiary?.id
    const filters = { 
        groups: groups ? groups.split(",") : [],
        subsidiaryId
    }
    const items = await controller.getAllItems(filters)
    const data = items.map(item => {
        return responseData(item).data
    })
    res.json({data})
})

module.exports.get_item_item_id = controllerWrapper(async (req, res) => {
    const {itemId} = req.params
    const subsidiaryId = req.user?.Subsidiary?.id
    const item = await controller.getItem({itemId, subsidiaryId})
    res.json(responseData(item))
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

module.exports.post_item_subsidiary = controllerWrapper(async (req, res) => {
    const {itemId} = req.params
    const { quantity } = req.body
    const subsidiaryId = req.user?.Subsidiary?.id
    //TODO: validate that user subsidiary matches subsidiaryId
    const item = await controller.addItemSubsidiary({itemId, subsidiaryId, quantity})
    res.json(responseData(item))
})