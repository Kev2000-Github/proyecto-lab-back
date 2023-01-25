const bcrypt = require("bcrypt")

const isJSON = (objStringified) => {
    try{
        const obj = JSON.parse(objStringified)
        return true
    }
    catch(err){
        return false
    }
}

const controllerWrapper = (fn) => {
    return async (req, res, next) => {
        try{
            await fn(req, res, next)
        } catch(err) {
            next(err)
        }
    }
}

const mapObject = (obj, cb) => {
    const objKeys = Object.keys(obj)
    return objKeys.map(cb)
}

const hashPassword = async (saltRounds = 10, password) => {
  return await new Promise((resolve, reject) => {
      bcrypt.hash(password, saltRounds, (err, hash) => {
          if (err) reject(err);
          resolve(hash)
      });
  });
};

const verifyPassword = async (password, hash) => {
    const isSame = await bcrypt.compare(password, hash)
    return isSame
}

/**
* Error formatter to display the ajv errors on the response body
*/
const errorFormatter = errors => {
    return errors.reduce((message, err) => {
        return `${message} ${err.instancePath.replace(/\//g, '')} ${err.message}`
    }, '').trim().replace(/\n/g, '').replace(/\'/g, '')
}

const getAuthSession = (bearerToken) => {
    const bearer = bearerToken
    if(!bearer) throw HttpStatusError.forbidden("You don't have required permissions")
    const arr = bearer.split(' ');
    if(arr.length < 2) throw HttpStatusError.forbidden("Session Token invalid")
    const sessionId = arr[1]
    return sessionId
}

module.exports = {
    isJSON,
    controllerWrapper,
    mapObject,
    hashPassword,
    verifyPassword,
    errorFormatter,
    getAuthSession
}