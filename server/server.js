require('./config/config')
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

// CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
});


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

//Crear salida front
app.use(express.static(path.resolve(__dirname, '../public')));
console.log(path.resolve(__dirname, '../public'));

app.use(require('./rutas/index'));

mongoose.connect(process.env.cadenaDB, { useNewUrlParser: true }, (err, res) => {

    if (err) throw err;

    console.log('Base de Datos ONLINE');
    // console.log(process.env.cadenaDB);

});

app.listen(process.env.PORT, () => {
    console.log('Escuchando el puerto: ', 3000);
});