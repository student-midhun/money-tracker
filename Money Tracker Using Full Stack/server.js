require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000; 
const uri = process.env.MONGODB_URI; // MongoDB connect URI
const dbName = 'money_tracker'; // MongoDB database name
const collectionName = 'expenses'; // MongoDB collection name

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));


app.use(express.json());


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        return client.db(dbName).collection(collectionName);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}

// Handle POST request to add an expense
app.post('/expenses', async (req, res) => {
    const expense = req.body;

    try {
        const expensesCollection = await connectToDatabase();
        const result = await expensesCollection.insertOne(expense);
        console.log('Expense added to MongoDB:', expense);
        res.status(201).json({ message: 'Expense added successfully', insertedId: result.insertedId });
    } catch (error) {
        console.error('Error adding expense to MongoDB:', error);
        res.status(500).json({ message: 'Failed to add expense' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
