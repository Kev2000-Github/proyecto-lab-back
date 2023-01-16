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
      additionalProperties: true
    },
    require('../../../../errors/error-response.schema')
  ]
}