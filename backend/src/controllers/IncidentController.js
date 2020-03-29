const connection = require('../database/connection');

module.exports = {
    async create (request, response) {
        const {title, description, value} = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
           title,
           description,
           value,
           ong_id 
        });

        return response.json({ id });
    },
    
    async list (resquest, response) {
        const incidents = await connection('incidents').select('*');

        return response.json( incidents );
    },

    async delete (request, response) {
        //params return the request param exe:(:something)
        const {id} = request.params;
        const ond_id = request.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();
        
        if (incident.ong_id != ond_id) {
            //status 401 means not authorizate
            return response.status(401).json({ error: 'Operation not permitted' });
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
    },
};