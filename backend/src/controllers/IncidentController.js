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
    
    async list (request, response) {
        //take the request query for the pagination ex:(?page=2)
        const {page} = request.query;

        const [count] = await connection('incidents').count();

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select(['incidents.*',
                    'ongs.name', 
                    'ongs.email', 
                    'ongs.whatsapp',
                    'ongs.city',
                    'ongs.uf'
            ]);

        //return the total number of the incidents in the response request header
        response.header('X-Total-Count', count['count(*)']);

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