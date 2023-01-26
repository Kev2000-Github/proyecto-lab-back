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
        },
        required: ['itemId']
      },
      query: {
        type: "object"
      },
      headers: {
        type: "object"
      }
    }
}
  