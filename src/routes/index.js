const { Router } = require('express')
const { groupRouter } = require('./group/group.route')
const { itemRouter } = require('./item/item.route')
const { userRouter } = require('./user/user.route')
const { subsidiaryRouter } = require('./subsidiary/subsidiary.route')
const { sessionRouter } = require('./session/session.route')

const router = Router()

router.use('/group', groupRouter)
router.use('/item', itemRouter)
router.use('/user', userRouter)
router.use('/subsidiary', subsidiaryRouter)
router.use('/session', sessionRouter)

module.exports = {
    router
}