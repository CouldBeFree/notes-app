const fs = require('fs');
const chalk = require('chalk');

const listNotes = () => {
  const notes = loadNotes();
  notes.forEach( el => {
    console.log(chalk.red(el.title));
    console.log(chalk.green(el.body));
  })
};

const readNote = title => {
  const notes = loadNotes();
  const note = notes.find(note => note.title === title);
  if(note){
    console.log(chalk.red(note.title));
    console.log(chalk.green(note.body));
  } else {
    console.log(chalk.red.inverse('Note not found'))
  }
};

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNotes = notes.filter(el => el.title === title);

  if(duplicateNotes.length !== 0){
    console.log(chalk.red.inverse('Duplicated note title'));
  } else {
    notes.push({
      title: title,
      body: body
    });
    saveNotes(notes);
    console.log(chalk.green.inverse('New note added!'));
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
};

const loadNotes = () => {
  try{
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch(e){
    return []
  }
};

const removeNote = (title) => {
  const notes = loadNotes();
  // const duplicatedNotes = notes.filter(el => el.title !== title);
  const index = notes.findIndex(el => el.title === title);
  if(index > -1){
    notes.splice(index, 1);
    saveNotes(notes);
    console.log(chalk.green.inverse('Note deleted'))
  } else {
    console.log(chalk.red.inverse('Note not found'))
  }
};

module.exports = {
  listNotes: listNotes,
  addNote: addNote,
  removeNote: removeNote,
  readNote: readNote
};