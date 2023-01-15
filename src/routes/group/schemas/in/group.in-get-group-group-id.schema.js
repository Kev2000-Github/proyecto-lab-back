module.exports = {
    type: "object",
    properties: {
      body: {
        type: "object"
      },
      params: {
        type: "object",
        properties: {
          groupId: {type: "string"}
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
  