const express = require('express');
const { db, Champion } = require('../db');

const championRoute = express.Router();

championRoute.get('/', async (req, res, next) => {
    try{
        res.send(
            await Champion.findAll()
        );
    } catch(err) {
        console.log(err);
    }
});

// championRoute.post('/', async (req, res, next) => {
//     try{
//         const champion = await Champion.create(req.body);
//         res.status(201).send(champion);
//     } catch(err) {
//         console.log(err);
//     }
// });

module.exports = championRoute;
