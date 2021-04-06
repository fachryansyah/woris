require('dotenv').config();
const fs = require('fs');
const { program } = require('commander');
const SampleHandler = require('./handler/SampleHandler');

const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

/*
  Call your handler here, for testing
*/
program
  .command('post')
  .description('posting twetter')
  .option('-o, --open <open>', 'open json file of caption')
  .action((cmd) => {
    if (cmd.open) {
      SampleHandler.startHandler(cmd.open)
    }
  })

program.parse(process.argv);