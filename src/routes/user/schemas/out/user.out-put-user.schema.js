module.exports = {
  type: "object",
  anyOf: [
    {
      properties: {
        data: {
          type: "object",
          properties: {
            id: {type: "string"},
            username: {type: "string"}
          }        
        }
      },
      additionalProperties: false
    },
    require('../../../../errors/error-response.schema')
  ]
}