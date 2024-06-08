import { PrismaClient } from "@prisma/client";
import express from 'express';
import { connect } from "http2";

const prisma = new PrismaClient();
const app = express();

app.use(express.json()); // parse incoming json requests

// HOME - default endpoint
app.get('/', (req, res) => {
    res.send('Express sever on port 3000!')
})


// create delete function by ID here!


app.listen(3000, () => {
    console.log(`Server is running on port ${3000}`)
})