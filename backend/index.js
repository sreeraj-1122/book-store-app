import express from 'express';
import { PORT, mongoDBUrl } from './config.js';
import mongoose from 'mongoose';
import { Book } from './models/bookmodels.js';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors'

const app = express();
app.use(express.json())

app.use(cors());

// app.use(cors({
//     origin:"http://localhost:3000",
//     methods:['GET','POST','PUT','DELETE'],
//     allowedHeaders:['Content-Type'],
// }))

app.get("/", (req, res) => {
    res.status(234).send("hfjdfhajh");
})
app.use('/books', booksRoute)




mongoose.connect(mongoDBUrl)
    .then(() => {
        console.log("connected");
        app.listen(PORT, () => { console.log(`server is running on ${PORT}`) })

    })
    .catch((error) => {
        console.log(error);
    })



