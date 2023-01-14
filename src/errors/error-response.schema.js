module.exports = {
    properties: {
      apiVersion: {type:"string"},
      error: {
        type: "object",
        properties: {
          code: {type:"number"},
          message: {type:"string"}
        }
      }
    },
    additionalProperties: false
  }