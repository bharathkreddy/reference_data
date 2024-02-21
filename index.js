import express from "express";
import pg from "pg";
import bodyParser from "body-parser";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import methodOverride from "method-override";
import fs from "fs";

const app = express()
const port = 3000
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

const db = new pg.Client({
    host: "pg-psqlflexibleserver.postgres.database.azure.com",
    user: "InsightAIQ",
    password: "Summer@21!",
    database: "node",
    schema: "public",
    port: 5432,
    ssl: {ca: fs.readFileSync("certs/DigiCertGlobalRootCA.crt.pem")}
});
db.connect();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));

// Fetch all records
app.get('/', async (req, res) => {
    const result = await db.query('SELECT * FROM fundref');
    res.render('index', { funds: result.rows });
});

// Fetch a single record by accountNumber
app.get('/search', async (req, res) => {
    const { accountNumber } = req.query;
    const result = await db.query('SELECT * FROM fundref WHERE accountNumber = $1', [accountNumber]);
    res.render('index', { funds: result.rows });
});

// Update a record
app.post('/update', async (req, res) => {
    const { accountNumber, userBank, ...otherFields } = req.body;

    // Construct the update query dynamically based on provided fields, excluding accountNumber from updates
    let query = 'UPDATE fundref SET ';
    let updates = [];
    let values = [];
    let counter = 1;

    // Loop through other fields to construct the update part of the query
    for (const [key, value] of Object.entries(otherFields)) {
        if (value) { // Check if the field has a value to avoid updating with empty values
            updates.push(`${key} = $${counter}`);
            values.push(value);
            counter++;
        }
    }

    // Finalize the query
    query += updates.join(', ') + ` WHERE accountNumber = $${counter}`;
    values.push(accountNumber);

    try {
        await db.query(query, values);
        res.redirect('/'); // Redirect or send an appropriate response
    } catch (error) {
        console.error('Error updating fund record:', error);
        res.status(500).send('Server Error');
    }
});


// Insert a new record
app.post('/add', async (req, res) => {
    const { userBank, accountNumber, activeDate, ValidtoDate, fundName, multiManager, legalStructure, distributionDate, performanceFeeRate, ter, valuationPoint, internalSLA, externalSLA } = req.body;
    const query = `INSERT INTO fundref (userBank, accountNumber, activeDate, ValidtoDate, fundName, multiManager, legalStructure, distributionDate, performanceFeeRate, ter, valuationPoint, internalSLA, externalSLA)
                   VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`;

    try {
        await db.query(query, [userBank, accountNumber, activeDate, ValidtoDate, fundName, multiManager, legalStructure, distributionDate, performanceFeeRate, ter, valuationPoint, internalSLA, externalSLA]);
        res.redirect('/'); // Redirect back to the home page or to a success page
    } catch (error) {
        console.error('Error adding new fund:', error);
        res.status(500).send('Server Error'); // Handle errors appropriately
    }
});

// Delete a record
app.post('/delete', async (req, res) => {
    const { accountNumber } = req.body; // Ensure you are extracting accountNumber correctly
    // Logic to delete the fund record using accountNumber
    try {
        await db.query('DELETE FROM fundref WHERE accountNumber = $1', [accountNumber]);
        res.redirect('/'); // Redirect or send a response as needed
    } catch (err) {
        console.error('Error deleting fund:', err);
        res.status(500).send('Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
