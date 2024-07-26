const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// Conectar a MongoDB
mongoose.connect('mongodb://localhost/raffle-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to MongoDB');
});

// Definir los esquemas y modelos de MongoDB
const raffleSchema = new mongoose.Schema({
    name: String,
    numbers: Array,
    prizes: Array,
    selectedNumbers: Array
});

const Raffle = mongoose.model('Raffle', raffleSchema);

// Rutas
app.post('/api/raffle', (req, res) => {
    const newRaffle = new Raffle(req.body);
    newRaffle.save((err, raffle) => {
        if (err) return console.error(err);
        res.status(200).send(raffle);
    });
});

app.get('/api/raffle', (req, res) => {
    Raffle.find({}, (err, raffles) => {
        if (err) return console.error(err);
        res.status(200).send(raffles);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
