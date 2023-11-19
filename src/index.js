const express = require('express');
const{PORT} = require('./config/serverConfig')
const bodyParser = require('body-parser')
const apiRoutes = require('./routes/index');


const app = express();
const UserService = require('./services/user-service');
const prepareAndStartServer=()=>{
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use('/api',apiRoutes);
    // const repo = new UserRepositroy();
    
    app.listen(PORT, async ()=>{
        console.log(`Server started on the port ${PORT}`);
        const userService = new UserService();
        // const newToken = userService.createToken({
        //     email:"sanket @admin.com",
        //     id:1
        // });
        // console.log("New token is",newToken);
        // const response = userService.verifyToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhbmtldEBhZG1pbi5jb20iLCJpZCI6MSwiaWF0IjoxNzAwMzY1MzY3LCJleHAiOjE3MDAzNjg5Njd9.UxAe5-OXNQ-VR0T-nltrLD1asAPpkcG3dovxS69gYxs')
        // console.log(response);
    })
}
prepareAndStartServer();