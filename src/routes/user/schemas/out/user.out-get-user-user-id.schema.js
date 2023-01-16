module.exports = {
  type: "object",
  anyOf: [
    {
      properties: {
        data: {
          type: "object",
          properties: {
            name: {type: "string"},
            id: {type: "string"}
          }        
        }
      },
      additionalProperties: true
    },
    require('../../../../errors/error-response.schema')
  ]
}