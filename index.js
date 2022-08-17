const express = require("express");
const app = express();
const port = 8000;
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/hey", (req, res) => {
  res.send("Hey");
});

const getRandomIds = () => {
  return parseInt(Math.random() * 100);
};

const userArr = [
  {
    id: getRandomIds(),
    user: "Jake"
  },
  {
    id: getRandomIds(),
    user: "Sam"
  }
];

app.get("/users", (req, res) => {
  return res.json({ users: userArr, message: "Users Fetched successfully" });
});

app.post("/createUser", (req, res) => {
  const newUser = {
    id: getRandomIds(),
    user: req.body.user
  };
  userArr.push(newUser);
  return res.json({ message: "user created successfully" });
});

app.delete("/deleteUser", (req, res) => {
  //splice params ("Element's index to be removed", "How many elements to be removed",
  // ...n params are those elements that need to be added)
  // const userId = req.body.id;
  // const updateArr = userArr.filter( user => user.id !== userId )

  const userId = req.body.id;
  const userIndex = userArr.findIndex((user) => user.id === userId);
  userArr.splice(userIndex, 1);
  return res.json({ message: "User deleted successfully" });
});

app.put('/updateUser' , (req, res) => {
  const newUser = {
    id: req.body.id,
    user: req.body.user
  };
  const userId = req.body.id;
  const userIndex = userArr.findIndex((user) => user.id === userId);
  // userArr.splice(userIndex, 1, newUser);
  userArr[userIndex] = newUser;
  return res.json({ message: "User updated successfully" });
})

app.get('/getUserById', (req, res) => {
  const userId = req.body.id;
  const user = userArr.find((user) => user.id === userId);
  return res.json({ userData: user})
})

app.listen(port, () => {
  console.log("Server running on port " + port);
});
