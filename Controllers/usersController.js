const express = require("express"); // Import Express for creating the server.
const User = require("../Models/userModel");
const router = express.Router(); // Create a router for movies routes.

const fwt=require("jsonwebtoken")
exports.signup = async(req, res) => {
    try {
        const newUser = await User.create(req.body);
        const token = fwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Generate JWT token
        res.status(201).json({
          status: 'Success',
          token,
          data: { user: newUser },
        });
      } catch (err) {
        res.status(400).json({
          status: 'Fail',
          message: err.message,
        });
      }
};


exports.login = async(req, res) => {

    const {email,password}=req.body;

    if(!email || !password){

        return res.status(400).json({
            status: 'Fail',
            message: 'Please provide email and password',
        }); 
    }
}

