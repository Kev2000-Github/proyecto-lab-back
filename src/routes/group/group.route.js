const {Router} = require('express')
const router = Router()
const { resolve } = require('path')
const view = require('./group.view')
const {validateRequestSchema, validateResponseSchema} = require('../../middlewares')
const { verifyUser } = require('../../middlewares/verifyUser.middleware')
const { checkRol } = require('../../middlewares/checkRol.middleware')
const { ROLES } = require('../../database/constants')

router.get(
    '/', 
    validateRequestSchema(require(resolve(__dirname, 'schemas', 'in', 'group.in-get-group.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schemas', 'out', 'group.out-get-group.schema.js'))),
    verifyUser(),
    checkRol(),
    view.get_group
    )

router.get(
    '/:groupId', 
    validateRequestSchema(require(resolve(__dirname, 'schemas', 'in', 'group.in-get-group-group-id.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schemas', 'out', 'group.out-get-group-group-id.schema.js'))),
    verifyUser(),
    checkRol(),
    view.get_group_group_id
    )

router.post(
    '/', 
    validateRequestSchema(require(resolve(__dirname, 'schemas', 'in', 'group.in-post-group.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schemas', 'out', 'group.out-post-group.schema.js'))),
    verifyUser(),
    checkRol([ROLES.ADMIN]),
    view.post_group
    )

router.put(
    '/:groupId', 
    validateRequestSchema(require(resolve(__dirname, 'schemas', 'in', 'group.in-put-group.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schemas', 'out', 'group.out-put-group.schema.js'))),
    verifyUser(),
    checkRol([ROLES.ADMIN]),
    view.put_group
    )

router.delete(
    '/:groupId', 
    validateRequestSchema(require(resolve(__dirname, 'schemas', 'in', 'group.in-delete-group.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schemas', 'out', 'group.out-delete-group.schema.js'))),
    verifyUser(),
    checkRol([ROLES.ADMIN]),
    view.delete_group
    )

module.exports = {
    groupRouter: router
}