module.exports = {
    type: "object",
    properties: {
      body: {
        type: "object"
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