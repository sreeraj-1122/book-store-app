import  express  from "express";
import { Book } from "../models/bookmodels.js";

const router=express.Router();




//save a new book

router.post('/', async (req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishyear
        ) {
            return res.status(400).send({ message: 'send all required fields:title author' })
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishyear: req.body.publishyear,
        };
        const book = await Book.create(newBook)
        return res.status(201).send(book)

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})

//get all books from db

router.get('/', async (req, res) => {
    try {

        const books = await Book.find({})
        return res.status(200).json(
            {
                count: books.length,
                data: books
            }
        )



    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})
//get one book from db

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const book = await Book.findById(id)
        return res.status(200).json(book)



    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})

//update  book from db

router.put('/:id', async (req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishyear
        ) {
            return res.status(400).send({ message: 'send all required fields:title author' })
        }
        const id = req.params.id;
        const result=await Book.findByIdAndUpdate(id,req.body)
        if(!result){
            return res.status(404).send({ message: 'Book not found' })

        }else{
            return res.status(200).send({ message: 'Book updated successfully' })

        }


    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})
//delete  book from db

router.delete('/:id', async (req, res) => {
    try {
       
        const id = req.params.id;
        const result=await Book.findByIdAndDelete(id)
        if(!result){
            return res.status(404).send({ message: 'Book not found' })

        }else{
            return res.status(200).send({ message: 'Book Deleted successfully' })

        }


    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})

export default router;