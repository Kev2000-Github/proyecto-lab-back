const { Router } = require('express')
const { groupRouter } = require('./group/group.route')
const { itemRouter } = require('./item/item.route')
const { userRouter } = require('./user/user.route')
const { subsidiaryRouter } = require('./subsidiary/subsidiary.route')

const router = Router()

router.use('/group', groupRouter)
router.use('/item', itemRouter)
router.use('/user', userRouter)
router.use('/subsidiary', subsidiaryRouter)

module.exports = {
    router
}