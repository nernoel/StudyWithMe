import { PrismaClient } from "@prisma/client";
import express from 'express';
import cors from 'cors';


const prisma = new PrismaClient();
const app = express();

const corsOptions = {
    origin: 'http://localhost:3001', // Specify the allowed origin // CHANGE LATER WHEN DEPLOYED!
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify the allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify the allowed headers
  };
  

app.use(express.json()); // parse incoming json requests
app.use(cors(corsOptions));

// HOME - default endpoint
app.get('/', (req, res) => {
    res.send('Express sever on port 3000!')
})


// Fetch all posts
app.get('/posts', async (req, res) => {
    const data = await prisma.post.findMany();
    res.json(data);
})

// Delete post by id
app.delete('/posts/delete/:id', async (req, res) => {
    const { id } = req.params;
    const postToDelete = await prisma.post.delete({
        where : {
            id: id
        }
    })
    res.json(postToDelete);
})



app.listen(3000, () => {
    console.log(`Server is running on port ${3000}`)
})