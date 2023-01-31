module.exports = {
    type: "object",
    properties: {
      body: {
        type: "object",
        properties: {
          code: {type: "string"},
          name: {type: "string"},
          description: {type: "string"},
          photo: {type: "string"},
          groups: {
            type: "array",
            items: {type: "string"}
          }
        },
        additionalProperties: false,
        required: ["code","name"]
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
  