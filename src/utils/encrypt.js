const bcrypt = require("bcrypt")

const hashPassword = async (saltRounds = 10, password) => {
    return await new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) reject(err);
            resolve(hash)
        });
    });
  };

  module.exports = hashPassword