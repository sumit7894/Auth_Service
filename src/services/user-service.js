const UserRepository = require('../repository/user-repository');
const jwt = require('jsonwebtoken');
const {JWT_KEY} = require('../config/serverConfig');
const bcrypt = require('bcrypt');
class UserService{
    constructor(){
        this.userRepository = new UserRepository
    }
    async create(data){
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {   
            console.log("Somthing went wrong in the Service layer");
            throw error;
        }
    }
    createToken(user){
        try {
            const result = jwt.sign(user,JWT_KEY,{expiresIn:'1h'});
            return result;
        } catch (error) {
            console.log("Somthing went wrong in token creation");
            throw error
        }
    }
    verifyToken(token){
        console.log("yupp here it is",token);
        try {
            const response = jwt.verify(token,JWT_KEY);
            return response;
        } catch (error) {
            console.log("Somthing went wrong in the token validation",error)
            throw error;
        }
    }
    checkPassword(userInputPassword,encrptedPassword){
        try {
            return bcrypt.compareSync(userInputPassword,encrptedPassword);
        } catch (error) {
            console.log("Somthing went wrong in password compairision")
            throw error
        }
    }
    async singIn(email,plainPassword){
        try {
            //step 1 -> fetch the user using the email
            const user = await this.userRepository.getByEmail(email);
            //step 2 -> compare incoming password with stored encrpted password
            const passwordMatch = this.checkPassword(plainPassword,user.password);
            if(!passwordMatch){
                console.log("Password doesn't matched");
                throw {error:'Incorrect Password'};
            }
            //step 3-> if password matched then create a token and send it to the user
            const newJWT = this.createToken({
                email:user.email,
                id:user.id
            })
            return newJWT;
        } catch (error) {
            console.log("Somthing went wrong in Sign In process")
            throw error
        }
    }
    async isAuthenticated(token){
        try {
            const response = this.verifyToken(token);
            if(!response){
                throw {error:'Invalid token'}
            }
            const user = this.userRepository.getById(response.id);
            if(!user){
                throw {error: 'No user with corresponding token exists'}
            }
            return user.id;
        } catch (error) {
            console.log("Somthing went wrong in isAuthenticated service layer");
            throw error
        }
    }
}

module.exports = UserService;