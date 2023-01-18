const { controllerWrapper } = require('../../utils/common')
const controller = require('./user.controller')

const responseData = (user) => ({
    data: {
        id: user.id,
        password: user.password,
        username: user.username,
        role: user.role
    }
})
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
    const {username, password, role} = req.body

    const user = await controller.createUser({username, password,role})
    res.json(responseData(user))
})

module.exports.delete_user = controllerWrapper(async (req, res) => {
    const {userId} = req.params
    const user = await controller.deleteUser({userId})
    res.json(responseData(user))
})

module.exports.put_user = controllerWrapper(async (req, res) => {
    const {userId} = req.params
    const {name} = req.body
    const user = await controller.editUser({userId, name})
    res.json(responseData(user))
})