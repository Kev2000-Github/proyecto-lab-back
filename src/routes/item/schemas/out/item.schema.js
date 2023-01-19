module.exports = {
    type: "object",
    properties: {
      id: {type: "string"},
      code: {type: "string"},
      name: {type: "string"},
      description: {type: ["string","null"]},
      photo: {type: ["string","null"]}
    }
}