# Sistema de Monitoreo de Eventos en Tiempo Real:

Este proyecto consiste en un sistema web que permite monitorear y reflejar en tiempo real los cambios realizados sobre una base de datos PostgreSQL. La información se transmite automáticamente a una interfaz desarrollada en Angular, garantizando que los datos siempre estén sincronizados entre la base de datos y el frontend.

---

## Tecnologías:

- **Base de datos:** PostgreSQL  
- **Backend:** Node.js, Express  
- **Frontend:** Angular, Angular Material, TypeScript  
- **Comunicación en tiempo real:** Server-Sent Events (SSE)  
- **Estilos y UI:** CSS, Angular Material

---

## Descripción del funcionamiento:

1. **PostgreSQL**  
   - La tabla `my_friends` almacena los registros a monitorear.  
   - Funciones y triggers detectan cambios en los registros y envían notificaciones mediante `pg_notify`.

2. **Backend (Node.js + Express)**  
   - Escucha el canal de notificaciones de PostgreSQL (`friends_notification`) mediante `LISTEN`.  
   - Transmite los eventos al frontend a través de Server-Sent Events (`res.write`) de manera automática.

3. **Frontend (Angular)**  
   - Mantiene una conexión persistente con el backend utilizando `EventSource`.  
   - Muestra automáticamente:  
     - Último evento detectado (tabla, campo modificado, valor anterior, valor nuevo, timestamp)  
     - Registros actuales en una tabla de Angular Material  
     - Contador de registros en tiempo real  

---

## Estructura del proyecto:

### Backend
- `server.js` → manejo de rutas, escucha de eventos y transmisión a Angular.  
- `db.js` → conexión con la base de datos PostgreSQL.  

### Frontend
- `app.ts` → lógica de actualización de datos y manejo de eventos en tiempo real.  
- `app.html` → interfaz gráfica del dashboard con Angular Material.  
- `app.css` → estilos personalizados, iconos, tarjetas y tablas.

---

## Cómo ejecutar el proyecto:

### Backend

1. Instalar dependencias:

```bash
npm install

2. Iniciar servidor:

npm start

### Frontend

3. Instalar dependencias:

```bash
npm install

4. Iniciar servidor Angular:

ng serve

---

### Base de datos:

  - Tabla principal: my_friends
  - Funciones y triggers para detectar modificaciones y enviar notificaciones automáticamente.
  - Ejemplo de consulta para probar el sistema en tiempo real:

    UPDATE my_friends
    SET name = 'Luis'
    WHERE name = 'Raúl';
