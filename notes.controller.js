const fs = require('fs/promises');
const path = require('path');
const chalk = require('chalk');

const notesPath = path.join(__dirname, 'db.json');

async function addNote(title) {
  const notes = await getNotes();
  const note = {
    title,
    id: Date.now().toString(),
  };
  notes.push(note);
  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.bgGreen('Note was added...'));
}

async function removeNote(id) {
  const notes = await getNotes();
  await fs.writeFile(
    notesPath,
    JSON.stringify(notes.filter((note) => note.id !== id))
  );
  console.log(chalk.bgGreen('Note was deleted...'));
}

async function updateNote(id, title) {
  const notes = await getNotes();
  const index = notes.findIndex((note) => note.id === id);
  notes[index].title = title;
  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.bgGreen('Note was updated...'));
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: 'utf-8' });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes() {
  const notes = await getNotes();
  console.log(chalk.bgBlue('Here is note list:'));
  notes.forEach((note) => {
    console.log(chalk.blue(note.id) + ' ' + chalk.blue(note.title));
  });
}

module.exports = { addNote, removeNote, updateNote, getNotes };
