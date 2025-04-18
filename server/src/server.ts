import dotenv from 'dotenv';
import express from 'express';
import routes from './routes/index.js';


dotenv.config();

// Import the routes

const app = express();
const PORT = process.env.PORT || 3001;

// DONE: Serve static files of entire client dist folder
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('../../client/dist'));

app.use(routes);




// DONE: Implement middleware for parsing JSON and urlencoded form data

// DONE: Implement middleware to connect the routes


// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
