import express from express

const router = express.router()


// Route for Save a new Book

router.post("/", async (req, res) => {
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
  
  router.get("/:id", async (req, res) => {
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
  
  router.get("/", async (req, res) => {
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
  
  router.put('/:id',async(req,res)=>{
  
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
  
  //Route to delete book
  
  router.delete('/:id',async(req,res)=>{
  
    try {
      const {id} = req.params
      const result = await Book.findByIdAndDelete(id)
      
      if(!result){
        return response.status(404).json({message:"book not found"})
      }
  
      return res.status(200).send({message:'Book deleted successfully'})
    } catch (error) {
      console.log(error.message)
      res.status(500).send({message:error.message})
      
    }
  })
  

  export default router