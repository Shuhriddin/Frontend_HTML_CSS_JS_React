const express = require('express');

const app = express();

const port = 5005

const dataRoute = require('./routes/dashboarddata')

app.use('./dashboarddata', dataRoute)

app.use(express.static('public'));

app.listen(port, ()=>{
    console.log(`server successful, listening on port ${port}`)
})