const express = require('express')
const cors = require('cors')
const port = 3100;
const db = require('./db')();
const app = express()

app.use(cors())
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/todos', (req, res) => require('./get-todos')(req, res, db));
app.post('/todos', (req, res) => require('./create-todo')(req, res, db));
app.put('/todos/:id', (req, res) => require('./update-todo')(req, res, db));
app.delete('/todos/:id', (req, res) => require('./delete-todo')(req, res, db));
app.post('/todos/:id/check', (req, res) => require('./check-todo')(req, res, db));

app.listen(port, () => console.log(`Todo app listening on port ${port}!`))