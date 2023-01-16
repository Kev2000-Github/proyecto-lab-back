const {Router} = require('express')
const router = Router()
const { resolve } = require('path')
const view = require('./user.view')
const {validateRequestSchema, validateResponseSchema} = require('../../middlewares')

router.get(
    '/', 
    validateRequestSchema(require(resolve(__dirname, 'schemas', 'in', 'user.in-get-user.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schemas', 'out', 'user.out-get-user.schema.js'))),
    view.get_user
    )

router.get(
    '/:userId', 
    validateRequestSchema(require(resolve(__dirname, 'schemas', 'in', 'user.in-get-user-user-id.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schemas', 'out', 'user.out-get-user-user-id.schema.js'))),
    view.get_user_user_id
    )

    module.exports = {
        userRouter: router
    }