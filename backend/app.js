const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const returnRoutes = require('./routes/returnRoutes');
const chatRoutes = require('./routes/chatRoutes');
const cors = require('cors');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

connectDB();

app.use(cors()); // Allow frontend requests
app.use(express.json()); // Parse JSON bodies

app.get('/', (req, res) => {
    res.json({ message: 'Return Management Chatbot Backend is live!' });
});

app.use('/api/returns', returnRoutes);
app.use('/api/chat', chatRoutes);

app.listen(port, () => console.log(`✅ Server running on port ${port}`));
