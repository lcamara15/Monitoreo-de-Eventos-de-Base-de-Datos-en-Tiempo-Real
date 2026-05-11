# Sistema de Monitoreo de Eventos en Tiempo Real:

Este proyecto consiste en un sistema web que permite monitorear y reflejar en tiempo real los cambios realizados sobre una base de datos PostgreSQL. La información se transmite automáticamente a una interfaz desarrollada en Angular, garantizando que los datos siempre estén sincronizados entre la base de datos y el frontend.

<img width="1365" height="678" alt="image" src="https://github.com/user-attachments/assets/95f33548-d249-4585-ac9f-5676b30b037c" />


<img width="1365" height="677" alt="image" src="https://github.com/user-attachments/assets/4d037954-c618-410a-bf73-904146fd0453" />

---

## Tecnologías:

- **Base de datos:** PostgreSQL  
- **Backend:** Node.js, Express  
- **Frontend:** Angular, Angular Material, TypeScript  
- **Comunicación en tiempo real:** Server-Sent Events (SSE)  
- **Estilos y UI:** CSS, Angular Material  

---

## Descripción del funcionamiento:

### PostgreSQL
- La tabla `my_friends` almacena los registros monitoreados.
- Funciones y triggers detectan cambios sobre los registros y envían notificaciones mediante `pg_notify`.

### Backend (Node.js + Express)
- Escucha el canal de notificaciones `friends_notification` mediante `LISTEN`.
- Transmite automáticamente los eventos hacia Angular utilizando Server-Sent Events (`res.write`).

### Frontend (Angular)
- Mantiene una conexión persistente utilizando `EventSource`.
- Actualiza automáticamente:

  - Último evento detectado
  - Tabla afectada
  - Valor anterior y nuevo
  - Fecha y hora del evento
  - Tabla de registros
  - Contador de registros

---

## Estructura del proyecto:

### Backend
- `server.js` → manejo de rutas, escucha de eventos y transmisión hacia Angular.
- `db.js` → conexión con PostgreSQL.

### Frontend
- `app.ts` → lógica de actualización y manejo de eventos en tiempo real.
- `app.html` → estructura visual del dashboard.
- `app.css` → estilos personalizados, tablas, tarjetas e indicadores visuales.

---

## Cómo ejecutar el proyecto:

### Backend

Instalar dependencias:

```bash
npm install
```

Iniciar servidor:

```bash
npm start
```

---

### Frontend

Instalar dependencias:

```bash
npm install
```

Iniciar Angular:

```bash
ng serve
```

---

## Base de datos:

- Tabla principal: `my_friends`
- Funciones y triggers para detectar modificaciones automáticamente.
- Ejemplo de consulta para probar el sistema:

```sql
UPDATE my_friends
SET name = 'Luis'
WHERE name = 'Raúl';
```
