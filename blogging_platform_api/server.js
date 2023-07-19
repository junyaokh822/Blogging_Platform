const express = require("express");
const app = express();
const port = 4000;
const bcrypt = require("bcryptjs");
const session = require('express-session');
const { Comments, User, BlogPost} = require('./models');
require("dotenv").config();
const cors = require("cors");
const authRouter = require("./routes/auth.js");


app.use(
  cors({
    origin: "http://localhost:5173",
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);


const authenticateUser = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'You must be logged in to view this page.' });
  }
  next();
};

app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.originalUrl}`)
  res.on("finish", () => {
    
    console.log(`Response status: ${res.statusCode}`);
  });
  next();
});
app.use(express.json());


app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 3600000 // 1 hour 60x60x1000miliseconds
  },
}));

app.get("/", (req, res) => {
  res.send("Welcome to the Blog_Platform API!!!!");
});











// Get all the posts
app.get("/posts", authenticateUser, async (req, res) => {
  try {
    const allPosts = await BlogPost.findAll();

    res.status(200).json(allPosts);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
});



// Get a specific post
app.get("/posts/:id", authenticateUser, async (req, res) => {
  const postId = parseInt(req.params.id, 10);

  try {
    const post = await BlogPost.findOne({ where: { id: postId } });

    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).send({ message: "Post not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
});



// Create a new post
app.post("/posts", authenticateUser, async (req, res) => {
  const postData = req.body;
  try {
    const newPost = await BlogPost.create(postData);
    res.status(201).json(newPost);
  } catch (err) {
    if (err.name === 'SequelizeValidationError') {
      return res.status(422).json({ errors: err.errors.map(e => e.message) });
    }
    console.error(err);
    res.status(500).json({ message: 'An unexpected error occurred.' });
  }
});




// Update a specific post
app.patch("/posts/:id", authenticateUser, async (req, res) => {
  const postId = parseInt(req.params.id, 10);

  try {
    const record = await BlogPost.findOne({ where: { id: postId } });
    if (record && record.UserId !== parseInt(req.session.userId, 10)) {
      return res
        .status(403)
        .json({ message: "You are not authorized to perform that action." });
    } 
    const [numberOfAffectedRows, affectedRows] = await BlogPost.update(req.body, { where: { id: postId }, returning: true });

    if (numberOfAffectedRows > 0) {
      res.status(200).json(affectedRows[0]);
    } else {
      res.status(404).send({ message: "Post not found" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
    console.error(err);
  }
});


// Delete a specific post
app.delete("/posts/:id", authenticateUser, async (req, res) => {
  const postId = parseInt(req.params.id, 10);

  try {
    const record = await BlogPost.findOne({ where: { id: postId } });
    if (record && record.UserId !== parseInt(req.session.userId, 10)) {
      return res
        .status(403)
        .json({ message: "You are not authorized to perform that action." });
    } 
    const deleteOp = await BlogPost.destroy({ where: { id: postId } });

    if (deleteOp > 0) {
      res.status(200).send({ message: "Post deleted successfully" });
    } else {
      res.status(404).send({ message: "Post not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
});











// Get all the comments
app.get("/comments", authenticateUser, async (req, res) => {
  try {
    const allComments = await Comments.findAll();

    res.status(200).json(allComments);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
});



// Get a specific comments
app.get("/comments/:id", authenticateUser, async (req, res) => {
  const commentId = parseInt(req.params.id, 10);

  try {
    const comment = await Comments.findOne({ where: { id: commentId } });

    if (comment) {
      res.status(200).json(comment);
    } else {
      res.status(404).send({ message: "Comment not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
});



// Create a new comment
app.post("/comments", authenticateUser, async (req, res) => {
  const commentData = req.body;
  try {
    const newComment = await Comments.create(commentData);
    res.status(201).json(newComment);
  } catch (err) {
    if (err.name === 'SequelizeValidationError') {
      return res.status(422).json({ errors: err.errors.map(e => e.message) });
    }
    console.error(err);
    res.status(500).json({ message: 'An unexpected error occurred.' });
  }
});




// Update a specific comment
app.patch("/comments/:id", authenticateUser, async (req, res) => {
  const commentId = parseInt(req.params.id, 10);

  try {
    const record = await Comments.findOne({ where: { id: commentId } });
    if (record && record.UserId !== parseInt(req.session.userId, 10)) {
      return res
        .status(403)
        .json({ message: "You are not authorized to perform that action." });
    } 
    const [numberOfAffectedRows, affectedRows] = await Comments.update(req.body, { where: { id: commentId }, returning: true });

    if (numberOfAffectedRows > 0) {
      res.status(200).json(affectedRows[0]);
    } else {
      res.status(404).send({ message: "Comment not found" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
    console.error(err);
  }
});


// Delete a specific comment
app.delete("/comments/:id", authenticateUser, async (req, res) => {
  const commentId = parseInt(req.params.id, 10);

  try {
    const record = await Comments.findOne({ where: { id: commentId } });
    if (record && record.UserId !== parseInt(req.session.userId, 10)) {
      return res
        .status(403)
        .json({ message: "You are not authorized to perform that action." });
    } 
    const deleteOp = await Comments.destroy({ where: { id: commentId } });

    if (deleteOp > 0) {
      res.status(200).send({ message: "Comment deleted successfully" });
    } else {
      res.status(404).send({ message: "Comment not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
});


app.use("/api/auth", authRouter);

















app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});