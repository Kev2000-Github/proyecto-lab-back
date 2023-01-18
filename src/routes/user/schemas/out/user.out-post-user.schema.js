module.exports = {
  type: "object",
  anyOf: [
    {
      properties: {
        data: {
          type: "object",
          properties: {
            id: {type: "string"},
            username: {type: "string"},
            role: {type: "string"}
          }        
        }
      },
      additionalProperties: true
    },
    require('../../../../errors/error-response.schema')
  ]
}