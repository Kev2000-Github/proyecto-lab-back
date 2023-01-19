module.exports = {
    type: "object",
    properties: {
      body: {
        type: "object",
        properties: {
          username: {type: "string"},
          password: {type: "string"}
        }
      },
      params: {
        type: "object",
        properties: {
          userId: {type: "string"}
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
  