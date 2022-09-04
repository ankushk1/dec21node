const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1/dec21DB"
// ,{
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }
);

const db = mongoose.connection;

db.on("error", (err) => {
  console.log("Error connecting to DB", err);
});

db.once("open", () => {
  console.log("Successfully connected to DB");
});

module.exports = db;