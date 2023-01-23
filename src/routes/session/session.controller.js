const { User, Session, Agent, Subsidiary, sequelize } = require('../../database/models')
const uuid = require('uuid')
const { HttpStatusError } = require('../../errors/httpStatusError')
const { hashPassword , verifyPassword } = require('../../utils/common')

const includeOpts = {include: { model: Agent, include: Subsidiary }}

module.exports.login = async ({username, password}) =>{
    // ... Validacion del usuario
    const user = await User.findOne({where:{username: username}} , includeOpts)
    if(!user) throw HttpStatusError.notFound("User not found")
    // ... Validacion de la contraseña
    const passwordValidated = await verifyPassword(password, user.password)
    if(!passwordValidated) throw HttpStatusError.forbidden("Password is incorret")

    const session = await Session.create({id: uuid.v4() , userId: user.id});

    return {user, session}
}

module.exports.logout = async ({sessionId}) =>{
    const session = await Session.findByPk(sessionId)
    if(!session) throw HttpStatusError.notFound("Session not found")

    const user = await User.findByPk(session.userId)
    if(!user) throw HttpStatusError.notFound("User not found")

    await session.destroy()

    return {user , session}
}