const Users = require('../models/user')
const cryptojs= require('crypto-js')
const randomstring= require('randomstring')
const nodemailer=require('nodemailer')
require('dotenv').config()

const sendMail= async(name, email, token)=>{

    try {
        
        const mailTransporter= nodemailer.createTransport({
            service:'gmail',
            port:587,
            secure:false,
            requireTLS:true,
            auth:{
                user:process.env.emailUser,
                pass:process.env.emailPassword
            }
        })

        const mailOption= {
            from: process.env.emailUser,
            to: email,
            subject:'Reset Password!! Prasthan Yatna',
            html:'<p>Hi' + name + 'your OTP for reset Password is ' + token+ ' </p>'
        }


        mailTransporter.sendMail(mailOption,function(error, data){
            if (error){
                console.log(error)
                return false
            }else{
                console.log("Mail sent successfully")
            }
        })
        return true

    } catch (error) {
        json.status(500).json({success:false, err: error.message})
    }
}


const forgotPassword= async (req, res)=>{

    console.log("Inside forgot Password")
    try {
        
        const email= req.body.email
        const user= await Users.findOne({email:email})

        if(user){
            
            const randomString= randomstring.generate()
            console.log("random string for forgot password :", randomString)
            const data= await Users.updateOne({email:email}, {$set:{token:randomString}},{new:true})
            if(sendMail(user.userName, user.email, randomString)){
                res.status(201).json({success:true, msg:"Please check your email for OTP"})

            }else{
                res.status(500).json({success:false, err: "Server Error"})
            }

        }else{
            console.log("User is undefined")
            res.status(400).json({success:false, err: "User email does not exist"})
        }

    } catch (error) {
        
        console.log(error)
        res.status(500).json({success:false, err:"Failed forgot Password!! RETRY"})
    }
}

const resetPassword= async (req,res)=>{
    try {
        
        const user= await Users.findOne({token:req.body.token})
        if(user){

            const data= await Users.updateOne({email:user.email},{$set:{password: req.body.password, token:""}}, {new:true})
            res.status(201).json({success:true, msg:'Password Reset Successfull. Please Login'})

        }else{
            console.log("Token Expired")
            res.status(400).json({success:false, err:"Token has been expired"})
        }


    } catch (error) {
        console.log(error)
        res.status(500).json({success:false, err: "Failed to reset password !! TRY AGAIN"})
    }
}

module.exports={forgotPassword,resetPassword}
