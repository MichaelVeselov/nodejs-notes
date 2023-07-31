const express = require('express');
const cors = require('cors');
const chalk = require('chalk');
const path = require('path');

const {
  addNote,
  removeNote,
  updateNote,
  getNotes,
} = require('./notes.controller');

const port = 3000;

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', 'pages');

app.get('/', async (request, response) => {
  response.render('index', {
    title: 'Note App',
    notes: await getNotes(),
    created: false,
  });
});

app.post('/', async (request, response) => {
  const { title } = request.body;
  await addNote(title);
  response.render('index', {
    title: 'Note App',
    notes: await getNotes(),
    created: true,
  });
});

app.delete('/:id', async (request, response) => {
  const { id } = request.params;
  await removeNote(id);
  response.render('index', {
    title: 'Note App',
    notes: await getNotes(),
    created: false,
  });
});

app.put('/:id', async (request, response) => {
  const { id, title } = request.body;
  await updateNote(id, title);
  response.render('index', {
    title: 'Note App',
    notes: await getNotes(),
    created: false,
  });
});

app.listen(port, () => {
  console.log(chalk.bgGreen(`Server has been started on port ${port}...`));
});
