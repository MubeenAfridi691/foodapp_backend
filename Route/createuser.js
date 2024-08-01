const express = require('express');
const router = express.Router();
const userSchema = require('../model/user');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/user', async (req, res) => {
  const { email, name, password,location } = req.body;

  
  // Validate input
  if (!email || !name || !password) {
    return res.status(400).json({
      message: "Email, name, and password are required"
    });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create new user instance
  const user = new userSchema({
    email,
    password: hashedPassword,
    name,
    location,
  });

  

  try {
    // Save user to the database
    await user.save(); 
    console.log("User saved successfully");
    const auth= jwt.sign({ user }, "secretkey", )


    // Respond with success
    return res.status(201).json({
      message: "User created successfully",
      // Consider including a token or other response data if needed
    });
  } catch (error) {
    // Log and respond with detailed error
    console.error("Error saving user:", error);
    return res.status(500).json({
      message: "Failed to save user",
      error: error.message // Include detailed error message
    });
  }
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required"
    });
  }
  try {
    const user = await userSchema.findOne({ email: email });
    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials"
    });
  }
  const data =user_id=user._id;
  if (user.email === email &&  bcrypt.compareSync(password, user.password)) {
   const auth= jwt.sign({ user_id }, "secretkey", )
      return res.status(200).json({
        message: "Login successful" ,
        user: user,
        auth:auth
      });
    } else {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }
  } catch (
    error) {
    return res.status(500).json({
      message: "Failed to login",
      error: error.message
    });
  }
});

module.exports = router;
