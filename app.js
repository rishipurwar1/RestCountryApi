const express = require('express');
const app = express();
const axios = require('axios');

app.set("view engine", "ejs")
app.use(express.static(__dirname + "/public"));

app.get('/', (req, res) => {
    var url = 'https://restcountries.eu/rest/v2/all';
    // Make a request for a user with a given ID
    axios.get(url)
    .then(function (response) {
    // handle success
    const data = response.data;
    res.render('index', {data:data})
    })
    .catch(function (error) {
    // handle error
    console.log(error);
    })
    .finally(function () {
    // always executed
    });
});

app.get("/search", (req, res) => {
    const query = req.query.search;
    var url = 
    `https://restcountries.eu/rest/v2/name/${query}`;
    // Make a request for a user with a given ID
    axios.get(url)
    .then(function (response) {
    // handle success
    const data = response.data;
    res.render('search', {data:data})
    })
    .catch(function (error) {
    // handle error
    console.log(error);
    })
    .finally(function () {
    // always executed
    })
});

app.get("/country/:id", (req, res) => {
    let name = req.params.id;
    name = name
    .replace(/å/g, 'a')
    .replace(/Å/g, 'A')
    .replace(/ä/g, 'a')
    .replace(/Ä/g, 'A')
    .replace(/ö/g, 'o')
    .replace(/Ö/g, 'O');
    var url = 
    `https://restcountries.eu/rest/v2/name/${name}?fullText=true`;
    // Make a request for a user with a given ID
    axios.get(url)
    .then(function (response) {
    // handle success
    const data = response.data;
    res.render('show', {data:data})
    })
    .catch(function (error) {
    console.log(error);
    })
    .finally(function () {
    // always executed
    })
});

// Show By Border Country
app.get("/country/border/:id", (req, res) => {
    const code = req.params.id;
    var url = 
    `https://restcountries.eu/rest/v2/alpha/${code}`;
    // Make a request for a user with a given ID
    axios.get(url)
    .then(function (response) {
    // handle success
    const data = response.data;
    res.render('border', {data:data})
    })
    .catch(function (error) {
    // handle error
    // console.log(error);
    })
    .finally(function () {
    // always executed
    })
});

// Sort By Region
app.get("/region/:id", (req, res) => {
    const region = req.params.id;
    var url = 
    `https://restcountries.eu/rest/v2/region/${region}`;
    // Make a request for a user with a given ID
    axios.get(url)
    .then(function (response) {
    // handle success
    const data = response.data;
    res.render('index', {data:data})
    })
    .catch(function (error) {
    // handle error
    console.log(error);
    })
    .finally(function () {
    // always executed
    })
});

app.listen(process.env.PORT || 3000, process.env.IP, () => {
    console.log("Server is started");
});