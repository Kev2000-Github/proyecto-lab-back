const { ERROR_CODES } = require("./constants")
const {version} = require('../../package.json')
const errorHandler = (err, req, res, next) => {
    if(res.headersSent) {
        return next(err)
    }
    console.error(err)
    if(err.name === 'SequelizeDatabaseError'){
        res.status(ERROR_CODES.INTERNAL_SERVER_ERROR)
        res.json({
            apiVersion: version,
            error: {
                code: ERROR_CODES.INTERNAL_SERVER_ERROR,
                message: err.message
            }
        })
    }
    else if(err.name === 'SequelizeForeignKeyConstraintError'){
        res.status(ERROR_CODES.UNPROCESSABLE_ENTITY)
        const errorMessage = `invalid ${err.table}Id`
        res.json({
            apiVersion: version,
            error: {
                code: ERROR_CODES.UNPROCESSABLE_ENTITY,
                message: errorMessage
            }
        })
    }
    else{
        res.status(err.code)
        res.json({
            apiVersion: version,
            error: {
                code: err.code,
                message: err.message
            }
        })
    }
}

module.exports = {
    errorHandler
}