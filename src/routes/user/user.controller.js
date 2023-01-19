const { User, Agent, Subsidiary, sequelize } = require('../../database/models')
const uuid = require('uuid')
const { HttpStatusError } = require('../../errors/httpStatusError')
const { ROLES } = require('../../database/constants')

const includeOpts = {include: { model: Agent, include: Subsidiary }}

module.exports.getAllUsers = async () => {
    const users = await User.findAll(includeOpts)
    return users
}

module.exports.getUser = async ({userId}) => {
    const user = await User.findByPk(userId, includeOpts)
    if(!user) throw HttpStatusError.notFound("User not found")
    return user
}

module.exports.createUser = async ({username, password, subsidiaryId}) => {
    return sequelize.transaction(async transaction => {
        const user = await User.create({username, password, id: uuid.v4()}, {transaction})
        const agent = await Agent.create({ id: uuid.v4(), userId: user.id, subsidiaryId}, {transaction})
        const subsidiary = await Subsidiary.findByPk(agent.subsidiaryId)
        agent.Subsidiary = subsidiary
        user.Agent = agent
        return user
    })
}

module.exports.deleteUser = async ({userId}) => {
    const user = await User.findByPk(userId, includeOpts)
    if(!user) throw HttpStatusError.notFound("User not found")
    await user.destroy()
    return user
}

module.exports.editUser = async ({userId, username, password, subsidiaryId}) => {
    return sequelize.transaction(async transaction => {
        const user = await User.findByPk(userId, includeOpts)
        if(!user) throw HttpStatusError.notFound("User not found")
        await user.update({username, password}, {transaction})

        if(user.role === ROLES.AGENT && subsidiaryId){
            const agent = await Agent.findByPk(user.Agent.id)
            if(!agent) throw HttpStatusError.notFound("Fatal: This user has no agent info")
            await agent.update({subsidiaryId}, {transaction})
            const subsidiary = await Subsidiary.findByPk(agent.subsidiaryId)
            agent.Subsidiary = subsidiary
            user.Agent = agent
        }
        return user
    })
}