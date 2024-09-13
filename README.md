Aquí tienes un archivo `README.md` con todos los conceptos básicos para abordar este ejercicio, incluyendo la comparación entre un servidor con y sin **Express**, el uso de **Axios**, y una introducción a **Pug**.


# Conceptos Básicos para Crear un Servidor con Node.js, Express y Pug

## 1. Creación de un Servidor con Node.js y Express

### ¿Qué es Express?

**Express** es un framework minimalista para Node.js que simplifica la creación de aplicaciones web y APIs. Nos permite manejar rutas, solicitudes y respuestas de manera sencilla.

### Cómo Crear un Servidor con Express

El siguiente es el código básico para crear un servidor usando **Express**:

```javascript
const express = require('express');
const app = express();

// Configurar una ruta básica
app.get('/', (req, res) => {
  res.send('¡Hola Mundo desde Express!');
});

app.get('/contactanos', (req, res) => {
  res.send('Página en mantención , contáctanos al +5698765426');
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
```

### Cómo Crear un Servidor sin Express (Solo Node.js)

El siguiente código muestra cómo crear un servidor simple usando solo **Node.js**:

```javascript
const http = require('http');

// Crear el servidor
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('¡Hola Mundo desde Node.js!');
});

// Iniciar el servidor
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
```

### Comparación entre Servidor con Express y Servidor sin Express

| Con Express                              | Sin Express (Node.js puro)                |
|------------------------------------------|-------------------------------------------|
| Requiere menos código para crear rutas y manejar solicitudes. | Necesita más código para manejar rutas y respuestas. |
| Soporta middlewares y herramientas adicionales para facilitar el desarrollo. | No tiene soporte directo para middlewares o utilidades. |
| Ejemplo: `app.get('/', handler)`         | Ejemplo: `http.createServer((req, res) => ...)` |
| Mejor integración con motores de plantillas. | Menor flexibilidad para plantillas y HTML dinámico. |

## 2. Introducción a Axios

**Axios** es una librería basada en promesas para hacer solicitudes HTTP desde Node.js y el navegador. Su uso es muy sencillo para obtener o enviar datos desde una API.

### Instalación de Axios

Primero, debes instalar Axios en tu proyecto:

```bash
npm install axios
```

### Uso de Axios en una Ruta de Express

A continuación se muestra cómo utilizar Axios dentro de una ruta para obtener datos de una API externa:

```javascript
const axios = require('axios');

const express = require('express');
const app = express();

app.get('/tasks', async (req, res) => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5');
    res.send(response.data);
  } catch (error) {
    res.status(500).send('Error al obtener los datos');
  }
});
```

En este ejemplo, se hace una solicitud HTTP a una API externa usando `axios.get`, y los datos obtenidos son enviados como respuesta al cliente.

## 3. Introducción a Pug

**Pug** es un motor de plantillas para Node.js que permite generar HTML dinámico de manera más sencilla. Utiliza una sintaxis muy limpia y legible.

### Instalación de Pug

Para utilizar **Pug** con **Express**, primero debes instalarlo:

```bash
npm install pug --save -dev
```

### Configuración de Pug en Express

Después de instalar Pug, puedes configurar Express para usarlo como motor de plantillas:

```javascript
const path = require('path');

// Configurar la carpeta de vistas y el motor de plantillas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
```

### Ejemplo de Archivo Pug

Archivo `views/tasks.pug`:

```pug
doctype html
html
  head
    title= title
    meta(charset="UTF-8")
  body
    h1= title
    table
      thead
        tr
          th ID
          th Título
          th Completado
      tbody
        each task in tasks
          tr
            td= task.id
            td= task.title
            td= task.completed ? 'Sí' : 'No'
```

Este archivo Pug genera una tabla con los datos pasados desde la ruta de Express.

### Cómo Enviar Datos a una Plantilla Pug

En una ruta de Express, puedes renderizar una vista Pug y enviarle datos de la siguiente manera:

```javascript
app.get('/tasks', async (req, res) => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5');
    res.render('tasks', { title: 'Lista de Tareas', tasks: response.data });
  } catch (error) {
    res.status(500).send('Error al obtener los datos de la API');
  }
});
```

### Plantilla HTML como Respuesta de Node.js

Aunque Pug es útil para generar HTML dinámico, también puedes devolver archivos HTML directamente. Aquí un ejemplo de cómo hacerlo en Express:

```javascript
const path = require('path');

app.get('/html-page', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});
```

En este ejemplo, se devuelve un archivo HTML estático usando `res.sendFile`.

Archivo `views/index.html`:

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Página HTML</title>
</head>
<body>
  <h1>Bienvenido a la página HTML</h1>
  <p>Esta es una página simple servida desde Node.js.</p>
</body>
</html>
```

## 4. Ejemplo Completo: Servidor con Express, Axios y Pug

```javascript
const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

// Configurar motor de vistas Pug
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Ruta de la página principal
app.get('/', (req, res) => {
  res.render('index', { title: 'Landing Page', message: 'Bienvenido a la página principal' });
});

// Ruta para obtener datos de una API y renderizarlos en Pug
app.get('/tasks', async (req, res) => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5');
    res.render('tasks', { title: 'Lista de Tareas', tasks: response.data });
  } catch (error) {
    res.status(500).send('Error al obtener los datos de la API');
  }
});

// Ruta para servir una página HTML estática
app.get('/html-page', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
```