module.exports = {
    type: "object",
    anyOf: [
      {
        properties: {
          data: require('./subsidiary.schema')
        },
        additionalProperties: false
      },
      require('../../../../errors/error-response.schema')
    ]
  }