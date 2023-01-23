module.exports = {
    type: "object",
    properties: {
      body: {
        type: "object",
        properties: {
            username: {type: "string"},
            password: {type: "string"}
        },
        required: ["username"],
        required: ["password"]
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