const mongoose = require("mongoose");

//CONNECTION

async function connectMongoDb(url) {
  return await mongoose.connect(url);
}

module.exports = { connectMongoDb };
