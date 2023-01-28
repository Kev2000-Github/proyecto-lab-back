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
        },
        size: {type: "number"},
        page: {type: "number"},
        totalPages: {type: "number"},
        count: {type: "number"}
      },
      additionalProperties: true
    },
    require('../../../../errors/error-response.schema')
  ]
}