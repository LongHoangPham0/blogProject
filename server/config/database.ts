const dotenv = require("dotenv");
const mongoose = require("mongoose");

const URI = process.env.MONGODB_URL 

mongoose.connect(`${URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err: any) => console.log(err));