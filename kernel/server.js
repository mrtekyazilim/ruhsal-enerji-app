const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const adminRoutes = require('./src/routes/admin');

dotenv.config(); // .env yükleniyor
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Admin routes
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
