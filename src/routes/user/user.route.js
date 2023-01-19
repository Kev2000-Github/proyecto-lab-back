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

router.post(
    '/', 
    validateRequestSchema(require(resolve(__dirname, 'schemas', 'in', 'user.in-post-user.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schemas', 'out', 'user.out-post-user.schema.js'))),
    view.post_user
    )

router.put(
    '/:userId', 
    validateRequestSchema(require(resolve(__dirname, 'schemas', 'in', 'user.in-put-user.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schemas', 'out', 'user.out-put-user.schema.js'))),
    view.put_user
    )

router.delete(
    '/:userId', 
    validateRequestSchema(require(resolve(__dirname, 'schemas', 'in', 'user.in-delete-user.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schemas', 'out', 'user.out-delete-user.schema.js'))),
    view.delete_user
    )

module.exports = {
    userRouter: router
}