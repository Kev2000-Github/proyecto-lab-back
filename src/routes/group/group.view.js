const { controllerWrapper } = require('../../utils/common')
const controller = require('./group.controller')

const responseData = (group) => ({
    data: {
        id: group.id,
        name: group.name
    }
})
module.exports.groupResponse = responseData

module.exports.get_group = controllerWrapper(async (req, res) => {
    const pagination = req.pagination
    const groups = await controller.getAllGroups(pagination)
    const data = groups.rows.map(group => {
        return responseData(group).data
    })
    res.json({
        data,
        size: groups.rows.length,
        page: pagination?.page,
        totalPages: groups.totalPages,
        count: groups.count
    })
})

module.exports.get_group_group_id = controllerWrapper(async (req, res) => {
    const {groupId} = req.params
    const group = await controller.getGroup({groupId})
    res.json(responseData(group))
})

module.exports.post_group = controllerWrapper(async (req, res) => {
    const {name} = req.body
    const group = await controller.createGroup({name})
    res.json(responseData(group))
})

module.exports.delete_group = controllerWrapper(async (req, res) => {
    const {groupId} = req.params
    const group = await controller.deleteGroup({groupId})
    res.json(responseData(group))
})

module.exports.put_group = controllerWrapper(async (req, res) => {
    const {groupId} = req.params
    const {name} = req.body
    const group = await controller.editGroup({groupId, name})
    res.json(responseData(group))
})