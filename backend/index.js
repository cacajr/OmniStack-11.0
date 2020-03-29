const express = require('express');

const app = express();

app.get('/', (req, res) =>{
    return res.send({
        message: 'Hello world!!!',
        autor: 'Caca Jr'
    });
});

app.listen(3333);