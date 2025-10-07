const express = require('express');
require('dotenv').config();
require('./Models/db');
const cors = require('cors');
const Authrouter = require('./Routes/Authrouter');
const ProductRouter = require('./Routes/ProductRouter');

const app = express();

// ✅ use built-in middlewares
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); // for form data

const port = process.env.PORT || 5000;

app.use('/auth', Authrouter);
app.use('/products', ProductRouter);

app.listen(port, () => {
    console.log(`this server is running on port: ${port}`);
});
