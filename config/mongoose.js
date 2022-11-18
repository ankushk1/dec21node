const mongoose = require("mongoose");

console.log(process.env.PORT)
mongoose.connect(
  process.env.MONGO_URI 
,{
  useNewUrlParser: true,
  useUnifiedTopology: true
}
);
//UlHHeHF3kjlbQwV6
const db = mongoose.connection;

db.on("error", (err) => {
  console.log("Error connecting to DB", err);
});

db.once("open", () => {
  console.log("Successfully connected to DB");
});

module.exports = db;