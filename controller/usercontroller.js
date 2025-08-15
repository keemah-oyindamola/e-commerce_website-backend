const mongoose = require('mongoose')
const user_model = require("../model/usermodel")
const bcrypt = require('bcrypt')
const signup = async (req, res) => {
    try {
        console.log(req.body);
        const { username, email, password } = req.body
        if (!username || !email || !password) {
            res.status(402).send({ message: "Input fields cant be empty", status: false })
        }
        const verifyEmail = await user_model.findOne({ email: email })
        if (verifyEmail) {
            res.status(402).send({ message: "user already exist", status: false })
        }

         const verifyUsername = await user_model.findOne({ username: username })
        if (verifyUsername) {
            res.status(405).send({ message: "username already in use", status: false })
        }

        const salt_round = 10
        const hashpassword = await bcrypt.hash(password, salt_round)
        console.log(hashpassword);

        const createuser = await user_model.create({
            username,
            email,
            password: hashpassword
        })
        console.log(createuser);

        if (!createuser) {
            res.status(409).send({ message: "Unable to sign user", status: false })
        }
        return res.status(200).send({message:"User signed up successfully", status:true})
    } catch (error) {
        console.log(error);
       res.status(500).send({message:"Internal server error", status:false}) 
    }


}

const login = async(req, res)=>{
    try {
        const {email, password} = req.body
        if (!email || !password) {
           return res.status(400).send({message :"Input fields can't be empty", status:false}) 
        }

        const loggin_user = await user_model.findOne({email : email})
        if (!loggin_user) {
            return res.status(404).send({message: "user doesn't exist" , status:false})
        }

        const validpassword = await bcrypt.compare(password ,loggin_user.password)
        if (!validpassword) {
            return res.status(409).send({message :"Invalid credentials", status:false})
        }
        return res.status(200).send({message:"Login successful", status:true})
    } catch (error) {
        console.log(error);
        return res.status(500).send({message:"Internal server error", status:false})
    }
}

module.exports = {signup, login}