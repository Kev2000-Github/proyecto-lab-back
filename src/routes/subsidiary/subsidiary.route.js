const {router} = require ('express')
const router = Router();
const {resolve} = require ('path')
const view = require ('./subsidiary.view')
const {validateRequestSchema, validateResponseSchema} = require('../../middlewares')

router.get(
    '/',
    validateRequestSchema (require(resolve(__dirname,'schemas', 'in', 'subsidiary.in-get-subsidiary.schema.js'))),
    validateResponseSchema (require(resolve(__dirname,'schemas', 'out', 'subsidiary.out-get-subsidiary.schema.js' ))),
    view.get_subsidiary
)

router.get(
    '/:subsidiaryId',
    validateRequestSchema (require(resolve(__dirname,'schemas', 'in', 'subsidiary.in-get-subsidiary-subsidiary-id.schema.js'))),
    validateResponseSchema (require(resolve(__dirname,'schemas', 'out', 'subsidiary.out-get-subsidiary-subsidiary-id.schema.js' ))),
    view.get_subsidiary_subsidiary_id
)

router.delete(
    '/',
    validateRequestSchema (require(resolve(__dirname,'schemas', 'in', 'subsidiary.in-delete-subsidiary.schema.js'))),
    validateResponseSchema (require(resolve(__dirname,'schemas', 'out', 'subsidiary.out-delete-subsidiary.schema.js' ))),
    view.delete_subsidiary
)

router.put(
    '/',
    validateRequestSchema (require(resolve(__dirname,'schemas', 'in', 'subsidiary.in-put-subsidiary.schema.js'))),
    validateResponseSchema (require(resolve(__dirname,'schemas', 'out', 'subsidiary.out-put-subsidiary.schema.js' ))),
    view.put_subsidiary
)

router.post(
    '/',
    validateRequestSchema (require(resolve(__dirname,'schemas', 'in', 'subsidiary.in-post-subsidiary.schema.js'))),
    validateResponseSchema (require(resolve(__dirname,'schemas', 'out', 'subsidiary.out-post-subsidiary.schema.js' ))),
    view.post_subsidiary
)