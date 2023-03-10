module.exports = {
    type: "object",
    properties: {
      body: {
        type: "object",
        properties: {
          name: {type: "string"}
        },
        additionalProperties: false,
        required: ["name"]
      },
      params: {
        type: "object",
        properties: {
          subsidiaryId: {type: "string"}
        }
      },
      query: {
        type: "object",
      },
      headers: {
        type: "object"
      }
    }
}
  