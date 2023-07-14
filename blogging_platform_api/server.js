const express = require("express");
const app = express();
const port = 4000;
const bcrypt = require("bcryptjs");
const { BlogPost, User, Comments } = require('./models');
require("dotenv").config();


app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.originalUrl}`)
  res.on("finish", () => {
    
    console.log(`Response status: ${res.statusCode}`);
  });
  next();
});
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Blog_Platform API!!!!");
});

app.post('/signup', async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  try {
    const user = await User.create({
      username: req.body.username,
      password: hashedPassword,
    });

    // Send a response to the client informing them that the user was successfully created
    res.status(201).json({
      message: "User created!",
      user: {
        username: user.username,
      },
    });
  } catch (error) {
    if (error.username === "SequelizeValidationError") {
      return res.status(422).json({ errors: error.errors.map((e) => e.message) });
    }
    res.status(500).json({
      message: "Error occurred while creating user",
      error: error,
    });
  }
 
});



// Get all the posts
app.get("/posts", async (req, res) => {
  try {
    const allPosts = await BlogPost.findAll();

    res.status(200).json(allPosts);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
});



// Get a specific post
app.get("/posts/:id", async (req, res) => {
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
app.post("/posts", async (req, res) => {
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
app.patch("/posts/:id", async (req, res) => {
  const postId = parseInt(req.params.id, 10);

  try {
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
app.delete("/posts/:id", async (req, res) => {
  const postId = parseInt(req.params.id, 10);

  try {
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



app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});