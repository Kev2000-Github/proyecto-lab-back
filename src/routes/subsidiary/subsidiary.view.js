const { controllerWrapper } = require('../../utils/common')
const controller = require('./subsidiary.controller')

const responseData = (subsidiary) => ({
    data: {
        id: subsidiary.id,
        name: subsidiary.name
    }
})
module.exports.subsidiaryResponse = responseData

module.exports.get_subsidiary = controllerWrapper(async (req, res) => {
    const pagination = req.pagination
    const subsidiary = await controller.getAllSubsidiary(pagination)
    const data = subsidiary.rows.map(subsidiary => {
        return responseData(subsidiary).data
    })
    res.json({
        data,
        size: subsidiary.rows.length,
        page: pagination?.page,
        totalPages: subsidiary.totalPages,
        count: subsidiary.count
    })
})

module.exports.get_subsidiary_subsidiary_id = controllerWrapper(async (req, res) => {
    const {subsidiaryId} = req.params
    const subsidiary = await controller.getSubsidiary({subsidiaryId})
    res.json(responseData(subsidiary))
})

module.exports.post_subsidiary = controllerWrapper(async (req, res) => {
    const {name} = req.body
    const subsidiary = await controller.createSubsidiary({name})
    res.json(responseData(subsidiary))
})

module.exports.delete_subsidiary = controllerWrapper(async (req, res) => {
    const {subsidiaryId} = req.params
    const subsidiary = await controller.deleteSubsidiary({subsidiaryId})
    res.json(responseData(subsidiary))
})

module.exports.put_subsidiary = controllerWrapper(async (req, res) => {
    const {subsidiaryId} = req.params
    const {name} = req.body
    const subsidiary = await controller.editSubsidiary({subsidiaryId, name})
    res.json(responseData(subsidiary))
})

module.exports.get_subsidiary_item = controllerWrapper(async (req, res) => {
    const subsidiaryItems = await controller.getSubsidiaryItems()
    const data = subsidiaryItems.map(subsidiary => {
        return {
            id: subsidiary.id,
            name: subsidiary.name,
            Items: subsidiary.Items.map(item => {
                return {
                    id: item.id,
                    name: item.name,
                    quantity: item?.ItemSubsidiary?.quantity
                }
            })
        }
    })
    res.json({
        data
    })
})