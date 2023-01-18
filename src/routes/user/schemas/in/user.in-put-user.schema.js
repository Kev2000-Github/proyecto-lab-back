module.exports = {
    type: "object",
    properties: {
      body: {
        type: "object",
        properties: {
          username: {type: "string"},
          password: {type: "string"},
          role: {type: "string"}
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
  