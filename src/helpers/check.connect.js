'use strict'

//dùng checklog chứ không dùng thường
const _SECONDS =5000;
const os = require('os');
const process = require('process');
const mongoose= require('mongoose');    
const countConnect = ()=>{
    //mongoose.connection có 4 trạng thái kết nối
    const  numConnection = mongoose.connections.length;
    console.log(`Number of Connections::${numConnection}`)

}
//check overload connect
const checkOverload =()=> {
    setInterval(()=>{
        const numConnection = mongoose.connections.length;
        const numCores = os.cpus().length;
        const memoryUsage = process.memoryUsage().rss;  
    //Exampe max number connection  based of cores
        const maxConnection = numCores *5;

        console.log(`Active connections: ${numConnection}`)

        console.log(`memory usage: ${memoryUsage /1024/ 1024} MB`);
        

        if(numConnection>maxConnection){
        console.log("connection overload detected!!!")
        //notify.send()...
        }
        
    },_SECONDS) // monniter every 5 seconds
}
module.exports = {
    countConnect,
    checkOverload
}