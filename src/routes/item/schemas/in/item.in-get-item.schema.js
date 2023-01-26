module.exports = {
    type: "object",
    properties: {
      body: {
        type: "object"
      },
      params: {
        type: "object"
      },
      query: {
        type: "object",
        properties: {
          groups: {type: "string"},
          limit: {type: "string"},
          page: {type: "string"}
        }
      },
      headers: {
        type: "object"
      }
    }
}