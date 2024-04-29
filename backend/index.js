import express, { response } from "express";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";
import booksRoute from './routes/booksRoute.js';
import cors from 'cors'



const app = express();

//Middleware for parsing request body
app.use(express.json());

//Middleware for CORS policy
//Option 1 Allow origins with default CORS
//Option 2 Allow custom Origin
app.use(cors(
  {
    origin:'http://localhost:3000',
    methods:['GET','POST','PUT','DELETE'],
    allowedHeaders:['Content-Type']
  }
))

app.get("/", (req, res) => {
  return res.status(234).send("Welcome to MERN Stack Tutorial");
});

app.use('/books',booksRoute);

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
