const express = require("express");
const app = express();
const port = 4000;
const blogs = require("./blogs");
const { query } = require('./database');
require("dotenv").config();


app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.originalUrl}`)
  res.on("finish", () => {
    
    console.log(`Response status: ${res.statusCode}`);
  });
  next();
});
app.use(express.json());

function getNextIdFromCollection(collection) {
  if (collection.length === 0) return 1;
  const lastRecord = collection[collection.length - 1];
  return lastRecord.id + 1;
}

app.get("/", (req, res) => {
  res.send("Welcome to the Blog_Platform API!!!!");
});




// Get all the posts
app.get("/posts", async (req, res) => {
  try {
    const allPosts = await query("SELECT * FROM Posts");

    res.status(200).json(allPosts.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get a specific post
app.get("/posts/:id", async (req, res) => {
  const postId = parseInt(req.params.id, 10);

  try {
    const post = await query("SELECT * FROM Post WHERE id = $1", [postId]);

    if (post.rows.length > 0) {
      res.status(200).json(post.rows[0]);
    } else {
      res.status(404).send({ message: "Post not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});



// Create a new post
app.post("/posts", async (req, res) => {
  const {  title, contents, postDate } = req.body;

  try {
    const newPost = await query(
      `INSERT INTO Posts (title, contents, postDate) VALUES ($1, $2, $3) RETURNING *`,
      [title, contents, postDate]
    );
      console.log(newPost);
    res.status(201).json(newPost.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update a specific post
app.patch("/posts/:id", async (req, res) => {
  const postId = parseInt(req.params.id, 10);

  const fieldNames = [
    "title", 
    "contents", 
    "postDate",
  ].filter((name) => req.body[name]);

  let updatedValues = fieldNames.map(name => req.body[name]);
  const setValuesSQL = fieldNames.map((name, i) => {
    return `${name} = $${i + 1}`
  }).join(', ');

  try {
    const updatedPost = await query(
      `UPDATE Posts SET ${setValuesSQL} WHERE id = $${fieldNames.length+1} RETURNING *`,
      [...updatedValues, postId]
    );

    if (updatedPost.rows.length > 0) {
      res.status(200).json(updatedPost.rows[0]);
    } else {
      res.status(404).send({ message: "Post not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});


// Delete a specific post
app.delete("/posts/:id", async (req, res) => {
  const postId = parseInt(req.params.id, 10);

  try {
    const deleteOp = await query("DELETE FROM Posts WHERE id = $1", [postId]);

    if (deleteOp.rowCount > 0) {
      res.status(200).send({ message: "Post deleted successfully" });
    } else {
      res.status(404).send({ message: "Post not found" });
    }
  }catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});