require('dotenv').config();
const {Users} = require('../db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const { JWT_SECRET } = process.env

const validPassword = async (Password,user) => {
    return await bcrypt.compareSync(Password, user.Password);
}


exports.register = async (req,res)=>{
    const {Username,Email,Password} = req.body
    try {
        if(Username && Email && Password){
            let user = await Users.create({
                Username,
                Email,
                Password
            })
            if(user){
               return res.status(201).json({message: 'register success', created:true})
            }else{
               return res.status(400).json({message: 'register failure', created: false})
            }
        }else{
            return res.status(200).json({message: 'there are empty fields', created: false})
        }
    } catch (error) {
        if(Email && Username && Password)
        return res.status(200).json({message: 'this email has already been used', created: false})
    }
}


exports.login = async (req,res)=>{
    const {Email,Password} = req.body
    try {
        const user = await Users.findOne({where:{Email:Email}})
        if(user){
           let valid = await validPassword(Password,user)
           if(valid){
               const token = jwt.sign({
                   name : user.Username,
                   email: user.Email
               }, JWT_SECRET, {expiresIn: '24h'})
               return res.status(200).json({message:'login success',auth:true,token:token})
           }else{
               return res.status(200).json({message:'Incorrect email or password',auth:false})
           }
        }else{
            return res.status(202).json({message:'user not exists', auth:false})
        }
    } catch (error) {
        return res.status(500).json({message: error, auth:false})
    }
}


exports.quote = async(req,res) => {
    const token = req.headers['x-access-token']
    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        const email = decoded.email
        const user = await Users.findOne({
            where:{
                Email:email
            },
            attributes : ['id','Username','Email']
        })
        return res.status(200).json({status: 'ok', quote: user})
    } catch (error) {
        console.log(error)
        res.status(200).json({status: 'error', error: 'invalid token'})
    }
}