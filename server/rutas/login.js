const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
const Usuario = require('../modelos/usuarios');
const app = express();

app.post('/login', (req, res) => {
    let body = req.body;
    Usuario.findOne({ email: body.email }, (err, usuarioBd) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err

            });
        }
        if (!usuarioBd) {
            return res.status(400).json({
                ok: false,
                err: {
                    menssaje: '(Usuario) o contraseña incorrectos'
                }

            });
        }
        if (!bcrypt.compareSync(body.password, usuarioBd.password)) {
            return res.status(500).json({
                ok: false,
                err: {
                    menssaje: 'Usuario o (contraseña) incorrectos'
                }

            });
        }
        let token = jwt.sign({
            usuario: usuarioBd
        }, process.env.seed_Token, { expiresIn: process.env.cad_Token });
        res.json({
            ok: true,
            usuario: usuarioBd,
            id: usuarioBd._id,
            token
        });
    });
});

//confg google...
//**************/
// Sing up por login eliminado, codigo para posible implementacion en el futuro
//**************/
// async function verify(token) {
//     const ticket = await client.verifyIdToken({
//         idToken: token,
//         audience: process.env.CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
//     });
//     const payload = ticket.getPayload();
//     return {
//         nombre: payload.name,
//         email: payload.email,
//         img: payload.picture,
//         google: true
//     }
// };
// verify().catch(console.error);
// app.post('/google', async(req, res) => {
//     let token = req.body.idtoken;
//     let googleUser = await verify(token)
//         .catch(e => {
//             res.status(403).json({
//                 ok: false,
//                 err: e
//             });
//         });


//     Usuario.findOne({ email: googleUser.email }, (err, usuarioBd) => {

//         if (err) {
//             return res.status(500).json({
//                 ok: false,
//                 err

//             });
//         };

//         if (usuarioBd) {
//             if (usuarioBd.google === false) {
//                 return res.status(400).json({
//                     ok: false,
//                     err: {
//                         menssaje: 'Debe de usar su auteticacion normal'
//                     }

//                 });
//             } else {
//                 let token = jwt.sign({
//                     usuario: usuarioBd
//                 }, process.env.seed_Token, { expiresIn: process.env.cad_Token });

//                 return res.json({
//                     ok: true,
//                     usuario: usuarioBd,
//                     token
//                 });
//             }
//         } else {
//             //si el usuario no existe
//             let usuario = new Usuario();
//             usuario.nombre = googleUser.nombre;
//             usuario.email = googleUser.email;
//             usuario.img = googleUser.img;
//             usuario.google = true;
//             usuario.password = 'naila';
//             usuario.save((err, usuarioBd) => {
//                 if (err) {
//                     return res.status(500).json({
//                         ok: false,
//                         err

//                     });
//                 }
//                 let token = jwt.sign({
//                     usuario: usuarioBd
//                 }, process.env.seed_Token, { expiresIn: process.env.cad_Token });

//                 return res.json({
//                     ok: true,
//                     usuario: usuarioBd,
//                     token
//                 });
//             });

//         }
//     });

// });


module.exports = app;