module.exports = {
  type: "object",
  anyOf: [
    {
      properties: {
        user: {
          type: "object",
          properties: {
            id: {type: "string"},
            username: {type: "string"},
            role: {type: "string"},
          }        
        },
        session:{
          type: "object",
          properties: {
            id: {type: "string"}
          }
        }
      },
      additionalProperties: false
    },
    require('../../../../errors/error-response.schema')
  ]
}