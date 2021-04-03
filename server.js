const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const Functions = require('./server-utils.js');
const app = express();
const port = process.env.PORT || 5000;

const url_api = 'https://api.mercadolibre.com/';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/items', (req, res) => {
    const q = req.query.q;

    axios.get(url_api + 'sites/MLA/search?q=' + q)
        .then(function (body) {
            jsonItem = Functions.getJsonItems(body.data)
            const categorie = Functions.getCategorie(body.data);
            if (categorie == undefined) {
                res.json(jsonItem);
                return;
            }

            return axios.get(url_api + '/categories/' + categorie.id);
        }).then(function (body) {
            jsonItem.categories = Functions.getCategoriePath(body.data);
            res.json(jsonItem);
        });
});

app.get('/api/items/:id', (req, res) => {
    const id = req.params.id;
    var jsonItem = {};

    axios.get(url_api + 'items/' + id)
        .then((body) => {
            jsonItem = Functions.getJsonItemDetail(body.data)
            return axios.get(url_api + '/categories/' + body.data.category_id);
        }).then((body) => {
            jsonItem.categories = Functions.getCategoriePath(body.data);
            return axios.get(url_api + 'items/' + id + '/descriptions');
        }).then((body) => {
            jsonItem.item.description = body.data[0].plain_text;
            res.json(jsonItem);
        })
});

app.get('/api/categories/:id', (req, res) => {
    const id = req.params.id;

    axios.get(url_api + 'categories/' + id)
        .then(function (body) {
            res.json(body.data);
        });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
