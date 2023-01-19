module.exports = {
    type: "object",
    properties: {
      body: {
        type: "object",
        properties: {
          name: {type: "string"}
        },
        additionalProperties: false
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
  