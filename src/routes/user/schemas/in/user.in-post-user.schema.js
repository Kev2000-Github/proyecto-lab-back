module.exports = {
    type: "object",
    properties: {
      body: {
        type: "object",
        properties: {
          username: {type: "string"},
          password: {type: "string"}
        },
        additionalProperties: false,
        required: ["username","password"],
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
  