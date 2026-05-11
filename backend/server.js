const express = require('express');
const cors = require('cors');
const { Client, Pool } = require('pg');

const app = express();

app.use(cors());
app.use(express.json());

const dbConfig = {
    user: 'postgres',
    host: 'localhost',
    database: 'proyecto_eventos_final',
    password: '****',
    port: 5432
};

const pool = new Pool(dbConfig);
const listenerClient = new Client(dbConfig);

let connectedClients = [];

app.get('/friends', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM my_friends ORDER BY id');
        res.json(result.rows);
    } catch (error) {
        console.error('Error consultando my_friends:', error);
        res.status(500).json({ error: 'Error al consultar datos' });
    }
});

app.get('/events-stream', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    res.write('data: {"message":"connected"}\n\n');

    connectedClients.push(res);

    console.log('Angular conectado por SSE');

    req.on('close', () => {
        connectedClients = connectedClients.filter(client => client !== res);
        console.log('Angular desconectado de SSE');
    });
});

listenerClient.connect()
    .then(() => {
        console.log('Conectado a PostgreSQL para escuchar eventos');
        return listenerClient.query('LISTEN friends_notification');
    })
    .then(() => {
        console.log('Escuchando canal friends_notification');
    })
    .catch(error => {
        console.error('Error en conexión LISTEN:', error);
    });

listenerClient.on('notification', (notification) => {
    try {
        const eventData = JSON.parse(notification.payload);

        console.log('Evento recibido desde PostgreSQL:');
        console.log(eventData);

        connectedClients.forEach(client => {
            client.write(`data: ${JSON.stringify(eventData)}\n\n`);
        });

    } catch (error) {
        console.error('Error procesando notificación:', error);
    }
});

app.listen(3000, () => {
    console.log('Servidor activo en http://localhost:3000');
});
