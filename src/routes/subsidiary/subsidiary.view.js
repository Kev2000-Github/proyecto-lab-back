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
    const subsidiary = await controller.getAllSubsidiary()
    const data = subsidiary.map(subsidiary => {
        return responseData(subsidiary).data
    })
    res.json({data})
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