const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
 
const app = express();
// Middleware
app.use(express.json()); 

// MongoDB Connection
mongoose.connect(process.env.MONGOURI).then(() => {
    console.log('Connected to MongoDB');
})
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error.message);
    });

//schema and model
const InsightSchema = new mongoose.Schema({}, { strict: false });
const Insight = mongoose.model('energyinsights', InsightSchema);

// Routes
app.get('/', async (req, res) => {
    try { 
        const insights = await Insight.find({});
        console.log("Documents fetched");
        res.json(insights);
    } catch (err) {
        res.status(500).send(err);
    } 
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
