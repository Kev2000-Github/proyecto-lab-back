const { controllerWrapper } = require('../../utils/common')
const controller = require('./session.controller')

const responseData = ({session, user}) => {
    return {
        user: {
            id: user.id,
            username: user.username,
            role: user.role,
            Subsidiary: user.Subsidiary ? {
                name: user.Subsidiary?.name
            }: null
        },
        session: {
            id: session.id,
        }
    }
}
module.exports.userResponse = responseData



module.exports.post_session_login = controllerWrapper(async (req, res)=> {
    const {username, password} = req.body
    const login = await controller.login({username, password})
    res.json(responseData(login))
})


module.exports.delete_session_loguot = controllerWrapper(async (req, res)=> {
    const {sessionId} = req.params
    const logout = await controller.logout({sessionId})
    res.json(responseData(logout))
})