const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');
const { verificaTokenImg } = require('../middlewares/autenticacion');

app.get('/imagen/:tipo/:img', (req, res) => {
    let tipo = req.params.tipo;
    let img = req.params.img;

    let pathImg = path.resolve(__dirname, `../../uploads/${tipo}/${img}`);


    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        let pathNoimgPatch = path.resolve(__dirname, '../assets/no-image.jpg');
        res.sendFile(pathNoimgPatch);
    }
});

module.exports = app;