const Engine = require('../app/Engine');
const SampleHandler = require('../handler/SampleHandler');

const Queue = () => {
  console.log('Queue has registered!');
  Engine.setQueue('WORIS-SAMPLE', SampleHandler.startHandler);
}

module.exports = Queue;