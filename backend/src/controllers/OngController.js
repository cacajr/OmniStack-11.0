const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async create (request, response) {
        const {name, email, whatsapp, city, uf}= request.body;

        //encrypting the id to a hexadecimal number
        const id = crypto.randomBytes(4).toString('HEX');

        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        });

        return response.json({ id });
    },

    async list (request, response) {
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    }
};