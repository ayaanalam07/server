// dotenv
import dotenv from "dotenv";
import cors from 'cors'

dotenv.config();

import express from "express";

const app = express();
const port = 2001;

// middleware
app.use(express.json());
app.use(cors())


// app.use((req, res, next) => {
//   console.log("Time:", Date.now());
//   next();
// });

const users = [];

app.get("/", (req, res) => {
  res.send("hello world!");
});

// add new user
app.post("/user", (req, res) => {
  const { title } = req.body;
  if (!title) {
    res.status(400).json({
      message: "title is required",
    });
    return;
  }

  users.push({
    title,
    id: Date.now(),
  });

  res.status(201).json({
    message: "user is created",
    data: users,
  });
});

// get all user
app.get("/users", (req, res) => {
  res.status(200).json({
    data: users,
  });
});

// get single user
app.get("/user/:id", (req, res) => {
  const { id } = req.params;

  const index = users.findIndex((item) => item.id === +id);

  if (index === -1) {
    res.status(404).json({
      message: "user not found",
    });
    return;
  }

  res.status(200).json({
    data: users[index],
  });
});


app.put("/user/:id", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  if (!title) {
    res.status(400).json({
      message: "Title is required",
    });
    return;
  }

  const index = users.findIndex((item) => item.id === +id);
  if (index === -1) {
    res.status(404).json({
      message: "User not found",
    });
    return;
  }

  users[index].title = title;

  res.status(200).json({
    message: "User updated",
    data: users[index],
  });
});


app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const index = users.findIndex((item) => item.id === +id);
  if (index === -1) {
    res.status(404).json({
      message: "user not found"
    })
  }
  users.splice(index, 1);
  res.status(200).json({
    message: "user deleted",
    data: users
  })


})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// get
// post
// delete
// put

// 404 not found