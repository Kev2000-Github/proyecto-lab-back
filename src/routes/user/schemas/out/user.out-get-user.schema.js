module.exports = {
  type: "object",
  anyOf: [
    {
      properties: {
        data: {
          type: "array",
          items: {
            type: "object"
          }
        }
      },
      additionalProperties: false
    },
    require('../../../../errors/error-response.schema')
  ]
}