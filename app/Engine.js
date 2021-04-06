require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const Queue = require('bull');
const redis = require('redis');
const TaskModel = require('../models/TaskModel');
const TaskHistoryModel =require('../models/TaskHistoryModel');
const socket = require('socket.io-client')(process.env.SOCKET_URL);

const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_PORT = process.env.REDIS_PORT;
const REDIS_AUTH = process.env.REDIS_AUTH;

const redisClient = redis.createClient({
  host: REDIS_HOST,
  port: REDIS_PORT,
  // auth_pass: REDIS_AUTH
});

const setQueue = (event, func) => {
  /**
   * Set the Queue
   *
   * @eventName
   */
  const eventQueue = new Queue(event, {
    redis: {
      port: REDIS_PORT,
      host: REDIS_HOST,
      // password: REDIS_AUTH
    }
  });
  eventQueue.process(async (job, done) => {
    console.log(`Starting ${event} jobs for : ${job.data.username}`);

    await redisClient.set(`${job.data.id}|${job.data.username}`, job.data.username);
    const runQueue = await func(job.data);
    if (!runQueue) {
      console.log(`Job : ${job.data.id}|${job.data.username} - FAILED`)
      await createTaskHistory(job.data.id, job.data.accountId, job.data.accountType, 'Failed');
    }else{
      console.log(`Job : ${job.data.id}|${job.data.username} - SUCCESS`)
      await createTaskHistory(job.data.id, job.data.accountId, job.data.accountType, 'Success');
    }
    done();

    console.log('DONE!\n');
  })

  eventQueue.on('completed', (job, result) => {
    //check if all of sub task done
    redisClient.keys(`${job.data.id}*`, async (err, resp) => {
      if (resp.length == job.data.totalTask) {
        await socket.emit('sendTaskEvent', `Job "${job.data.name}" completed was complete!!`);
        console.log(`Job "${job.data.name}" completed was complete!!`);
        redisClient.del(resp); // delete temp task from redis
        await updateTask(job.data.id, 'DONE'); // update task if done
      }
    })
  })
}

const updateTask = async (id, status) => {
  await TaskModel.query()
    .findById(id)
    .patch({
      status: status
    });
}

const createTaskHistory = async (taskId, accountId, accountType, status) => {
  await TaskHistoryModel.query()
    .insert({
      id: uuidv4(),
      task_id: taskId,
      status
    });
}

module.exports = {
  setQueue
};