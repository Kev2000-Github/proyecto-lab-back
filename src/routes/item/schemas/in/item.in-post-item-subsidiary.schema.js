module.exports = {
    type: "object",
    properties: {
      body: {
        type: "object",
        properties: {
          quantity: {type: "number"}
        },
        required: ['quantity']
      },
      params: {
        type: "object",
        properties: {
          itemId: {type: "string"},
          subsidiaryId: {type: "string"}
        },
        required: ['itemId','subsidiaryId']
      },
      query: {
        type: "object"
      },
      headers: {
        type: "object"
      }
    }
}
  