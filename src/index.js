const express = require('express');
const{PORT} = require('./config/serverConfig')
const bodyParser = require('body-parser')
const apiRoutes = require('./routes/index');


const app = express();
// const UserRepositroy = require('./repository/user-repository');
const prepareAndStartServer=()=>{
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use('/api',apiRoutes);
    // const repo = new UserRepositroy();
    
    app.listen(PORT, async ()=>{
        console.log(`Server started on the port ${PORT}`);
        // const response = await repo.getById(4);
        // console.log(response);
    })
}
prepareAndStartServer();