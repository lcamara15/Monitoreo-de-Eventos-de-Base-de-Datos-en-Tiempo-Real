const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'proyecto_eventos_final',
    password: '****',
    port: 5432
});

client.connect()
    .then(() => {
        console.log('Conectado a PostgreSQL');

        return client.query('LISTEN friends_notification');
    })
    .then(() => {
        console.log('Escuchando cambios en PostgreSQL...');
    })
    .catch(err => {
        console.error('Error de conexión:', err);
    });

module.exports = client;
