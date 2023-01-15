const {Router} = require('express')
const router = Router()
const { resolve } = require('path')
const view = require('./group.view')
const {validateRequestSchema, validateResponseSchema} = require('../../middlewares')

router.get(
    '/', 
    validateRequestSchema(require(resolve(__dirname, 'schemas', 'in', 'group.in-get-group.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schemas', 'out', 'group.out-get-group.schema.js'))),
    view.get_group
    )

router.get(
    '/:groupId', 
    validateRequestSchema(require(resolve(__dirname, 'schemas', 'in', 'group.in-get-group-group-id.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schemas', 'out', 'group.out-get-group-group-id.schema.js'))),
    view.get_group_group_id
    )

router.post(
    '/', 
    validateRequestSchema(require(resolve(__dirname, 'schemas', 'in', 'group.in-post-group.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schemas', 'out', 'group.out-post-group.schema.js'))),
    view.post_group
    )

router.put(
    '/:groupId', 
    validateRequestSchema(require(resolve(__dirname, 'schemas', 'in', 'group.in-put-group.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schemas', 'out', 'group.out-put-group.schema.js'))),
    view.put_group
    )

router.delete(
    '/:groupId', 
    validateRequestSchema(require(resolve(__dirname, 'schemas', 'in', 'group.in-delete-group.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schemas', 'out', 'group.out-delete-group.schema.js'))),
    view.delete_group
    )

module.exports = {
    groupRouter: router
}