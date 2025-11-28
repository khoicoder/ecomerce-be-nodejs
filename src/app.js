//các package
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');


const app = express();
app.use(morgan("dev"));
app.use(helmet())
app.use(compression())
app.get('/',(req,res) => {
    const strCompress = " zzzzdsdzaz";
    return res.status(200).json({       
        
        
        message : 'welcome to server',
        metadata : strCompress.repeat(1000000)
    });
});
module.exports = app;
// morgan("compile")
// morgan("common")
// morgan("short")
// morgan("tiny")
//init middlequares
//init db   
// init router
//handle error
