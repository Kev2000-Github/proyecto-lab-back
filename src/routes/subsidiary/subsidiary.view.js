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
    const subsidiarys = await controller.getAllsubsidiarys()
    const data = subsidiarys.map(subsidiary => {
        return responseData(subsidiary).data
    })
    res.json({data})
})

module.exports.get_subsidiary_subsidiary_id = controllerWrapper(async (req, res) => {
    const {subsidiaryId} = req.params
    const subsidiary = await controller.getsubsidiary({subsidiaryId})
    res.json(responseData(subsidiary))
})

module.exports.post_subsidiary = controllerWrapper(async (req, res) => {
    const {name} = req.body
    const subsidiary = await controller.createsubsidiary({name})
    res.json(responseData(subsidiary))
})

module.exports.delete_subsidiary = controllerWrapper(async (req, res) => {
    const {subsidiaryId} = req.params
    const subsidiary = await controller.deletesubsidiary({subsidiaryId})
    res.json(responseData(subsidiary))
})

module.exports.put_subsidiary = controllerWrapper(async (req, res) => {
    const {subsidiaryId} = req.params
    const {name} = req.body
    const subsidiary = await controller.editsubsidiary({subsidiaryId, name})
    res.json(responseData(subsidiary))
})