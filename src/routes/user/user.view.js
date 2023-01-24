const { controllerWrapper } = require('../../utils/common')
const controller = require('./user.controller')

const responseData = (user) => {
    return {
        data: {
            id: user.id,
            username: user.username,
            role: user.role,
            Subsidiary: user.Subsidiary ? {
                name: user.Subsidiary?.name
            }: null
        }
    }
}
module.exports.userResponse = responseData

module.exports.get_user = controllerWrapper(async (req, res) => {
    const users = await controller.getAllUsers()
    const data = users.map(user => {
        return responseData(user).data
    })
    res.json({data})
})

module.exports.get_user_user_id = controllerWrapper(async (req, res) => {
    const {userId} = req.params
    const user = await controller.getUser({userId})
    res.json(responseData(user))
})

module.exports.post_user = controllerWrapper(async (req, res) => {
    const {username, password, subsidiaryId} = req.body
    const user = await controller.createUser({username, password, subsidiaryId})
    res.json(responseData(user))
})

module.exports.delete_user = controllerWrapper(async (req, res) => {
    const {userId} = req.params
    const user = await controller.deleteUser({userId})
    res.json(responseData(user))
})

module.exports.put_user = controllerWrapper(async (req, res) => {
    const {userId} = req.params
    const {username, password, subsidiaryId} = req.body
    const user = await controller.editUser({userId, username, password, subsidiaryId})
    res.json(responseData(user))
})