const {response} = require('express');
const UserService = require('../services/user-service');

const userService = new UserService();

const create = async (req,res) =>{
    try {
        const response = await userService.create({
            email: req.body.email,
            password: req.body.password
        })
        return res.status(201).json({
            success:true,
            message: "Successfully created a new user",
            data: response,
            err:{}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message:"Somthing went wrong",
            data:{},
            err: error
        })
    }
}

const signIn = async (req,res)=>{
    try {
        const response = await userService.singIn(req.body.email,req.body.password);
        return res.status(200).json({
            success:true,
            data:response,
            err:{},
            message:"Successfully signed In"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
        success: false,
        message:"Somthing went wrong",
        data:{},
        err: error
    })
    }
}

const isAuthenticated = async(req,res)=>{
    try {
        const token = req.headers['x-access-token'];
        const response = await userService.isAuthenticated(token);
        return res.status(200).json({
            success: true,
            message:"User is authenticated and token is valid",
            data:response,
            err: {}
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
        success: false,
        message:"Somthing went wrong",
        data:{},
        err: error
    });
    }
}
module.exports= {
    create,
    signIn,
    isAuthenticated
}