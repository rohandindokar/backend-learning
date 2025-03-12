const express = require ('express');
const connectDB = require('./config/db');
const returnRoutes = require('./routes/returnRoutes');
const dotenv = require('dotenv');
const router = require('./routes/returnRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT;


connectDB();

app.use(express.json());

app.get('/', (req,res) =>{
    res.json({
        message: 'The chatbot is live'
    });
});

app.use('/api/returns', returnRoutes);

app.listen(port, () => {
    console.log('Server is running on port ${port}');
});