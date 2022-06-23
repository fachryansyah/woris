# Worker Framework
An Worker framework for built background process queue, made with Bull without worries

# Manual
## spawn.sh
For spawning workers in server

## parallel.bat
Same as ```spawn.sh``` but for windows

## routes/Queue.js
Routing your queue based on event name

## Folder models
An ORM for DB Intracation

## Folder handler
To store your logic worker, must be have ```payload``` parameter, for example:
```js
const generatePDF = (payload) => {
  // payload can store data infomation from initiator of worker
}
export default generatePDF;
```

## Folder database
Connection config of DB

## app/Engine.js
Engine for routing Queue & Configuration redis

## cli.js
Used for testing purpose, in case you have ```generatePDF``` handler you should add new flag in cli.js:
```js
program
  .command('twitter')
  .option('-g, --generate', 'generating pdf')
  .cation((cmd) => {
    if(cmd.generate){
      // call your handler function
    }
  }
```
run with
```
$ node cli.js twitter -g
```
