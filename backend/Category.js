const mongoose = require("mongoose");
const uri = "mongodb+srv://dbUser:iKd5d8MJzhJq7nMQ@cluster0.gnpwyx0.mongodb.net/?retryWrites=true&w=majority";


exports.connect = () => {
  mongoose.set('strictQuery', true)
  mongoose.connect(uri)
  .then(() => {
      console.log('Connected to ' + uri);
  }).catch((error) => {
      console.error('Error connecting to ' + uri);
      console.error(error);
      process.exit(1);
  })
}



