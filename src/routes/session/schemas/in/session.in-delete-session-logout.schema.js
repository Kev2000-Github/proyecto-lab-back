module.exports = {
  type: "object",
  properties: {
    body: {
      type: "object"
    },
    params: {
      type: "object",
      properties: {
        sessionId: {type: "string"}
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

  
  
  