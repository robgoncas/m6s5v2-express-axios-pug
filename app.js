const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

//Configurar el motor de vistas como Pug
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Ruta para la landing page
app.get('/', (req, res) => {
  res.render('index', { title: 'Bootcamp Fullstack JS', message: 'Bienvenido al bootcamp de Javascript' });
});

//Ruta para obtener datos de la API y renderizar en Pug
app.get('/tasks', async (req, res) => {
  try {
    //Hacer una solicitud a la API
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5');
    
    //Enviar los datos a la plantilla Pug
    res.render('tasks', { title: 'Lista de Tareas', tasks: response.data });
  } catch (error) {
    res.status(500).send('Error al obtener los datos de la API');
  }
});

//Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
