module.exports = {
    type: "object",
    properties: {
      body: {
        type: "object",
        properties: {
          name: {type: "string"},
          description: {type: "string"},
          photo: {type: "string"}
        }
      },
      params: {
        type: "object"
      },
      query: {
        type: "object"
      },
      headers: {
        type: "object"
      }
    }
}
  