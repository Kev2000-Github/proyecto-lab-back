const {Router} = require('express')
const router = Router()
const { resolve } = require('path')
const view = require('./session.view')
const {validateRequestSchema, validateResponseSchema} = require('../../middlewares')
const { firstLogin } = require('../../middlewares/firstLogin.middleware')

router.post(
    '/login', 
    validateRequestSchema(require(resolve(__dirname, 'schemas', 'in', 'session.in-post-session-login.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schemas', 'out', 'session.out-post-session-login.schema.js'))),
    firstLogin,
    view.post_session_login
    )

router.delete(
    '/:sessionId', 
    validateRequestSchema(require(resolve(__dirname, 'schemas', 'in', 'session.in-delete-session-logout.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schemas', 'out', 'session.out-delete-session-logout.schema.js'))),
    view.delete_session_loguot
    )

module.exports = {
    sessionRouter: router
}