const {Router} = require ('express')
const router = Router();
const {resolve} = require ('path')
const view = require ('./subsidiary.view')
const {validateRequestSchema, validateResponseSchema} = require('../../middlewares');
const { verifyUser } = require('../../middlewares/verifyUser.middleware');
const { checkRol } = require('../../middlewares/checkRol.middleware');
const { ROLES } = require('../../database/constants');
const { paginationConfig } = require('../../middlewares/paginationConfig');

router.get(
    '/',
    validateRequestSchema (require(resolve(__dirname,'schemas', 'in', 'subsidiary.in-get-subsidiary.schema.js'))),
    validateResponseSchema (require(resolve(__dirname,'schemas', 'out', 'subsidiary.out-get-subsidiary.schema.js' ))),
    verifyUser(),
    checkRol(),
    paginationConfig,
    view.get_subsidiary
)

router.get(
    '/item', 
    validateRequestSchema(require(resolve(__dirname, 'schemas', 'in', 'subsidiary.in-get-subsidiary-item.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schemas', 'out', 'subsidiary.out-get-subsidiary-item.schema.js'))),
    verifyUser(),
    checkRol([ROLES.ADMIN]),
    view.get_subsidiary_item
    )

router.get(
    '/:subsidiaryId',
    validateRequestSchema (require(resolve(__dirname,'schemas', 'in', 'subsidiary.in-get-subsidiary-subsidiary-id.schema.js'))),
    validateResponseSchema (require(resolve(__dirname,'schemas', 'out', 'subsidiary.out-get-subsidiary-subsidiary-id.schema.js' ))),
    verifyUser(),
    checkRol(),
    view.get_subsidiary_subsidiary_id
)

router.delete(
    '/:subsidiaryId',
    validateRequestSchema (require(resolve(__dirname,'schemas', 'in', 'subsidiary.in-delete-subsidiary.schema.js'))),
    validateResponseSchema (require(resolve(__dirname,'schemas', 'out', 'subsidiary.out-delete-subsidiary.schema.js' ))),
    verifyUser(),
    checkRol([ROLES.ADMIN]),
    view.delete_subsidiary
)

router.put(
    '/:subsidiaryId',
    validateRequestSchema (require(resolve(__dirname,'schemas', 'in', 'subsidiary.in-put-subsidiary.schema.js'))),
    validateResponseSchema (require(resolve(__dirname,'schemas', 'out', 'subsidiary.out-put-subsidiary.schema.js' ))),
    verifyUser(),
    checkRol([ROLES.ADMIN]),
    view.put_subsidiary
)

router.post(
    '/',
    validateRequestSchema (require(resolve(__dirname,'schemas', 'in', 'subsidiary.in-post-subsidiary.schema.js'))),
    validateResponseSchema (require(resolve(__dirname,'schemas', 'out', 'subsidiary.out-post-subsidiary.schema.js' ))),
    verifyUser(),
    checkRol([ROLES.ADMIN]),
    view.post_subsidiary
)

module.exports = {
    subsidiaryRouter: router
}