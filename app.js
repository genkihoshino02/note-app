const fs = require('fs');
const rl = require('./getline.js');

var data = [];
let fname = './message.txt';

async function main(){
  let opt = {encoding:'utf8'};
  let bf = fs.readFileSync(fname,opt);
  data = JSON.parse(bf.toString('utf8'));

  while(true){
    let cmd = await rl.getline('cmd(a/d/f/q) : ');
    switch(cmd.toString()){
      case 'a':
        await add();
        break;
      case 'd':
        await del();
        break;
      case 'f':
        await find();
        break;
      case 'q':
        quit();
        break;
      default:
        console.log('no-command :');
    }
  }
}

async function add(){
  let bf = await rl.getline('type message :');
  let msg = bf.toString('utf8');
  let item = {
    datetime: new Date(),
    message : msg
  }
  data.unshift(item);
  console.log('message added.');
}

async function del(){
  let bf = await rl.getline('type number :');
  let num = bf.toString()*1;
  console.log('item : '+data[num].message);
  bf = await rl.getline('delete it ? (y/n): ');
  if(bf.toString()=='y'){
    data.splice(num,1);
  }
}

async function find(){
  let bf = await rl.getline('find : ');
  let find = bf.toString('utf8');
  for(let i in data){
    if(data[i].message.indexOf(find) > -1){
      console.log(i + ': '+data[i].message);
    }
  }
}

function quit(){
  let opt = {encoding:'utf8'};
  fs.writeFileSync(fname,JSON.stringify(data),opt);
  console.log('quit now');
}

main();