module.exports = {
    type: "object",
    properties: {
      body: {
        type: "object",
        properties: {
          code: {type: "string"},
          name: {type: "string"},
          description: {type: "string"},
          photo: {type: "string"}
        }
      },
      params: {
        type: "object",
        properties: {
          itemId: {type: "string"}
        }
      },
      query: {
        type: "object"
      },
      headers: {
        type: "object"
      }
    }
}
  