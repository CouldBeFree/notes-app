const yargs = require('yargs');
const notes = require('./notes');

//Customize yargs version
yargs.version('1.1.0');

// Create add command
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string'
    }
  },
  handler: function (argv) {
    notes.addNote(argv.title, argv.body)
  }
});

// Create remove command
yargs.command({
  command: 'remove',
  describe: 'Remove a note',
  title: {
    describe: 'Remove item',
    demandOption: true,
    type: 'string'
  },
  handler: function (argv) {
    notes.removeNote(argv.title)
  }
});

// Create list command
yargs.command({
  command: 'read',
  describe: 'Read the note',
  builder: {
    title: {
      describe: 'Get the note',
      demandOption: true,
      type: 'string'
    }
  },
  handler: function (argv) {
    notes.readNote(argv.title)
  }
});

// Create read command
yargs.command({
  command: 'list',
  describe: 'List a notes',
  handler: function () {
    notes.listNotes()
  }
});

yargs.parse();
