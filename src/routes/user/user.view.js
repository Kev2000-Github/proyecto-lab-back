const { controllerWrapper } = require('../../utils/common')
const controller = require('./user.controller')

const responseData = (user) => ({
    data: {
        id: user.id,
        name: user.name
    }
})
module.exports.userResponse = responseData

module.exports.get_user = controllerWrapper(async (req, res) => {
    const users = await controller.getAllusers()
    const data = users.map(user => {
        return responseData(user).data
    })
    res.json({data})
})

module.exports.get_user_user_id = controllerWrapper(async (req, res) => {
    const {userId} = req.params
    const user = await controller.getuser({userId})
    res.json(responseData(user))
})