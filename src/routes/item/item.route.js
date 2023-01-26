const {Router} = require('express')
const router = Router()
const { resolve } = require('path')
const view = require('./item.view')
const {validateRequestSchema, validateResponseSchema} = require('../../middlewares')
const { verifyUser } = require('../../middlewares/verifyUser.middleware')
const { checkRol } = require('../../middlewares/checkRol.middleware')
const { ROLES } = require('../../database/constants')

router.get(
    '/', 
    validateRequestSchema(require(resolve(__dirname, 'schemas', 'in', 'item.in-get-item.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schemas', 'out', 'item.out-get-item.schema.js'))),
    verifyUser(),
    checkRol(),
    view.get_item
    )

router.post(
    '/', 
    validateRequestSchema(require(resolve(__dirname, 'schemas', 'in', 'item.in-post-item.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schemas', 'out', 'item.out-post-item.schema.js'))),
    verifyUser(),
    checkRol([ROLES.ADMIN]),
    view.post_item
    )

router.get(
    '/:itemId', 
    validateRequestSchema(require(resolve(__dirname, 'schemas', 'in', 'item.in-get-item-item-id.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schemas', 'out', 'item.out-get-item-item-id.schema.js'))),
    verifyUser(),
    checkRol(),
    view.get_item_item_id
    )

router.put(
    '/:itemId', 
    validateRequestSchema(require(resolve(__dirname, 'schemas', 'in', 'item.in-put-item.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schemas', 'out', 'item.out-put-item.schema.js'))),
    verifyUser(),
    checkRol([ROLES.ADMIN]),
    view.put_item
    )

router.delete(
    '/:itemId', 
    validateRequestSchema(require(resolve(__dirname, 'schemas', 'in', 'item.in-delete-item.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schemas', 'out', 'item.out-delete-item.schema.js'))),
    verifyUser(),
    checkRol([ROLES.ADMIN]),
    view.delete_item
    )

router.post(
    '/:itemId/:groupId', 
    validateRequestSchema(require(resolve(__dirname, 'schemas', 'in', 'item.in-post-item-group.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schemas', 'out', 'item.out-post-item-group.schema.js'))),
    verifyUser(),
    checkRol([ROLES.ADMIN]),
    view.post_item_group
    )

router.delete(
    '/:itemId/:groupId', 
    validateRequestSchema(require(resolve(__dirname, 'schemas', 'in', 'item.in-delete-item-group.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schemas', 'out', 'item.out-delete-item-group.schema.js'))),
    verifyUser(),
    checkRol([ROLES.ADMIN]),
    view.delete_item_group
    )

router.post(
    '/subsidiary/:itemId/:subsidiaryId', 
    validateRequestSchema(require(resolve(__dirname, 'schemas', 'in', 'item.in-post-item-subsidiary.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schemas', 'out', 'item.out-post-item-subsidiary.schema.js'))),
    verifyUser(),
    checkRol(),
    view.post_item_subsidiary
    )

module.exports = {
    itemRouter: router
}