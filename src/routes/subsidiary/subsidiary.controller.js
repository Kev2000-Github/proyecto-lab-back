const {Subsidiary , sequelize}= require('../../database/models')
const uuid = require ('uuid')
const { HttpStatusError } = require ('../../errors/httpStatusError')

module.exports.getAllSubsidiary = async ({limit=10,offset=0}) => {
    const subsidiary = await Subsidiary.findAndCountAll({limit, offset})
    const totalPages = Math.ceil(subsidiary.count/limit)
    subsidiary.totalPages = totalPages
    return subsidiary
}

module.exports.getSubsidiary = async ({subsidiaryId}) => {
    const subsidiary = await Subsidiary.findByPk(subsidiaryId)
    if(!subsidiary) throw HttpStatusError.notFound ("subsidiary not found")
    return subsidiary
}

module.exports.createSubsidiary = async ({name}) => {
    const subsidiary = await Subsidiary.create({name, id: uuid.v4()})
    return subsidiary
}

module.exports.deleteSubsidiary = async ({subsidiaryId}) => {
    const subsidiary = await Subsidiary.findByPk(subsidiaryId)
    if(!subsidiary) throw HttpStatusError.notFound ("subsidiary not found")
    await subsidiary.destroy()
    return subsidiary
}

module.exports.editSubsidiary = async ({subsidiaryId, name}) => {
    const subsidiary = await Subsidiary.findByPk(subsidiaryId)
    if(!subsidiary) throw HttpStatusError.notFound ("subsidiary not found")
    await subsidiary.update({name})
    return subsidiary
}