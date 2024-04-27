import express from "express";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import { PORT, mongoDBURL } from "./config.js";

const app = express();

app.get("/", (req, res) => {
  return res.status(234).send("Welcome to MERN Stack Tutorial");
});

// Route for Save a new Book

app.post("/books", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || req.body.publisherYear) {
      return res.status(400).send({
        message: "Send all required fields",
      });
    }
    const newBook = {
        title: req.body.title,
        author: req.body.author,
        publisherYear: req.body.publisherYear
    }; 
    const book = await Book.create(newBook);
    return res.status(200).send(book);

  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening on port:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
