import express, { response } from "express";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import { PORT, mongoDBURL } from "./config.js";

const app = express();

//Middleware for parsing request body
app.use(express.json());

app.get("/", (req, res) => {
  return res.status(234).send("Welcome to MERN Stack Tutorial");
});

// Route for Save a new Book

app.post("/books", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Send all required fields",
      });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    const book = await Book.create(newBook);
    return res.status(200).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//Route to get single book by id

app.get("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id);
    return res.status(200).json({
      book,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//Route to get all books

app.get("/books", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      count: books.lenght,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//update books route

app.put('/books/:id',async(req,res)=>{

  try {

    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Send all required fields",
      });
    }
    const {id} = req.params
    const result = await Book.findByIdAndUpdate(id)
    
    if(!result){
      return response.status(404).json({message:"book not found"})
    }

    return res.status(200).send({message:'Book Updated successfully'})
  } catch (error) {
    console.log(error.message)
    res.status(500).send({message:error.message})
    
  }
})

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
