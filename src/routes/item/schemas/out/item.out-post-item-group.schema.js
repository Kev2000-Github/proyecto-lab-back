module.exports = {
  type: "object",
  anyOf: [
    {
      properties: {
        data: {
          type: "object",
          properties: {
            item: require('./item.schema'),
            group: require('../../../group/schemas/out/group.schema')
          }
        }
      },
      additionalProperties: false
    },
    require('../../../../errors/error-response.schema')
  ]
}