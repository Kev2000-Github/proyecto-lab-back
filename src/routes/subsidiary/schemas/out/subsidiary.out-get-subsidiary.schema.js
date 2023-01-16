module.exports = {
    type: "object",
    anyOf: [
      {
        properties: {
          data: {
            type: "array",
            items: require('./subsidiary.schema')
          }
        },
        additionalProperties: false
      },
      require('../../../../errors/error-response.schema')
    ]
  }