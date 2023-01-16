const {Subsidiary , sequelize}= require('../../database/models')
const uuid = require ('uuid')
const { HttpStatusError } = require ('../../errors/httpStatusError')

module.exports.getAllsubsidiary = async () => {
    const subsidiary = await Subsidiary.findAll()
    return subsidiary
}

module.exports.getsubsidiary = async ({subsidiaryId}) => {
    const subsidiary = await Subsidiary.findByPk(subsidiaryId)
    if(!subsidiary) throw HttpStatusError.notFound ("subsidiary not found")
    return subsidiary
}

module.exports.createsubsidiary = async ({name}) => {
    const subsidiary = await Subsidiary.create({name, id: uuid.v4()})
    return subsidiary
}

module.exports.deletesubsidiary = async ({subsidiaryId}) => {
    const subsidiary = await Subsidiary.findByPk(subsidiaryId)
    if(!subsidiary) throw HttpStatusError.notFound ("subsidiary not found")
    await subsidiary.destroy()
    return subsidiary
}

module.exports.editsubsidiary = async ({subsidiaryId, name}) => {
    const subsidiary = await Subsidiary.findByPk(subsidiaryId)
    if(!subsidiary) throw HttpStatusError.notFound ("subsidiary not found")
    await subsidiary.update({name})
    return subsidiary
}