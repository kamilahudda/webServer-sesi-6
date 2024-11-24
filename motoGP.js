// Import express
const express = require('express');
const app = express();
const port = 8000; // Port server

// MotoGP data
const motoGP = [
    {
        circuit: 'Losail',
        location: 'Qatar',
        winner: {
            firstName: 'Andrea',
            lastName: 'Dovizioso',
            country: 'Italy'
        }
    },
    {
        circuit: 'Autodromo',
        location: 'Argintine',
        winner: {
            firstName: 'Cal',
            lastName: 'Crutchlow',
            country: 'UK'
        }
    },
    {
        circuit: 'De Perez',
        location: 'Spain',
        winner: {
            firstName: 'Valentino',
            lastName: 'Rossi',
            country: 'Italy'
        }
    },
    {
        circuit: 'Mugello',
        location: 'Italy',
        winner: {
            firstName: 'Andrea',
            lastName: 'Dovizioso',
            country: 'Italy'
        }
    }
];

// Displyas all data if the URL is "/"
app.get('/', (req, res) => {
    res.json(motoGP);
});

// Group data by country
app.get('/country', (req, res) => {
    const groupedByCountry = motoGP.reduce((acc, item) => {
        const country = item.winner.country;
        if (!acc[country]) {
            acc[country] = [];
        }
        acc[country].push(item);
        return acc;
    }, {});

    res.json(groupedByCountry);
});

// Group data by winner's name
app.get('/name', (req, res) => {
    const groupedByName = motoGP.reduce((acc, item) => {
        const name = `${item.winner.firstName} ${item.winner.lastName}`;
        if (!acc[name]) {
            acc[name] = [];
        }
        acc[name].push(item);
        return acc;
    }, {});

    res.json(groupedByName);
});

// Handle URLs other than those authorized
app.use((req, res) => {
    res.status(400).send('Bad request');
});

// Running the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
